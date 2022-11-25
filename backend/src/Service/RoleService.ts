/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 17:08:52
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 10:15:40
 * @FilePath: \tsplatform\backend\src\Service\RoleService.ts
 * @Description: 系统角色服务
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, InsertResult, Like, Repository } from 'typeorm';
import { SysRole } from 'src/Entity/SysRole';
import { LoggerPrint } from 'src/Logging/LoggerPrint';
import { SysRoleMenu } from 'src/Entity/SysRoleMenu';
import { roleMenus, roles } from 'src/SeedData/Role';
// where: { Name: keywords },//and查询
// where: [{ Name: keywords }],//or查询
// where: { Name: Like("%out #%") },//like查询
// where: { Id: In([0,1]) },//in查询
// where: { Name: Like("%out #%") },//like查询
@Injectable()
export class RoleService {
  private readonly tableName: string = "系统角色";
  constructor(
    public readonly loggerPrint: LoggerPrint,
    public readonly logger: Logger,

    @InjectRepository(SysRole)
    public readonly repository: Repository<SysRole>,
    @InjectRepository(SysRoleMenu)
    public readonly roleMenuRepository: Repository<SysRoleMenu>,
  ) {
  }
  //根据角色Id获得路由菜单
  async getMenusByRoleId(id: number): Promise<SysRoleMenu[]> {
    //根据角色Id获得角色菜单映射数据
    const result = await this.roleMenuRepository.find({
      where: { RoleId: id }
    });
    return result;
  }
  //#region  基础控制器
  // 初始化数据
  async seedData(): Promise<number[]> {
    let result: InsertResult;
    let result1: InsertResult;
    await this.repository.queryRunner?.startTransaction();
    try {
      await this.repository.clear();
      result = await this.repository.createQueryBuilder().insert().values(roles).execute();
      result1 = await this.roleMenuRepository.createQueryBuilder().insert().values(roleMenus).execute();
      await this.repository.queryRunner?.commitTransaction();
      await this.repository.createQueryBuilder().useTransaction(true);
      return [result.identifiers.length, result1.identifiers.length]
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await this.repository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return [0, 0];
    }
  }
  async getPage(
    page: number = 1,
    pageSize: number = 10,
    keywords: string = "",
    orderBy: string = ""
  ): Promise<[SysRole[], number]> {
    const result = await this.repository.findAndCount({
      where: [{ Name: Like("%" + keywords + "%") }],
      order: {
        Id: "ASC"
      },
      skip: page - 1,
      take: pageSize
    })
    for await (let item of result[0]) {

      const roleMenuResult = await this.roleMenuRepository.find({
        where: { RoleId: item.Id },
      })
      item.SysRoleMenu = roleMenuResult;
    }
    return result;
  }
  async getList(
    keywords: string = "",
    orderBy: string = ""
  ): Promise<SysRole[]> {
    const result = await this.repository.find({
      where: [{ Name: Like("%" + keywords + "%") }],
      order: {
        Id: "ASC"
      },
    })
    for await (let item of result) {
      const roleMenuResult = await this.roleMenuRepository.find({
        where: { RoleId: item.Id },
      })
      item.SysRoleMenu = roleMenuResult;
    }
    return result;
  }
  async getById(id: number): Promise<SysRole> {
    const result = await this.repository.findOne({ where: { Id: id } });
    return result;
  }
  async getByIds(ids: number[]): Promise<SysRole[]> {
    const result = await this.repository.find({
      where: { Id: In(ids) }
    })
    return result;
  }
  async save(model: SysRole): Promise<boolean> {
    await this.repository.queryRunner?.startTransaction();
    try {
      //如果是编辑先删除主子表后，修改主表，新增子表
      if (model.Id > 0) {
        await this.repository.createQueryBuilder().update().set({ Name: model.Name, Remark: model.Remark, Status: model.Status }).where("Id = :Id", { Id: model.Id }).execute();
        await this.roleMenuRepository.delete({ RoleId: model.Id });
        for await (let item of model.SysRoleMenu) {
          item.RoleId = model.Id
        }
      } else {
        const result = await this.repository.createQueryBuilder().insert().values(model).execute();
        for await (let item of model.SysRoleMenu) {
          item.RoleId = result.identifiers[0].Id
        }
      }
      await this.roleMenuRepository.createQueryBuilder().insert().values(model.SysRoleMenu).execute();
      await this.repository.queryRunner?.commitTransaction();
      await this.repository.createQueryBuilder().useTransaction(true);
      return true;
    } catch (err) {
      await this.repository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return false;
    }
  }
  async destroy(id: number): Promise<boolean> {
    await this.repository.queryRunner?.startTransaction();
    try {
      //删除主子表
      await this.repository.delete({ Id: id });
      await this.roleMenuRepository.delete({ RoleId: id });
      await this.repository.queryRunner?.commitTransaction();
      await this.repository.createQueryBuilder().useTransaction(true);
      return true;
    } catch (err) {
      await this.repository.queryRunner?.rollbackTransaction();
      this.logger.warn(err);
      return false;
    }
  }
  //#endregion
}

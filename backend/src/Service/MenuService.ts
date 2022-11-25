/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 17:08:52
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditSysMenuime: 2022-11-18 11:31:43
 * @FilePath: \tsplatform\backend\src\Service\MenuService.ts
 * @Description: 系统菜单服务
 */

import { Injectable, Logger } from '@nestjs/common';
import { SysMenu } from 'src/Entity/SysMenu';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, InsertResult, Like, Repository } from 'typeorm';
import { LoggerPrint } from 'src/Logging/LoggerPrint';
import { menus } from 'src/SeedData/Menu';
@Injectable()
export class MenuService {
    private readonly tableName: string = "系统菜单";
    constructor(
        public readonly loggerPrint: LoggerPrint,
        public readonly logger: Logger,

        @InjectRepository(SysMenu)
        public readonly repository: Repository<SysMenu>
    ) {
    }
    //#region  基础控制器
    // 初始化数据
    async seedData(): Promise<number> {
        let result: InsertResult;
        await this.repository.queryRunner?.startTransaction();
        try {
            await this.repository.clear();
            result = await this.repository.createQueryBuilder().insert().values(menus).execute();
            await this.repository.queryRunner?.commitTransaction();
            await this.repository.createQueryBuilder().useTransaction(true);
            return result.identifiers.length;
        } catch (err) {
            //如果遇到错误，可以回滚事务
            await this.repository.queryRunner?.rollbackTransaction();
            this.logger.warn(err);
            return 0;
        }
    }
    async getPage(
        page: number = 1,
        pageSize: number = 10,
        keywords: string = "",
        orderBy: string = ""
    ): Promise<[SysMenu[], number]> {
        const result = await this.repository.findAndCount({
            where: [{ Title: Like("%" + keywords + "%") }, { Name: Like("%" + keywords + "%") }],
            order: {
                Id: "DESC"
            },
            skip: page - 1,
            take: pageSize
        })
       
        return result;
    }
    async getList(
        keywords: string = "",
        orderBy: string = ""
    ): Promise<SysMenu[]> {
        const result = await this.repository.find({
            where: [{ Name: Like("%" + keywords + "%") }],
            order: {
                Id: "DESC"
            },
        })
        return result;
    }
    async getById(id: number): Promise<SysMenu> {
        const result = await this.repository.findOne({ where: { Id: id } });
        return result;
    }
    async getByIds(ids: number[]): Promise<SysMenu[]> {
        const result = await this.repository.find({
            where: { Id: In(ids) },
        })
        return result;
    }
    async save(model: SysMenu): Promise<SysMenu> {
        const result = await this.repository.save(model);
        
        return result;
    }
    async destroy(id: number): Promise<DeleteResult> {
        const result = await this.repository.delete(id);
        return result;
    }
    //#endregion
}

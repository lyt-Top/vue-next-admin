/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 17:08:52
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 10:15:57
 * @FilePath: \tsplatform\backend\src\Service\UserService.ts
 * @Description: 系统用户服务
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, InsertResult, Like, Repository } from 'typeorm';
import { LoggerPrint } from 'src/Logging/LoggerPrint';
import { SysUser } from 'src/Entity/SysUser';
import { users } from 'src/SeedData/User';
@Injectable()
export class UserService {
    private readonly tableName: string = "系统用户";
    constructor(
        public readonly loggerPrint: LoggerPrint,
        public readonly logger: Logger,
        @InjectRepository(SysUser)
        public readonly repository: Repository<SysUser>
    ) {

    }
    //#region  基础控制器
     // 初始化数据
     async seedData(): Promise<number> {
        let result: InsertResult;
        await this.repository.queryRunner?.startTransaction();
        try {
            await this.repository.clear();
            result = await this.repository.createQueryBuilder().insert().values(users).execute();
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
    ): Promise<[SysUser[], number]> {
        const result = await this.repository.findAndCount({
            where: [{ Phone: Like("%" + keywords + "%") }, { UserName: Like("%" + keywords + "%") }, { NickName: Like("%" + keywords + "%") }],
            order: {
                Id: "ASC"
            },
            skip: page - 1,
            take: pageSize
        })
       
        return result;
    }
    async getList(
        keywords: string = "",
        orderBy: string = ""
    ): Promise<SysUser[]> {
        const result = await this.repository.find({
            where: [{ Phone: Like("%" + keywords + "%") }, { UserName: Like("%" + keywords + "%") }, { NickName: Like("%" + keywords + "%") }],
            order: {
                Id: "ASC"
            },
        })
        return result;
    }
    async getById(id: number): Promise<SysUser> {
        const result = await this.repository.findOne({ where: { Id: id } });
        return result;
    }
    async getByIds(ids: number[]): Promise<SysUser[]> {
        const result = await this.repository.find({
            where: { Id: In(ids) },
        })
        return result;
    }
    async save(model: SysUser): Promise<SysUser> {
        const result = await this.repository.save(model);
        return result;
    }
    async destroy(id: number): Promise<DeleteResult> {
        const result = await this.repository.delete(id);
        return result;
    }
    //#endregion
}

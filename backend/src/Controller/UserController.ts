/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 17:05:41
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 22:49:42
 * @FilePath: \tsplatform\backend\src\Controller\UserController.ts
 * @Description: 系统用户控制器
 */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RestfulReturn } from 'src/Expand/RestfulReturn';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { UserService } from 'src/Service/UserService';
import { SysUser } from 'src/Entity/SysUser';
import { IdDto, IdsDto, IdStatusDto, ListDto, PageDto } from 'src/EntiyDto/CommonDto';
import { RestfulHttpCodeEnum } from 'src/Enum/Global';
import { plainToClass } from 'class-transformer';
import { AppConfig } from 'src/Config/Index';
import { Md5 } from 'ts-md5';
import { UserDto } from 'src/EntiyDto/UserDto';
import { Equal, Not } from 'typeorm';
@ApiBearerAuth()
@ApiTags('系统用户管理')
@Controller('/user')
export class UserController {
    constructor(
        public readonly restful: RestfulReturn,
        public readonly service: UserService
    ) {
    }
    //#region  基础控制器
    @ApiOperation({
        summary: '分页查询用户列表',
        description: '分页查询用户列表'
    })
    @Get('/getPage')
    async getPage(@Query() dto: PageDto) {
        const result = await this.service.getPage(dto.Page, dto.PageSize, dto.Keywords, dto.OrderBy);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS,
            {
                total: result[1],
                page: 1,
                pageSize: 10,
                rows: result[0],

            }
        );
    }

    @ApiOperation({
        summary: '查询用户列表',
        description: '查询用户列表'
    })
    @Get('/getList')
    async getList(@Query() dto: ListDto) {
        const result = await this.service.getList(dto.Keywords, dto.OrderBy);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '根据ID查询用户',
        description: '根据ID查询用户'
    })
    @Get('/getById')
    async getById(@Query() dto: IdDto) {
        const result = await this.service.getById(dto.Id);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '根据ID数组查询用户',
        description: '根据ID数组查询用户'
    })
    @Get('/getByIds')
    async getByIds(@Query() dto: IdsDto) {
        const result = await this.service.getByIds(dto.Ids);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '新增用户',
        description: '新增用户'
    })
    @Post('/add')
    async add(@Body() dto: UserDto) {
        const model = plainToClass(SysUser, dto);
        const isRepeat = await this.service.repository.createQueryBuilder()
            .orWhere({ UserName: Equal(model.UserName.trim()), })
            .orWhere({ Phone: Equal(model.Phone.trim()) })
            .orWhere({ Email: Equal(model.Email.trim()) }).getCount();
        if (isRepeat > 0) {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.FAIL, "账号/手机号/邮箱重复！"
            );
        } else {
            //给新用户设置个默认密码：888888，用户登录后可以自行修改密码
            model.Password = Md5.hashStr(Md5.hashStr("888888") + AppConfig.md5Key);
            const result = await this.service.save(model);
            if (result) {
                return await this.restful.toJson(
                    RestfulHttpCodeEnum.SUCCESS, result
                );
            } else {
                return await this.restful.toJson(
                    RestfulHttpCodeEnum.FAIL, result
                );
            }
        }
    }

    @ApiOperation({
        summary: '修改用户',
        description: '修改用户'
    })
    @Post('/edit')
    async edit(@Body() dto: UserDto) {
        const model = plainToClass(SysUser, dto);
        const isRepeat = await this.service.repository.createQueryBuilder()
            .where({ Id: Not(model.Id) })
            .andWhere([{ UserName: Equal(model.UserName.trim()) }, { Phone: Equal(model.Phone.trim()) }, { Email: Equal(model.Email.trim()) }])
            .getCount();
        if (isRepeat > 0) {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.FAIL, "账号/手机号/邮箱重复！"
            );
        } else {
            //给新用户设置个默认密码：888888，用户登录后可以自行修改密码
            model.Password = Md5.hashStr(Md5.hashStr("888888") + AppConfig.md5Key);
            const result = await this.service.save(model);
            if (result) {
                return await this.restful.toJson(
                    RestfulHttpCodeEnum.SUCCESS, result
                );
            } else {
                return await this.restful.toJson(
                    RestfulHttpCodeEnum.FAIL, result
                );
            }
        }
    }

    @ApiOperation({
        summary: '假删除用户',
        description: '假删除用户'
    })
    @Post('/del')
    async del(@Body() dto: IdDto) {
        const result = await this.service.destroy(dto.Id);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '修改用户状态',
        description: '修改用户状态'
    })
    @Post('/setStatus')
    async setStatus(@Body() dto: IdStatusDto) {
        const result = await this.service.repository.createQueryBuilder()
            .update()
            .set({
                Status: dto.Status
            })
            .where("Id = :Id", { Id: dto.Id })
            .execute();
        if (result.affected > 0) {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.SUCCESS, result
            );
        } else {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.FAIL, result
            );
        }
    }
    //#endregion
}

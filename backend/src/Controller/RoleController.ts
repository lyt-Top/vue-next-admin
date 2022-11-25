/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 17:05:40
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 22:32:29
 * @FilePath: \tsplatform\backend\src\Controller\RoleController.ts
 * @Description: 系统角色控制器
 */

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RestfulReturn } from 'src/Expand/RestfulReturn';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { RoleService } from 'src/Service/RoleService';
import { IdDto, IdsDto, IdStatusDto, ListDto, PageDto } from 'src/EntiyDto/CommonDto';
import { RestfulHttpCodeEnum } from 'src/Enum/Global';
import { SysRole } from 'src/Entity/SysRole';
import { RoleDto } from 'src/EntiyDto/RoleDto';
import { plainToClass } from 'class-transformer';
import { Not } from 'typeorm';
@ApiBearerAuth()
@ApiTags('系统角色管理')
@Controller('/role')
export class RoleController {
    constructor(
        public readonly restful: RestfulReturn,
        public readonly service: RoleService
    ) {
    }

    //#region  基础控制器
    @ApiOperation({
        summary: '分页查询角色列表',
        description: '分页查询角色列表'
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
        summary: '查询角色列表',
        description: '查询角色列表'
    })
    @Get('/getList')
    async getList(@Query() dto: ListDto) {
        const result = await this.service.getList(dto.Keywords, dto.OrderBy);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '根据ID查询角色',
        description: '根据ID查询角色'
    })
    @Get('/getById')
    async getById(@Query() dto: IdDto) {
        const result = await this.service.getById(dto.Id);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '根据ID数组查询角色',
        description: '根据ID数组查询角色'
    })
    @Get('/getByIds')
    async getByIds(@Query() dto: IdsDto) {
        const result = await this.service.getByIds(dto.Ids);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '新增角色',
        description: '新增角色'
    })
    @Post('/add')
    async add(@Body() dto: RoleDto) {
        const model = plainToClass(SysRole, dto);
        const isRepeat = await this.service.repository.count({
            where: { Name: model.Name.trim() }
        });
        if (isRepeat > 0) {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.FAIL, "角色名称重复！"
            );
        } else {
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
        summary: '修改角色',
        description: '修改角色'
    })
    @Post('/edit')
    async edit(@Body() dto: RoleDto) {
        const model = plainToClass(SysRole, dto);
        const isRepeat = await this.service.repository.count({
            where: { Id: Not(model.Id), Name: model.Name.trim() }
        });
        if (isRepeat > 0) {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.FAIL, "角色名称重复！"
            );
        } else {
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
        summary: '删除角色',
        description: '删除角色'
    })
    @Post('/del')
    async del(@Body() dto: IdDto) {
        const result = await this.service.destroy(dto.Id);
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

    @ApiOperation({
        summary: '修改角色状态',
        description: '修改角色状态'
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

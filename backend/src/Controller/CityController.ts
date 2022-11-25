/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 17:05:40
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 11:11:20
 * @FilePath: \tsplatform\backend\src\Controller\RoleController.ts
 * @Description: 省市区控制器
 */

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RestfulReturn } from 'src/Expand/RestfulReturn';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { IdDto, IdsDto, ListDto, PageDto } from 'src/EntiyDto/CommonDto';
import { RestfulHttpCodeEnum } from 'src/Enum/Global';
import { CityService } from 'src/Service/CityService';
import { SysCity } from 'src/Entity/SysCity';
import { Equal, Not } from 'typeorm';
@ApiBearerAuth()
@ApiTags('省市区管理')
@Controller('/city')
export class CityController {
    constructor(
        public readonly restful: RestfulReturn,
        public readonly service: CityService
    ) {
    }
    //#region  基础控制器
    @ApiOperation({
        summary: '分页查询省市区列表',
        description: '分页查询省市区列表'
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
        summary: '查询省市区列表',
        description: '查询省市区列表'
    })
    @Get('/getList')
    async getList(@Query() dto: ListDto) {
        const result = await this.service.getList(dto.Keywords, dto.OrderBy);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '根据ID查询省市区',
        description: '根据ID查询省市区'
    })
    @Get('/getById')
    async getById(@Query() dto: IdDto) {
        const result = await this.service.getById(dto.Id);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '根据ID数组查询省市区',
        description: '根据ID数组查询省市区'
    })
    @Get('/getByIds')
    async getByIds(@Query() dto: IdsDto) {
        const result = await this.service.getByIds(dto.Ids);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '新增省市区',
        description: '新增省市区'
    })
    @Post('/add')
    async add(@Body() model: SysCity) {
        const isRepeat = await this.service.repository.createQueryBuilder()
            .orWhere({ RegionName: Equal(model.RegionName.trim()), })
            .orWhere({ RegionCode: Equal(model.RegionCode.trim()) }).getCount();
        if (isRepeat > 0) {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.FAIL, "地区名称或者行政编号重复！"
            );
        } else {
            const result = await this.service.save(new SysCity());
            return await this.restful.toJson(
                RestfulHttpCodeEnum.SUCCESS, result
            );
        }
    }

    @ApiOperation({
        summary: '修改省市区',
        description: '修改省市区'
    })
    @Post('/edit')
    async edit(@Body() model: SysCity) {
        const isRepeat = await this.service.repository.createQueryBuilder()
            .where({ Id: Not(model.Id) })
            .andWhere([{ RegionName: Equal(model.RegionName.trim()) }, { RegionCode: Equal(model.RegionCode.trim()) }])
            .getCount();
        if (isRepeat > 0) {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.FAIL, "地区名称或者行政编号重复！"
            );
        } else {
            const result = await this.service.save(new SysCity());
            return await this.restful.toJson(
                RestfulHttpCodeEnum.SUCCESS, result
            );
        }
    }

    @ApiOperation({
        summary: '假删除省市区',
        description: '假删除省市区'
    })
    @Post('/del')
    async del(@Body() dto: IdDto) {
        const result = await this.service.destroy(dto.Id);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }
    //#endregion

}

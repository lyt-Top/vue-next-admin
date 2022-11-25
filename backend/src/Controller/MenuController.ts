/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 00:23:12
 * @FilePath: \tsplatform\backend\src\Controller\MenuController.ts
 * @Description: 系统菜单控制器
 */

import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { RestfulReturn } from 'src/Expand/RestfulReturn';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiProperty,
    ApiTags,
} from '@nestjs/swagger';
import { SysMenu } from 'src/Entity/SysMenu';
import { plainToClass } from 'class-transformer';
import { IdDto, IdsDto, IdStatusDto, ListDto, PageDto, RoleIdDto } from 'src/EntiyDto/CommonDto';
import { MenuService } from 'src/Service/MenuService';
import { RestfulHttpCodeEnum } from 'src/Enum/Global';
import { MenuDto } from 'src/EntiyDto/MenuDto';
import { RouteMenu } from 'src/EntiyDto/RouteMenu';
import { Equal, In, Not } from 'typeorm';
import { RoleService } from 'src/Service/RoleService';

@Controller('/menu')
@ApiBearerAuth()
@ApiTags('系统菜单管理')
export class MenuController {
    constructor(
        public readonly restful: RestfulReturn,
        public readonly service: MenuService,
        public readonly _roleService: RoleService,
    ) {
    }

    @ApiOperation({
        summary: '获取所有菜单Tree，菜单列表使用',
        description: '获取所有菜单Tree'
    })
    @Get('/getMenuTree')
    async getMenuTree() {
        const result = await this.MenuTree(0);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }
    @ApiOperation({
        summary: '根据角色ID获取用户授权的菜单Tree，前端router使用',
        description: '根据角色ID获取用户授权的菜单Tree'
    })
    @Get('/getAuthMenuTree')
    async getAuthMenuTree(@Query() dto: RoleIdDto) {
        if (dto.RoleId > 0) {
            const result = await this.RouteTree(0, dto.RoleId);
            return await this.restful.toJson(
                RestfulHttpCodeEnum.SUCCESS, result
            );
        } else {
            throw new HttpException("角色Id不能为空！", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //递归获取菜单Tree
    private async MenuTree(parentId: number): Promise<SysMenu[]> {
        const result = await this.service.repository.createQueryBuilder()
            .where({ ParentId: parentId })
            .orderBy("sort", "ASC")
            .getMany();
        const treeList: SysMenu[] = new Array<SysMenu>;
        for await (let info of result) {
            const children = await this.MenuTree(info.Id);
            const node: any = {
                Id: info.Id,
                ParentId: info.ParentId,
                Type: info.Type,
                Title: info.Title,
                Path: info.Path,
                Permission: info.Permission,
                Component: info.Component,
                Icon: info.Icon,
                Name: info.Name,
                Redirect: info.Redirect,
                IsLink: info.IsLink,
                IsHide: info.IsHide,
                IsKeepAlive: info.IsKeepAlive,
                IsAffix: info.IsAffix,
                IsIframe: info.IsIframe,
                Children: [],
                Sort: info.Sort,
            };
            if (children.length > 0) {
                node.Children = children;
            }
            treeList.push(node);
        }
        return treeList;
    }
    //递归获取前端路由Tree
    private async RouteTree(parentId: number, RoleId: number): Promise<RouteMenu[]> {
        const menuRole = await this._roleService.getMenusByRoleId(RoleId);
        const menuIds: number[] = [];
        for await (const info of menuRole) {
            menuIds.push(info.MenuId);
        }
        const result = await this.service.repository.createQueryBuilder()
            .where({ ParentId: parentId, Id: In(menuIds) })
            .orderBy("sort", "ASC")
            .getMany();
        const treeList: RouteMenu[] = new Array<RouteMenu>;
        for await (let info of result) {
            const children = await this.RouteTree(info.Id, RoleId);
            const node: RouteMenu = {
                name: info.Name,
                path: info.Path,
                component: info.Component,
                redirect: info.Redirect,
                meta: {
                    title: info.Title,
                    icon: info.Icon,
                    isLink: info.IsLink,
                    isHide: info.IsHide,
                    isKeepAlive: info.IsKeepAlive,
                    isAffix: info.IsAffix,
                    isIframe: info.IsIframe,
                    permission: info.Permission,
                },
                children: [],
            };
            if (children.length > 0) {
                for await (let item of children) {
                    node.children.push({
                        name: item.name,
                        path: item.path,
                        component: item.component,
                        redirect: item.redirect,
                        meta: {
                            title: item.meta.title,
                            icon: item.meta.icon,
                            isLink: item.meta.isLink,
                            isHide: item.meta.isHide,
                            isKeepAlive: item.meta.isKeepAlive,
                            isAffix: item.meta.isAffix,
                            isIframe: item.meta.isIframe,
                            permission: item.meta.permission,
                        },
                        children: [],
                    });
                }

            }
            treeList.push(node);
        }
        return treeList;
    }
    //#region  基础控制器
    @ApiOperation({
        summary: '分页查询菜单列表',
        description: '分页查询菜单列表'
    })
    @ApiProperty()
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
        summary: '查询菜单列表',
        description: '查询菜单列表'
    })
    @Get('/getList')
    async getList(@Query() dto: ListDto) {
        const result = await this.service.getList(dto.Keywords, dto.OrderBy);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '根据ID查询菜单',
        description: '根据ID查询菜单'
    })
    @Get('/getById')
    async getById(@Query() dto: IdDto) {
        const result = await this.service.getById(dto.Id);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '根据ID数组查询菜单',
        description: '根据ID数组查询菜单'
    })
    @Get('/getByIds')
    async getByIds(@Query() dto: IdsDto) {
        const result = await this.service.getByIds(dto.Ids);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }

    @ApiOperation({
        summary: '新增菜单',
        description: '新增菜单'
    })
    @Post('/add')
    async add(@Body() dto: MenuDto) {
        const model = plainToClass(SysMenu, dto);
        const isRepeat = await this.service.repository.createQueryBuilder()
            .orWhere({ Name: Equal(model.Name.trim()), })
            .orWhere({ Permission: Equal(model.Permission.trim()) }).getCount();
        if (isRepeat > 0) {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.FAIL, "路由名称或者权限标识重复！"
            );
        } else {
            const result = await this.service.save(model);
            return await this.restful.toJson(
                RestfulHttpCodeEnum.SUCCESS, result
            );
        }
    }

    @ApiOperation({
        summary: '修改菜单',
        description: '修改菜单'
    })
    @Post('/edit')
    async edit(@Body() dto: MenuDto) {
        const model = plainToClass(SysMenu, dto);
        const isRepeat = await this.service.repository.createQueryBuilder()
            .where({ Id: Not(model.Id) })
            .andWhere([{ Name: Equal(model.Name.trim()) }, { Permission: Equal(model.Permission.trim()) }])
            .getCount();
        if (isRepeat > 0) {
            return await this.restful.toJson(
                RestfulHttpCodeEnum.FAIL, "路由名称或者权限标识重复！"
            );
        } else {
            const result = await this.service.save(model);
            return await this.restful.toJson(
                RestfulHttpCodeEnum.SUCCESS, result
            );
        }
    }

    @ApiOperation({
        summary: '假删除菜单',
        description: '假删除菜单'
    })
    @Post('/del')
    async del(@Body() dto: IdDto) {
        const result = await this.service.destroy(dto.Id);
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, result
        );
    }
    @ApiOperation({
        summary: '修改菜单状态',
        description: '修改菜单状态'
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

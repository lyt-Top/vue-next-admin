/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 17:06:21
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 11:11:11
 * @FilePath: \tsplatform\backend\src\Controller\AuthController.ts
 * @Description: 系统授权控制器
 */
import { Body, Controller, Get, Post, Request, Req, UseGuards } from '@nestjs/common';
import { RestfulReturn } from 'src/Expand/RestfulReturn';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { UserService } from 'src/Service/UserService';
import { RestfulHttpCodeEnum } from 'src/Enum/Global';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/EntiyDto/LoginDto';
import { AppConfig } from 'src/Config/Index';
import { RoleService } from 'src/Service/RoleService';
import { MenuService } from 'src/Service/MenuService';

@ApiBearerAuth()
@ApiTags('系统授权管理')
@Controller('/auth')
export class AuthController {
    constructor(
        public readonly _restful: RestfulReturn,
        public readonly _service: UserService,
        public readonly _roleService: RoleService,
        public readonly _menuService: MenuService,
        public readonly _jwt: JwtService
    ) { }

    @ApiOperation({
        summary: '获取账号登录验证码',
        description: '获取账号登录验证码'
    })
    @Get('/captcha')
    async captcha() {
        return await this._restful.toJson(
            RestfulHttpCodeEnum.SUCCESS, ""
        );
    }

    @ApiOperation({
        summary: '账号密码登录',
        description: '账号密码登录'
    })
    @Post('/login')
    async login(@Body() dto: LoginDto) {
        const result = await this._service.repository.findOne({ where: { UserName: dto.UserName, Password: dto.Password } });
        if (result && result.Id > 0) {
            const token = await this._jwt.signAsync({ uid: result.Id }, {
                secret: AppConfig.jwt.secret,
                expiresIn: AppConfig.jwt.expiresIn,
            });
            return await this._restful.toJson(
                RestfulHttpCodeEnum.SUCCESS, { userinfo: result, token: token }
            );
        } else {
            return await this._restful.toJson(
                RestfulHttpCodeEnum.FAIL, "账号密码有误！"
            );
        }
    }

    @ApiOperation({
        summary: '根据token获取用户信息',
        description: '根据token获取用户信息'
    })

    @Get('/getUserInfo')
    async getUserInfo(@Req() request: Request) {
        try {
            const token = request.headers["authorization"];
            const jwtResult = await this._jwt.verifyAsync(token, { secret: AppConfig.jwt.secret, ignoreExpiration: false })
            const uid = jwtResult.uid;
            const result = await this._service.getById(uid);
            const menuRole = await this._roleService.getMenusByRoleId(result.RoleId);
            const menuIds: number[] = [];
            for await (const info of menuRole) {
                menuIds.push(info.MenuId);
            }
            const menus = await this._menuService.repository.createQueryBuilder().whereInIds(menuIds).getMany()
            const permissions: string[] = [];
            for await (const info of menus) {
                permissions.push(info.Permission);
            }
            return await this._restful.toJson(
                RestfulHttpCodeEnum.SUCCESS, { userInfo: result, permission: permissions }
            );
        }
        catch (ex) {
            return await this._restful.toJson(
                RestfulHttpCodeEnum.FAIL, ex
            );
        }
    }

    @ApiOperation({
        summary: '根据token退出登录',
        description: '根据token退出登录'
    })
    @Get('/loginOut')
    async loginOut(@Req() request: Request) {
        try {
            const token = request.headers["authorization"];
            const jwtResult = await this._jwt.verifyAsync(token, { secret: AppConfig.jwt.secret, ignoreExpiration: false })
            const uid = jwtResult.uid;
            const result = await this._service.getById(uid);
            return await this._restful.toJson(
                RestfulHttpCodeEnum.SUCCESS, result
            );
        }
        catch (ex) {
            return await this._restful.toJson(
                RestfulHttpCodeEnum.FAIL, ex
            );
        }
    }
}

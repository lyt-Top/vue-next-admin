/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 17:05:41
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 10:11:01
 * @FilePath: \tsplatform\backend\src\Controller\UserController.ts
 * @Description: 系统用户控制器
 */
import { Controller, Get } from '@nestjs/common';
import { RestfulReturn } from 'src/Expand/RestfulReturn';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { RestfulHttpCodeEnum } from 'src/Enum/Global';
import { CityService } from 'src/Service/CityService';
import { RoleService } from 'src/Service/RoleService';
import { MenuService } from 'src/Service/MenuService';
import { UserService } from 'src/Service/UserService';
@ApiBearerAuth()
@ApiTags('系统管理')
@Controller('/')
export class IndexController {
    constructor(
        public readonly restful: RestfulReturn,
        public readonly role_service: RoleService,
        public readonly menu_service: MenuService,
        public readonly user_service: UserService,
        public readonly city_service: CityService,
    ) {
    }

    @ApiOperation({
        summary: '数据初始化',
        description: '数据初始化'
    })
    @Get('/seed')
    async seedData() {
        //初始化账号数据
        const userCount = await this.user_service.seedData();
        //初始化菜单数据
        const menuCount = await this.menu_service.seedData();
        //初始化角色数据
        const roleCounts = await this.role_service.seedData();
        //初始化省市区数据
        const cityCount = await this.city_service.seedData();
        return await this.restful.toJson(
            RestfulHttpCodeEnum.SUCCESS,
            `一共Seed${userCount}条记录！\r\n` +
            `一共Seed${menuCount}条记录！\r\n` +
            `一共Seed${roleCounts[0]}条记录！\r\n` +
            `一共Seed${roleCounts[0]}条记录！\r\n` +
            `一共Seed${cityCount}条记录！`
        );
    }
}

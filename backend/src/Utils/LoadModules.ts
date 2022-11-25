/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 11:44:48
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 17:51:54
 * @FilePath: \tsplatform\backend\src\Utils\LoadModules.ts
 * @Description: 全局加载模块
 */
import { Logger } from '@nestjs/common';
import { RestfulReturn } from 'src/Expand/RestfulReturn';
import { LoggerPrint } from 'src/Logging/LoggerPrint';
import { JwtService } from '@nestjs/jwt';

import { SysMenu } from 'src/Entity/SysMenu';
import { SysCity } from 'src/Entity/SysCity';
import { SysUser } from 'src/Entity/SysUser';
import { SysRole } from 'src/Entity/SysRole';
import { SysRoleMenu } from 'src/Entity/SysRoleMenu';

import { IndexController } from 'src/Controller/IndexController';
import { MenuController } from 'src/Controller/MenuController';
import { AuthController } from 'src/Controller/AuthController';
import { UserController } from 'src/Controller/UserController';
import { RoleController } from 'src/Controller/RoleController';
import { CityController } from 'src/Controller/CityController';

import { MenuService } from 'src/Service/MenuService';
import { UserService } from 'src/Service/UserService';
import { RoleService } from 'src/Service/RoleService';
import { Repository } from 'typeorm';
import { CityService } from 'src/Service/CityService';


//自动导入Entity
export function LoadPlatFormEntity() {
	return [SysCity, SysMenu, SysUser, SysRole, SysRoleMenu];
}
//自动导入Controller
export function LoadController() {
	return [IndexController, CityController, MenuController, UserController, AuthController, RoleController,];
}
//自动导入Service服务
export function LoadService() {
	return [
		//特殊服务提供者
		RestfulReturn, Logger, LoggerPrint, Repository,JwtService,
		//Service服务提供者
		MenuService, UserService, RoleService, CityService
	];
}
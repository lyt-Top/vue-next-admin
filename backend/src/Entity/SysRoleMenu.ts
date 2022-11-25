/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 13:54:50
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 17:32:38
 * @FilePath: \tsplatform\backend\src\Entity\SysRoleMenu.ts
 * @Description: 系统角色菜单映射实体模型
 */

import { Entity, Column, ManyToOne } from 'typeorm';
import { SysBase } from 'src/Entity/SysBase';
@Entity()
export class SysRoleMenu extends SysBase {
    @Column({ comment: "菜单Id", default: 0 })
    MenuId: number;
    @Column({ comment: "角色Id", default: 0 })
    RoleId: number;
}
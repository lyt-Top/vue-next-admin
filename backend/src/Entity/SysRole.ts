/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 13:08:01
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 16:46:20
 * @FilePath: \tsplatform\backend\src\Entity\SysRole.ts
 * @Description: 系统角色实体模型
 */

import { Entity, Column } from 'typeorm';
import { SysBase } from 'src/Entity/SysBase';
import { SysRoleMenu } from 'src/Entity/SysRoleMenu';
@Entity()
export class SysRole extends SysBase {
    @Column({ comment: "角色名称", unique: true })
    Name: string;

    @Column({ comment: "备注", nullable: true })
    Remark: string;

    SysRoleMenu: SysRoleMenu[];
}
/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 13:10:02
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-22 15:08:00
 * @FilePath: \tsplatform\backend\src\Entity\SysDictionaries.ts
 * @Description: 系统字典实体模型
 */

import { Entity, Column } from 'typeorm';
import { SysBase } from 'src/Entity/SysBase';
@Entity()
export class SysDictionaries extends SysBase {
    @Column({ comment: "字典名称" })
    Name: string;

    @Column({ comment: "备注", nullable: true })
    Remark: string;
}
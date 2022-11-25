/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 13:12:19
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-18 14:18:50
 * @FilePath: \tsplatform\backend\src\Entity\SysCity.ts
 * @Description: 系统城市实体模型
 */

import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class SysCity {

    @PrimaryGeneratedColumn()
    @PrimaryColumn({ comment: "ID" })
    Id: number;

    @Column({ comment: "地区编号" })
    RegionId: string;

    @Column({ comment: "地区名称" })
    RegionName: string;

    @Column({ comment: "地区简称", nullable: true })
    RegionShortName: string;

    @Column({ comment: "地区行政编号", nullable: true })
    RegionCode: string;

    @Column({ comment: "地区父级ID" })
    RegionParentId: string;

    @Column({ comment: "地区级别" })
    RegionLevel: number;
}
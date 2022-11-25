/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 11:26:13
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-22 21:57:27
 * @FilePath: \tsplatform\backend\src\Entity\SysBase.ts
 * @Description: 系统基类实体模型
 */

import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
@Entity()
export class SysBase {
    @PrimaryGeneratedColumn()
    @PrimaryColumn({ comment: "ID" })
    Id: number;

    @Column({ comment: "状态", default: 0, nullable: true })
    Status: number;

    @Column({ comment: "商户/站点ID", default: 0, nullable: true })
    MerchantId: number;

    //自动为实体插入日期
    @CreateDateColumn()
    CreateTime: Date;

    //每次调用实体管理器或存储库的save时，自动更新实体日期
    @UpdateDateColumn()
    UpdateTime: Date;

    @Column({ comment: "操作人ID", default: 0, nullable: true })
    OperatorId: number;

    @Column({ comment: "修改人ID", default: 0, nullable: true })
    UpdateUserId: number;

    @Column({ comment: "是否删除", default: false, nullable: true })
    IsDelete: boolean;

    //每次调用实体管理器或存储库的save时自动增长实体版本
    @VersionColumn()
    Version: number;
}
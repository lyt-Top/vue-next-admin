/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 13:55:35
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 23:13:45
 * @FilePath: \tsplatform\backend\src\Entity\SysUser.ts
 * @Description: 系统用户映射实体模型
 */
import { Entity, Column, Index } from 'typeorm';
import { SysBase } from 'src/Entity/SysBase';
import { SexEnum, UserTypeEnum } from 'src/Enum/Global';
@Entity()
export class SysUser extends SysBase {
    @Column({ comment: "账号类型", default: 1 })
    UserType: UserTypeEnum;

    @Column({ comment: "账号", unique: true })
    UserName: string;

    @Column({ comment: "密码" })
    Password: string;

    @Column({ comment: "昵称", nullable: true })
    NickName: string;

    @Column({ comment: "头像", nullable: true })
    Avatar: string;

    @Column({ comment: "出生日期", nullable: true })
    Birthday: string;

    @Column({ comment: "性别", nullable: true, default: 0 })
    Sex: SexEnum;

    @Column({ comment: "邮箱", unique: true })
    Email: string;

    @Column({ comment: "手机号码", unique: true })
    Phone: string;

    @Column({ comment: "真实姓名", nullable: true })
    RealName: string;

    @Column({ comment: "身份证号", nullable: true })
    IdCard: string;

    @Column({ comment: "个性签名", nullable: true })
    Signature: string;
    @Column({ comment: "个人简介", nullable: true })
    Introduction: string;

    @Column({ comment: "备注", nullable: true })
    Remark: string;

    @Column({ comment: "角色Id", default: 0 })
    RoleId: number;
}
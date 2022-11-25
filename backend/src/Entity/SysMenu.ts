/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 11:21:40
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 21:52:49
 * @FilePath: \tsplatform\backend\src\Entity\SysMenu.ts
 * @Description: 系统菜单实体模型
 */

import { Entity, Column } from 'typeorm';
import { SysBase } from 'src/Entity/SysBase';
import { MenuEnum } from 'src/Enum/Global';
@Entity()
export class SysMenu extends SysBase {
    @Column({ comment: "父级ID", default: 0 })
    ParentId: number;

    @Column({ comment: "菜单类型", default: 0 })
    Type: MenuEnum;

    @Column({ comment: "路由名称", unique: true })
    Name: string;

    @Column({ comment: "路由地址", nullable: true })
    Path: string;

    @Column({ comment: "组件名称", nullable: true })
    Component: string;

    @Column({ comment: "重定向路径", nullable: true })
    Redirect: string;

    @Column({ comment: "菜单名称" })
    Title: string;

    @Column({ comment: "是否外链，开启外链条件，`1、isLink: 链接地址不为空 2、isIframe:false`", nullable: true })
    IsLink: string;

    @Column({ comment: "是否隐藏此路由" })
    IsHide: boolean;

    @Column({ comment: "是否缓存组件状态" })
    IsKeepAlive: boolean;

    @Column({ comment: "是否固定在 tagsView 栏上" })
    IsAffix: boolean;

    @Column({ comment: "是否内嵌窗口，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`" })
    IsIframe: boolean;

    @Column({ comment: "路由权限标识", unique: true })
    Permission: string;

    @Column({ comment: "菜单图标", nullable: true })
    Icon: string;

    @Column({ comment: "排序", nullable: true, default: 0 })
    Sort: number;

    Children: SysMenu[];
}
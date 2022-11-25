/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-18 17:35:08
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 12:13:13
 * @FilePath: \tsplatform\backend\src\EntiyDto\RouteMenu.ts
 * @Description: RouteMenu类  菜单树查询，不需要dto映射
 */
export class RouteMenu {
    name: string;
    path: string;
    component: string;
    redirect: string;
    meta: Meta;
    children: RouteMenu[];
}
export class Meta {
    title: string;
    isLink: string;
    isHide: boolean;
    isKeepAlive: boolean;
    isAffix: boolean;
    isIframe: boolean;
    permission: string;
    icon: string;
}
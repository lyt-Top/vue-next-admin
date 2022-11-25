/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-18 09:02:28
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 10:13:53
 * @FilePath: \tsplatform\backend\src\Logging\LoggerPrint.ts
 * @Description: 全局日志打印服务
 */

import { Injectable, Logger } from "@nestjs/common";
@Injectable()
export class LoggerPrint {
    constructor(private readonly logger: Logger) {
    } 
}

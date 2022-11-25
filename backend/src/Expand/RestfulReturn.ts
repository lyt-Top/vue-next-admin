/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-18 09:10:15
 * @FilePath: \tsplatform\backend\src\Expand\RestfulReturn.ts
 * @Description: RestfulAPI全局响应结构
 */
import { Injectable } from "@nestjs/common";
import { RestfulHttpCodeEnum } from "src/Enum/Global";
@Injectable()
export class RestfulReturn {
    //HttpStatus=200时的状态码规则
    toJson(code: RestfulHttpCodeEnum, data: any) {
        return {
            code: code,
            msg: code === RestfulHttpCodeEnum.SUCCESS ? "操作成功！" :
                code === RestfulHttpCodeEnum.FAIL ? "操作失败！" :
                    code === RestfulHttpCodeEnum.NODATA ? "数据为空！" : "未知错误！",
            data: data,
            timespan: new Date().getTime()
        }
    }
}

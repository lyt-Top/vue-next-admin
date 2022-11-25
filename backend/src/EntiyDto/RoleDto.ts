/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-22 16:16:08
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 12:12:56
 * @FilePath: \backend\src\EntiyDto\RoleDto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class RoleDto {
    @IsNotEmpty()
    @ApiProperty({ name: "Name", required: true })
    Name: string;

    @ApiProperty({ name: "Remark" })
    Remark: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ name: "SysRoleMenu", required: true })
    SysRoleMenu: number[];
}
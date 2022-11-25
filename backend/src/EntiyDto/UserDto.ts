/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-22 16:16:19
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 21:32:25
 * @FilePath: \backend\src\EntiyDto\UserDto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ name: "UserType", required: true })
    UserType: number;

    @IsNotEmpty()
    @ApiProperty({ name: "Name", required: true })
    UserName: string;

    @ApiProperty({ name: "Password" })
    Password: string;

    @ApiProperty({ name: "NickName" })
    NickName: string;

    @ApiProperty({ name: "Avatar" })
    Avatar: string;

    @ApiProperty({ name: "Birthday" })
    Birthday: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ name: "Sex" })
    Sex: number;

    @ApiProperty({ name: "Email", required: true })
    Email: string;

    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ name: "Phone", required: true })
    Phone: string;

    @ApiProperty({ name: "RealName" })
    RealName: string;

    @ApiProperty({ name: "IdCard" })
    IdCard: string;

    @ApiProperty({ name: "Signature" })
    Signature: string;

    @ApiProperty({ name: "Introduction" })
    Introduction: string;

    @ApiProperty({ name: "Remark" })
    Remark: string;

    @ApiProperty({ name: "RoleId", required: true })
    RoleId: number;
}
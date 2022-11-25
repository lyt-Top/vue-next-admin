/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-18 17:35:08
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-23 12:12:42
 * @FilePath: \tsplatform\backend\src\EntiyDto\Login.ts
 * @Description:  DTO类
 */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ name: "UserName", required: true })
    UserName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ name: "Password", required: true })
    Password: string;
}
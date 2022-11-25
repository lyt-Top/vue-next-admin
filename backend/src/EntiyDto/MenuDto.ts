/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-18 17:35:08
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 00:14:13
 * @FilePath: \tsplatform\backend\src\EntiyDto\MenuDto.ts
 * @Description: SysMenu DTO类
 */
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MenuEnum } from "src/Enum/Global";

export class MenuDto {
    @ApiProperty({ name: "ParentId" })
    ParentId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ name: "Type", required: true })
    Type: MenuEnum;

    @ApiProperty({ name: "Name", required: false })
    Name: string;

    @ApiProperty({ name: "Path", required: false })
    Path: string;

    @ApiProperty({ name: "Component", required: false })
    Component: string;

    @ApiProperty({ name: "Redirect", required: false })
    Redirect: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ name: "Title", required: true })
    Title: string;


    @ApiProperty({ name: "IsLink", required: false })
    IsLink: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ name: "IsHide", required: true })
    IsHide: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ name: "IsKeepAlive", required: true })
    IsKeepAlive: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ name: "IsAffix", required: true })
    IsAffix: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ name: "IsIframe", required: true })
    IsIframe: boolean;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ name: "Permission", required: true })
    Permission: string;

    @ApiProperty({ name: "Icon", required: false })
    Icon: string;
}
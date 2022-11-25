/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-18 09:02:28
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 00:20:22
 * @FilePath: \tsplatform\backend\src\Expand\CommonDto.ts
 * @Description: 公共DTO服务
 */

import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";
//分页查询DTO
@Injectable()
export class PageDto {
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ name: "Page", required: true })
    Page: number

    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ name: "PageSize", required: true })
    PageSize: number

    @ApiProperty({ name: "Keywords", required: false })
    Keywords: string

    @ApiProperty({ name: "OrderBy", required: false })
    OrderBy: string
}

//列表查询DTO
@Injectable()
export class ListDto {
    @ApiProperty({ name: "Keywords", required: false })
    Keywords: string

    @ApiProperty({ name: "OrderBy", required: false })
    OrderBy: string
}

//ids DTO
@Injectable()
export class IdsDto {
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ name: "Ids", required: true })
    Ids: number[]
}
//id DTO
@Injectable()
export class IdDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ name: "Id", required: true })
    Id: number
}
@Injectable()
export class RoleIdDto {
    @ApiProperty({ name: "RoleId" })
    RoleId: number;
}


//Id Status DTO
@Injectable()
export class IdStatusDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ name: "Id", required: true })
    Id: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ name: "Status", required: true })
    Status: number
}
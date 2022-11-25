/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-21 11:57:30
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-22 10:41:09
 * @FilePath: \tsplatform\backend\src\Middleware\JwtHandle.ts
 * @Description: 授权中间件
 */
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { AppConfig } from 'src/Config/Index';

@Injectable()
export class JwtHandle implements NestMiddleware {
    constructor(
        public readonly _jwt: JwtService
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers["authorization"];
            if (!token) {
                throw new HttpException("Token指令牌不存在！", HttpStatus.UNAUTHORIZED);
            } else {
                await this._jwt.verifyAsync(token, { secret: AppConfig.jwt.secret, ignoreExpiration: false })
                next();
            }
        }
        catch (ex) {
            throw new HttpException(ex.message, HttpStatus.UNAUTHORIZED);
        }
    }
}

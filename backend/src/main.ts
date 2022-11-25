/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 11:17:23
 * @FilePath: \tsplatform\backend\src\main.ts
 * @Description: 主程序入口
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfig } from 'src/Config/Index';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: ['error', 'warn', "log", "debug", "verbose"], cors: true });

  //全局Dto参数校验管道
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    //基础文档里添加安全定义   
    .addBearerAuth()
    .setTitle('甜蜜蜜TS开发总平台')
    .setDescription('甜蜜蜜TS开发总平台')
    .setContact("甜蜜蜜", "https://gitee.com/tmm-top/vue-next-admin-ts", "490912587@qq.com")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  await app.listen(AppConfig.port, '0.0.0.0');
}
bootstrap();

/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 09:19:20
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 10:16:52
 * @FilePath: \tsplatform\backend\src\app.module.ts
 * @Description: 全局模块入口
 */

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadController, LoadPlatFormEntity, LoadService } from 'src/Utils/LoadModules';
import { AppConfig, DataBaseConfig } from 'src/Config/Index';
import { JwtHandle } from 'src/Middleware/JwtHandle';
@Module({
  imports: [
    TypeOrmModule.forFeature(LoadPlatFormEntity()),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        debug: false,
        //重试连接数据库的次数
        retryAttempts: 10,
        //两次重试连接的间隔(ms)
        retryDelay: 3000,
        //自动加载实体
        autoLoadEntities: true,
        type: 'mysql',
        host: DataBaseConfig.DataBase.host,
        port: DataBaseConfig.DataBase.port,
        username: DataBaseConfig.DataBase.username,
        password: DataBaseConfig.DataBase.password,
        database: DataBaseConfig.DataBase.database,
        entities: LoadPlatFormEntity(),
        logging: AppConfig.debug,
        synchronize: AppConfig.debug,
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),

  ],
  controllers: LoadController(),
  providers: LoadService()
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtHandle)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/getUserInfo', method: RequestMethod.GET },
        { path: '/seed', method: RequestMethod.GET },

      )
      .forRoutes("*");
  }

}

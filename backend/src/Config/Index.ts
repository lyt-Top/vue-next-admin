/*
 * @Author: '490912587@qq.com' '490912587@qq.com'
 * @Date: 2022-11-17 10:59:16
 * @LastEditors: '490912587@qq.com' '490912587@qq.com'
 * @LastEditTime: 2022-11-24 10:58:50
 * @FilePath: \tsplatform\backend\src\Config\Index.ts
 * @Description: 系统全局配置
 */


/**
 * 系统配置
 */
export const AppConfig = {
    debug: false,
    port: 3000,
    jwt: {
        secret: "4vRk^ga52xVP$B2vYK$%r8a8hctLgbU9",
        expiresIn: "60000s"
    },
    md5Key: `4vRk^ga52xVP$B2vYK$%r8a8hctLgbU9`
}
/**
 * 数据库配置
 */
export const DataBaseConfig = {
    DataBase: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'sweet_honey',
        username: 'root',
        password: 'root',
        //是否自动迁移同步
        synchronize: true,
    },
    DataBase1: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'test1',
        username: 'root',
        password: 'root',
        //是否自动迁移同步
        synchronize: true,
    }
}
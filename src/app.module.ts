//import { Module } from '@nestjs/common';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'

import { mainModule } from './module/main.module';

import { verifyToken } from './Middleware/verify-token'

require('dotenv').config()

@Module({
  imports: [mainModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USERNAMEE,
    password: '',
    database: process.env.DATABASE,
    entities: ['dist/**/*.model.js'],
    synchronize: true,
  },)],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyToken)
      .forRoutes('/calculo');
  }
}

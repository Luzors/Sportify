import { Module } from '@nestjs/common';
import {BackendFeaturesAssociationModule, BackendFeaturesUserModule} from '@sportify-nx/backend/features'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    BackendFeaturesUserModule, BackendFeaturesAssociationModule,

    //local
    //  MongooseModule.forRoot('mongodb://127.0.0.1:27017/sportifymdb')],
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_CONNECTION_STRING')
        })
      }
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

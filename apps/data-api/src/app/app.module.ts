import { Module } from '@nestjs/common';
import {BackendFeaturesAssociationModule, BackendFeaturesUserModule} from '@sportify-nx/backend/features'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {environment} from '@sportify/shared/util-env'

@Module({
  imports: [
    BackendFeaturesUserModule, BackendFeaturesAssociationModule,
     MongooseModule.forRoot("mongodb+srv://jorn:sportifydbpassword1@sportifyatlas.jgwoewq.mongodb.net/?retryWrites=true&w=majority")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

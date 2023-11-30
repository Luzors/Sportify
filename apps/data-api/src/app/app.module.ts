import { Module } from '@nestjs/common';
import {BackendFeaturesAssociationModule, BackendFeaturesUserModule, BackendFeaturesAuthModule, BackendFeaturesEventModule} from '@sportify-nx/backend/features'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BackendFeaturesUserModule, BackendFeaturesAssociationModule, BackendFeaturesAuthModule, BackendFeaturesEventModule,
     MongooseModule.forRoot("mongodb+srv://jorn:sportifydbpassword1@sportifyatlas.jgwoewq.mongodb.net/?retryWrites=true&w=majority")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

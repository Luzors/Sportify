import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/schemas/user.schema';
import { jwtConstants } from './auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './admin/admin.service';
import { Admin, AdminSchema } from './admin/schemas/admin.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, AdminService],
  exports: [
    AuthService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
})
export class BackendFeaturesAuthModule {}

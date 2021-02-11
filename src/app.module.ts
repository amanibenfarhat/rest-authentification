import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './user/roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),MongooseModule.forRoot(process.env.DATABASE_URL),
  UserModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule {}

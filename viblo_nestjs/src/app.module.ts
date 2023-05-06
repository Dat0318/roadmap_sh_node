import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../models/orm-config';
import { MessagesModule } from '../models/messages/messages.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

export default config;

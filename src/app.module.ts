import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Message } from './messages/entity/message';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'code',
      password: '123456',
      database: 'blog',
      entities: [Message],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [AppController, MessagesController],
  providers: [AppService, MessagesService],
})
export class AppModule {}

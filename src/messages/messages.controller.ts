import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './entity/message';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  async create(@Body() message: Message, @Res() res) {
    try {
      await this.messagesService.create(message);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Message created' });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Message not created' });
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const data = await this.messagesService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Put(':id')
  update(@Body() message: Message, @Param('id') id, @Res() res) {
    try {
      this.messagesService.update(id, message);
      return res.status(HttpStatus.OK).json({ message: 'Message updated' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Delete(':id')
  delete(@Param('id') id, @Res() res) {
    try {
      this.messagesService.delete(id);
      return res.status(HttpStatus.OK).json({ message: 'Message deleted' });
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json(error);
    }
  }
}

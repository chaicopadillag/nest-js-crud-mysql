import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entity/message';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async create(message: Message): Promise<Message> {
    // const newMessage = new Message();
    // newMessage.message = message.message;
    // newMessage.nick = message.nick;

    return await this.messageRepository.save(message);
  }

  async update(id: number, message: Message): Promise<Message> {
    const messageToUpdate = await this.messageRepository.findOne(id);
    messageToUpdate.message = message.message;
    messageToUpdate.nick = message.nick;
    return await this.messageRepository.save(messageToUpdate);
  }

  async delete(id: number) {
    return await this.messageRepository.delete(id);
  }
}

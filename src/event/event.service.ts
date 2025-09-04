import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const entity = this.repo.create({
      title: dto.title,
      description: dto.description,
      location: dto.location,
      occurTime: new Date(dto.occurTime),
      imageUrl: dto.imageUrl,
    });
    return await this.repo.save(entity);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from '../entities/technology';
import { CreateTechnologyDto } from './dto/create-technology.dto';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology)
    private readonly repo: Repository<Technology>,
  ) {}

  async create(dto: CreateTechnologyDto): Promise<Technology> {
    const entity = this.repo.create({
      name: dto.name,
      slug: dto.slug,
      category: dto.category,
      description: dto.description,
      proficiency: dto.proficiency,
      iconUrl: dto.iconUrl,
    });
    return await this.repo.save(entity);
  }
}

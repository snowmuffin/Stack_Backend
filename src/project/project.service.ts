import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from '../entities/project';
import { Technology } from '../entities/technology';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Technology)
    private readonly techRepo: Repository<Technology>,
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    let technologies: Technology[] = [];
    if (dto.technologyIds?.length) {
      technologies = await this.techRepo.find({
        where: { id: In(dto.technologyIds) },
      });
      const missing = dto.technologyIds.filter(
        (id) => !technologies.find((t) => t.id === id),
      );
      if (missing.length) {
        throw new NotFoundException(
          `Technologies not found: ${missing.join(', ')}`,
        );
      }
    }

    const entity = this.projectRepo.create({
      name: dto.name,
      description: dto.description,
      url: dto.url,
      repo: dto.repo,
      slug: dto.slug,
      imageUrl: dto.imageUrl,
      technologies,
    });
    return await this.projectRepo.save(entity);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({
      relations: { technologies: true },
      order: { createdAt: 'DESC' },
    });
  }
}

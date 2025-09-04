import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { TechnologyService } from './technology.service';

@Controller('technologies')
export class TechnologyController {
  constructor(private readonly service: TechnologyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTechnologyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}

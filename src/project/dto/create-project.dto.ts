import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  @MinLength(1)
  url: string;

  @IsString()
  @MinLength(1)
  repo: string;

  @IsString()
  @MinLength(1)
  slug: string;

  @IsOptional()
  @IsArray()
  technologyIds?: number[];

  @IsOptional()
  @IsUrl({ require_tld: false })
  imageUrl?: string;
}

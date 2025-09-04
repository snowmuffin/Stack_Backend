import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export const TechnologyCategories = [
  'frontend',
  'backend',
  'mobile',
  'devops',
  'database',
  'cloud',
  'data',
  'ai',
] as const;

export const TechnologyProficiency = [
  'learning',
  'familiar',
  'intermediate',
  'advanced',
  'expert',
] as const;

export class CreateTechnologyDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  slug: string;

  @IsEnum(TechnologyCategories)
  category: (typeof TechnologyCategories)[number];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TechnologyProficiency)
  proficiency?: (typeof TechnologyProficiency)[number];

  @IsOptional()
  @IsUrl({ require_tld: false })
  iconUrl?: string;
}

import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  @MinLength(1)
  location: string;

  @IsDateString()
  occurTime: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  imageUrl?: string;
}

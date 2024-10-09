import { IsNumber, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Max(100)
  @Type(() => Number)
  limit: number = 10;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  offset: number = 0;
}

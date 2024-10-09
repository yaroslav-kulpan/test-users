import { IsString, IsEmail, IsNotEmpty, IsEnum, IsNumber, ValidateNested, IsObject, Min, Max, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

import { GenderEnum } from '@interfaces/users-profile.interface';

export class UserIdDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}

export class CreateUserProfileDto {
  @IsNumber()
  @Min(16)
  @Max(80)
  @IsPositive()
  @IsNotEmpty()
  public age: number;

  @IsString()
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  public gender: GenderEnum;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public height: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public weight: number;
}

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @ValidateNested()
  @IsObject()
  @Type(() => CreateUserProfileDto)
  profile: CreateUserProfileDto;
}

export class UpdateUserDto {}

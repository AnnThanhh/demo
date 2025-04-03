import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsDateString,
  IsBoolean,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export enum Role {
  user = 'user',
  admin = 'admin',
  moderator = 'moderator',
}

// Base DTO
export class BaseUserDto {
  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '123 Main St', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  dob?: Date;

  @ApiProperty({ enum: Gender, required: false })
  @IsOptional()
  @IsEnum(Gender, { message: 'gender must be male, female or other' })
  gender?: Gender;

  @ApiProperty({ enum: Role, required: false })
  @IsOptional()
  @IsEnum(Role, { message: 'role must be user, admin or moderator' })
  role?: Role;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// Create DTO
export class CreateUserDto extends BaseUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(6)
  password!: string;
}

// Update DTO
export class UpdateUserDto extends BaseUserDto {
  @ApiProperty({ example: 'example@gmail.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'newPassword123', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}

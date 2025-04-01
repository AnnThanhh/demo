import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface UserWithPassword {
  id: number;
  email: string;
  password: string;
  name?: string | null;
}

export interface UserResponse {
  id: number;
  email: string;
  name?: string | null;
}

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'example@gmail.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'newPassword123', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'New Name', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}

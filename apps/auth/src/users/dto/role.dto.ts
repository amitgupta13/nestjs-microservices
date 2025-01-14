import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}

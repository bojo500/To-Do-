import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Take out trash' })
  @IsOptional()
  @IsString()
  theTask?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

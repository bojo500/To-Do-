import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Clean the kitchen' })
  @IsNotEmpty()
  @IsString()
  theTask: string;

  @ApiProperty({ example: false, description: 'Task status', required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number


  @ManyToOne(() => User, (user) => user.tasks)
  user: User
}

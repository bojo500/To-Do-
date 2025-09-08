import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: false, description: 'Task status: true = done, false = not done' })
  @Column({ default: false })
  status: boolean;

  @ApiProperty({ example: 'Finish NestJS homework', description: 'The description of the task' })
  @Column()
  theTask: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;
}

import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from '../users/users.service';
import { Task } from './entities/task.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
  ) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Create a new task for a user' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: Task })
  async create(@Param('userId') userId: string, @Body() dto: CreateTaskDto): Promise<Task> {
    const user = await this.usersService.findOne(+userId);
    return this.tasksService.create(user, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'The found task', type: Task })
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'The updated task', type: Task })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'The task has been deleted' })
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }
}

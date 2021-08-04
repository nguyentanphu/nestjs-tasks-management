import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { TaskDto } from './dtos/task.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskStatus } from 'src/schemas/task.schema';
import { ObjectIdPipe } from 'src/shared/pipes/objectId.pipe';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskFilterDto } from './dtos/task-filter.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Post()
  createTask(@CurrentUser() user, @Body() task: TaskDto) {
    return this.taskService.createTask(task, user);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    const currentTask = this.taskService.getTaskById(id);
    if (!currentTask) {
      throw new HttpException(`Task with id ${id} was not found`, HttpStatus.NOT_FOUND);
    }

    return currentTask;
  }

  @Get()
  getFilteredTasks(@Query() taskFiltered: TaskFilterDto) {
    return this.taskService.getTasks(taskFiltered);
  }

  @Patch(':id/status/:status')
  async updateTaskStatus(
    @Param('id', ObjectIdPipe) id: string,
    @Param('status', new ParseEnumPipe(TaskStatus)) status: TaskStatus
  ) {
    await this.taskService.setTaskStatus(id, status);
  }

  @Patch(':id')
  async updateTaskFields(
    @Param('id', ObjectIdPipe) id: string,
    @Body() updateDto: UpdateTaskDto
  ) {
    await this.taskService.updateTaskFields(id, updateDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ObjectIdPipe) id: string) {
    await this.getTaskById(id);
    await this.taskService.deleteTaskById(id);
  }

}

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { TaskDto, TaskFilterDto } from './dtos/tasks.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  createTask(@CurrentUser() user, @Body() task: TaskDto) {
    return this.taskService.createTask(task, user);
  }

  // @Get(':id')
  // getTaskById(@Param('id', new ParseIntPipe()) id: number) {
  //   const currentTask = this.taskService.getTaskById(id);
  //   if (!currentTask) {
  //     throw new HttpException(`Task with id ${id} was not found`, HttpStatus.NOT_FOUND);
  //   }

  //   return currentTask;
  // }

  // @Get()
  // getFilteredTasks(@Query() taskFiltered: TaskFilterDto) {
  //   return this.taskService.getFilteredTasks(taskFiltered);
  // }

  // @Patch(':id/status/:status')
  // updateTaskStatus(
  //   @Param('id', new ParseIntPipe()) id: number, 
  //   @Param('status', new ParseEnumPipe(TaskStatus)) status: TaskStatus
  //   ) {
  //   this.getTaskById(id);
  //   this.taskService.setTaskStatus(id, status);
  // }

  // @Delete(':id')
  // deleteTask(@Param('id', new ParseIntPipe()) id: number) {
  //   this.getTaskById(id);
  //   this.taskService.deleteTaskById(id);
  // }

}

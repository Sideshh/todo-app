import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDto, TodoIdDto, UpdateTodoDto } from './dtos';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Put(':id')
  updateTodo(
    @Param() todoIdDto: TodoIdDto,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateTodo(todoIdDto.id, updateTodoDto);
  }

  @Patch(':id/done')
  toggleTodoDone(@Param() todoIdDto: TodoIdDto) {
    return this.todosService.toggleTodoDone(todoIdDto.id);
  }

  @Delete(':id')
  deleteTodo(@Param() todoIdDto: TodoIdDto) {
    return this.todosService.deleteTodo(todoIdDto.id);
  }
}

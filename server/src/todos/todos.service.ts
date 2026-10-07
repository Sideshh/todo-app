import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { Todo } from './entities';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepo: Repository<Todo>,
  ) {}

  async getTodos() {
    return this.todosRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    const { title, description } = createTodoDto;

    const tempTodo = this.todosRepo.create({
      title,
      description,
    });

    const todo = await this.todosRepo.save(tempTodo);

    return todo;
  }

  async updateTodo(todoId: string, updateTodoDto: UpdateTodoDto) {
    const { title, description } = updateTodoDto;

    if (title === undefined && description === undefined) {
      throw new BadRequestException(
        'At least one of title or description is required',
      );
    }

    let todo = await this.getTodo(todoId);

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;

    todo = await this.todosRepo.save(todo);

    return todo;
  }

  async toggleTodoDone(todoId: string) {
    let todo = await this.getTodo(todoId);

    todo.done = !todo.done;
    todo = await this.todosRepo.save(todo);

    return todo;
  }

  async deleteTodo(todoId: string) {
    const todo = await this.getTodo(todoId);

    await this.todosRepo.remove(todo);

    return todo;
  }

  private async getTodo(todoId: string) {
    const todo = await this.todosRepo.findOneBy({ id: todoId });

    if (!todo) throw new NotFoundException('Todo not found');

    return todo;
  }
}

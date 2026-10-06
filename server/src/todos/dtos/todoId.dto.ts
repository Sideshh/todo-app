import { IsUUID } from 'class-validator';

export class TodoIdDto {
  @IsUUID()
  id: string;
}

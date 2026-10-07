import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/classes';

@Entity()
export class Todo extends AbstractEntity<Todo> {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'boolean', default: false })
  done: boolean;
}

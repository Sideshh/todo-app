import {
  CalendarDaysIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import type { Todo } from '@/common/types';

interface TodoCardProps {
  todo: Todo;
  isUpdating: boolean;
  onToggleTodo: (todoId: string) => void;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (todo: Todo) => void;
}

export function TodoCard({
  todo,
  isUpdating,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}: TodoCardProps) {
  const createdDate = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(todo.createdAt));

  const handleAction = (actionKey: React.Key) => {
    if (actionKey === 'edit') {
      onEditTodo(todo);
    }

    if (actionKey === 'delete') {
      onDeleteTodo(todo);
    }
  };

  return (
    <Card
      className={`h-full border shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition-[transform,border-color,box-shadow,background-color,opacity] duration-200 hover:-translate-y-px hover:border-violet-200 hover:shadow-[0_5px_14px_rgba(79,70,229,0.07)] ${
        todo.done
          ? 'border-violet-100 bg-violet-50/60 opacity-75 hover:bg-violet-50 hover:opacity-90'
          : 'border-slate-200 bg-white hover:bg-slate-50/80'
      }`}
      radius="md"
    >
      <CardBody className="flex-row items-center gap-2.5 px-3 py-2 sm:px-3.5">
        <Checkbox
          aria-label={todo.done ? 'Mark task as active' : 'Mark task as done'}
          color="primary"
          isDisabled={isUpdating}
          isSelected={todo.done}
          radius="full"
          onValueChange={() => onToggleTodo(todo.id)}
        />
        <div className="min-w-0 flex-1">
          <h2
            className={`text-sm font-semibold leading-5 tracking-[-0.01em] text-slate-900 ${
              todo.done
                ? 'text-slate-500 line-through decoration-violet-400/80'
                : ''
            }`}
          >
            {todo.title}
          </h2>
          {todo.description && (
            <p
              className={`line-clamp-1 text-xs leading-4 text-slate-500 ${
                todo.done ? 'text-slate-400' : ''
              }`}
            >
              {todo.description}
            </p>
          )}
          <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-400 sm:text-[11px]">
            <CalendarDaysIcon className="size-3" />
            <span>{todo.done ? 'Completed' : 'Created'} {createdDate}</span>
          </div>
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isIconOnly
              aria-label={`Actions for ${todo.title}`}
              className="h-8 min-w-8 shrink-0 text-slate-400 transition-colors duration-200 hover:bg-violet-50 hover:text-violet-700"
              radius="sm"
              size="sm"
              variant="light"
            >
              <EllipsisHorizontalIcon className="size-5" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label={`Actions for ${todo.title}`}
            onAction={handleAction}
          >
            <DropdownItem key="edit" startContent={<PencilSquareIcon className="size-4" />}>
              Edit task
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<TrashIcon className="size-4" />}
            >
              Delete task
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );
}

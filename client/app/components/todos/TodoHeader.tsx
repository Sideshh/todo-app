import {
  Bars3Icon,
  CheckIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Button, Input } from '@heroui/react';

interface TodoHeaderProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  onCreateTodo: () => void;
}

export function TodoHeader({
  searchTerm,
  onSearchChange,
  onCreateTodo,
}: TodoHeaderProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-200/80 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-200">
            <CheckIcon className="size-5" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-950">
            Todo
          </span>
        </div>
        <Bars3Icon className="size-6 text-slate-600 lg:hidden" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:w-[65%] lg:justify-end">
        <Input
          aria-label="Search tasks"
          className="w-full lg:max-w-sm"
          classNames={{
            inputWrapper:
              'h-10 min-h-10 border border-violet-100 bg-violet-50/60 shadow-none',
          }}
          placeholder="Search tasks..."
          radius="sm"
          startContent={
            <MagnifyingGlassIcon className="size-4 text-slate-500" />
          }
          value={searchTerm}
          onValueChange={onSearchChange}
        />
        <Button
          className="h-10 bg-gradient-to-r from-violet-600 to-indigo-600 px-5 font-medium text-white shadow-md shadow-violet-200"
          radius="sm"
          startContent={<PlusIcon className="size-5" />}
          onPress={onCreateTodo}
        >
          New Task
        </Button>
      </div>
    </header>
  );
}

import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';

interface TodoEmptyStateProps {
  hasTodos: boolean;
  onCreateTodo: () => void;
}

export function TodoEmptyState({ hasTodos, onCreateTodo }: TodoEmptyStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-violet-200 bg-violet-50/30 px-6 py-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
        <CheckCircleIcon className="size-9" />
      </div>
      <h2 className="mt-5 text-lg font-bold text-slate-900">
        {hasTodos ? 'No matching tasks' : 'No tasks yet'}
      </h2>
      <p className="mt-1 w-full max-w-sm text-wrap text-sm text-slate-500">
        {hasTodos
          ? 'Try changing your search or selected filter.'
          : 'Create your first task and start getting things done.'}
      </p>
      {!hasTodos && (
        <Button
          className="mt-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
          radius="sm"
          startContent={<PlusIcon className="size-4" />}
          onPress={onCreateTodo}
        >
          Create Task
        </Button>
      )}
    </div>
  );
}

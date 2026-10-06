import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '@heroui/react';

interface TodoErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

export function TodoErrorState({ errorMessage, onRetry }: TodoErrorStateProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center">
      <ExclamationCircleIcon className="size-6 shrink-0 text-red-500" />
      <div className="flex-1">
        <p className="font-semibold text-red-700">
          We couldn&apos;t load your tasks.
        </p>
        <p className="text-sm text-red-600">{errorMessage}</p>
      </div>
      <Button color="danger" radius="sm" variant="flat" onPress={onRetry}>
        Retry
      </Button>
    </div>
  );
}

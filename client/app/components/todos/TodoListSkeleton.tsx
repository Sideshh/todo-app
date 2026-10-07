import { Card, CardBody, Skeleton } from '@heroui/react';

export function TodoListSkeleton() {
  return (
    <div className="space-y-2" aria-label="Loading tasks">
      {Array.from({ length: 4 }, (_, skeletonIndex) => (
        <Card key={skeletonIndex} className="border border-slate-200 shadow-sm">
          <CardBody className="flex-row items-start gap-3 px-4 py-3">
            <Skeleton className="size-6 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-2/5 rounded-lg" />
              <Skeleton className="h-3 w-3/4 rounded-lg" />
              <Skeleton className="h-3 w-28 rounded-lg" />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

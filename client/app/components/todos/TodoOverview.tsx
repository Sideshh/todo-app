import { Button, Progress } from '@heroui/react';
import { TODO_FILTER } from '@/common/enums';

interface TodoOverviewProps {
  totalTodoCount: number;
  completedTodoCount: number;
  activeTodoCount: number;
  selectedFilter: TODO_FILTER;
  onFilterChange: (filter: TODO_FILTER) => void;
}

export function TodoOverview({
  totalTodoCount,
  completedTodoCount,
  activeTodoCount,
  selectedFilter,
  onFilterChange,
}: TodoOverviewProps) {
  const completionPercentage = totalTodoCount
    ? Math.round((completedTodoCount / totalTodoCount) * 100)
    : 0;
  const filterOptions = [
    { filter: TODO_FILTER.ALL, label: 'All', count: totalTodoCount },
    { filter: TODO_FILTER.ACTIVE, label: 'Active', count: activeTodoCount },
    {
      filter: TODO_FILTER.COMPLETED,
      label: 'Completed',
      count: completedTodoCount,
    },
  ];

  return (
    <section className="rounded-2xl border border-violet-100/80 bg-gradient-to-br from-violet-50/80 via-white to-indigo-50/60 px-4 py-3 shadow-[0_1px_2px_rgba(79,70,229,0.04)] sm:py-3.5">
      <h1 className="text-xl font-bold tracking-[-0.02em] text-slate-950 sm:text-2xl">
        Today&apos;s Focus
      </h1>
      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
        <span>{completedTodoCount} of {totalTodoCount} tasks completed</span>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <span>{activeTodoCount} remaining</span>
      </p>
      <div className="mt-2 flex items-center gap-1.5">
        <Progress
          aria-label="Todo completion progress"
          classNames={{
            base: 'max-w-2xl flex-1',
            indicator: 'bg-gradient-to-r from-violet-600 to-indigo-500 transition-[width] duration-200',
            track: 'h-2 bg-violet-100/80',
          }}
          value={completionPercentage}
        />
        <span className="min-w-8 text-right text-xs font-semibold tabular-nums text-violet-700">
          {completionPercentage}%
        </span>
      </div>
      <div
        aria-label="Filter tasks"
        className="mt-3 inline-flex max-w-full gap-1 rounded-xl border border-slate-200/70 bg-white/70 p-1"
        role="tablist"
      >
        {filterOptions.map((filterOption) => {
          const isSelected = selectedFilter === filterOption.filter;

          return (
            <Button
              key={filterOption.filter}
              aria-selected={isSelected}
              className={isSelected
                  ? 'h-7 min-w-fit gap-1.5 bg-violet-100 px-2.5 font-semibold text-violet-700 shadow-none transition-colors duration-200'
                  : 'h-7 min-w-fit gap-1.5 bg-transparent px-2.5 text-slate-500 transition-colors duration-200 hover:bg-slate-100/80 hover:text-slate-700'}
              radius="sm"
              role="tab"
              size="sm"
              onPress={() => onFilterChange(filterOption.filter)}
            >
              {filterOption.label}
              <span className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums ${isSelected ? 'bg-violet-200/70 text-violet-800' : 'bg-slate-200/80 text-slate-500'}`}>
                {filterOption.count}
              </span>
            </Button>
          );
        })}
      </div>
    </section>
  );
}

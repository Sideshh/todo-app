'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { DeleteTodoModal } from './components/todos/DeleteTodoModal';
import { TodoCard } from './components/todos/TodoCard';
import { TodoEmptyState } from './components/todos/TodoEmptyState';
import { TodoErrorState } from './components/todos/TodoErrorState';
import { TodoFormModal } from './components/todos/TodoFormModal';
import { TodoHeader } from './components/todos/TodoHeader';
import { TodoListSkeleton } from './components/todos/TodoListSkeleton';
import { TodoOverview } from './components/todos/TodoOverview';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getTodos, toggleTodoDone } from '@/lib/actions/todo';
import type { Todo } from '@/common/types';
import { STORE_STATUS, TODO_FILTER, TODO_SORT } from '@/common/enums';
import { systemConfigs } from '@/configs/system.config';

const todoSortLabels = {
  [TODO_SORT.CREATED_NEWEST]: 'Created (Newest)',
  [TODO_SORT.CREATED_OLDEST]: 'Created (Oldest)',
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<TODO_FILTER>(
    TODO_FILTER.ALL,
  );
  const [selectedSort, setSelectedSort] = useState<TODO_SORT>(
    TODO_SORT.CREATED_NEWEST,
  );
  const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [todoToDelete, setTodoToDelete] = useState<Todo>();

  const dispatch = useAppDispatch();
  const { todos, status, mutationStatus, error, mutationError } =
    useAppSelector((state) => state.todo);

  const completedTodoCount = todos.filter((todo) => todo.done).length;
  const activeTodoCount = todos.length - completedTodoCount;
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        const matchesSearch =
          !normalizedSearchTerm ||
          todo.title.toLowerCase().includes(normalizedSearchTerm) ||
          todo.description?.toLowerCase().includes(normalizedSearchTerm);
        const matchesFilter =
          selectedFilter === TODO_FILTER.ALL ||
          (selectedFilter === TODO_FILTER.ACTIVE && !todo.done) ||
          (selectedFilter === TODO_FILTER.COMPLETED && todo.done);

        return matchesSearch && matchesFilter;
      })
      .sort((firstTodo, secondTodo) => {
        const firstCreatedAt = new Date(firstTodo.createdAt).getTime();
        const secondCreatedAt = new Date(secondTodo.createdAt).getTime();

        return selectedSort === TODO_SORT.CREATED_NEWEST
          ? secondCreatedAt - firstCreatedAt
          : firstCreatedAt - secondCreatedAt;
      });
  }, [normalizedSearchTerm, selectedFilter, selectedSort, todos]);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  useEffect(() => {
    if (mutationError) {
      addToast({
        title: 'Request failed',
        description: mutationError,
        color: 'danger',
        timeout: systemConfigs.toastTimeout,
      });
    }
  }, [mutationError]);

  const openCreateTodoModal = () => {
    setSelectedTodo(undefined);
    setIsTodoFormOpen(true);
  };

  const openEditTodoModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsTodoFormOpen(true);
  };

  const closeTodoFormModal = () => {
    setIsTodoFormOpen(false);
    setSelectedTodo(undefined);
  };

  const handleToggleTodo = async (todoId: string) => {
    const selectedTodoItem = todos.find((todo) => todo.id === todoId);

    try {
      const updatedTodo = await dispatch(toggleTodoDone(todoId)).unwrap();
      addToast({
        title: updatedTodo.done ? 'Task completed' : 'Task reopened',
        description: selectedTodoItem?.title,
        color: 'success',
        timeout: systemConfigs.toastTimeout,
      });
    } catch {
      return;
    }
  };

  const retryGetTodos = () => {
    dispatch(getTodos());
  };

  const isLoading = status === STORE_STATUS.LOADING;
  const isUpdating = mutationStatus === STORE_STATUS.LOADING;

  return (
    <main className="min-h-screen overflow-x-hidden p-2 sm:p-4">
      <div className="mx-auto min-h-[calc(100vh-1rem)] w-full max-w-[52rem] overflow-hidden rounded-2xl border border-white/90 bg-white/85 shadow-[0_18px_60px_rgba(51,65,85,0.1)] backdrop-blur-xl sm:min-h-[calc(100vh-2rem)]">
        <TodoHeader
          searchTerm={searchTerm}
          onCreateTodo={openCreateTodoModal}
          onSearchChange={setSearchTerm}
        />
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <TodoOverview
            activeTodoCount={activeTodoCount}
            completedTodoCount={completedTodoCount}
            selectedFilter={selectedFilter}
            totalTodoCount={todos.length}
            onFilterChange={setSelectedFilter}
          />
          <section className="mt-3" aria-labelledby="tasks-heading">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2
                className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500"
                id="tasks-heading"
              >
                Your Tasks
                <span className="ml-1 font-medium text-slate-400">
                  ({filteredTodos.length})
                </span>
              </h2>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    className="h-7 min-w-0 gap-1 px-2 text-xs font-medium text-slate-500 transition-colors duration-200 hover:bg-violet-50 hover:text-violet-700"
                    endContent={<ChevronDownIcon className="size-3.5" />}
                    radius="sm"
                    size="sm"
                    variant="light"
                  >
                    {todoSortLabels[selectedSort]}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Sort tasks"
                  selectedKeys={new Set([selectedSort])}
                  selectionMode="single"
                  onAction={(sortKey) => setSelectedSort(sortKey as TODO_SORT)}
                >
                  <DropdownItem key={TODO_SORT.CREATED_NEWEST}>
                    Created (Newest)
                  </DropdownItem>
                  <DropdownItem key={TODO_SORT.CREATED_OLDEST}>
                    Created (Oldest)
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            {status === STORE_STATUS.FAILED && error ? (
              <TodoErrorState errorMessage={error} onRetry={retryGetTodos} />
            ) : isLoading ? (
              <TodoListSkeleton />
            ) : filteredTodos.length ? (
              <div className="space-y-1.5">
                {filteredTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    isUpdating={isUpdating}
                    todo={todo}
                    onDeleteTodo={setTodoToDelete}
                    onEditTodo={openEditTodoModal}
                    onToggleTodo={handleToggleTodo}
                  />
                ))}
              </div>
            ) : (
              <TodoEmptyState
                hasTodos={Boolean(todos.length)}
                onCreateTodo={openCreateTodoModal}
              />
            )}
          </section>
        </div>
      </div>
      {isTodoFormOpen && (
        <TodoFormModal
          isOpen={isTodoFormOpen}
          selectedTodo={selectedTodo}
          onClose={closeTodoFormModal}
        />
      )}
      <DeleteTodoModal
        selectedTodo={todoToDelete}
        onClose={() => setTodoToDelete(undefined)}
      />
    </main>
  );
}

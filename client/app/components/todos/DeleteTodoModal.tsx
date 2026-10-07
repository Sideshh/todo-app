'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { deleteTodo } from '@/lib/actions/todo';
import type { Todo } from '@/common/types';
import { STORE_STATUS } from '@/common/enums';
import { systemConfigs } from '@/configs/system.config';

interface DeleteTodoModalProps {
  selectedTodo?: Todo;
  onClose: () => void;
}

export function DeleteTodoModal({ selectedTodo, onClose }: DeleteTodoModalProps) {
  const dispatch = useAppDispatch();
  const { mutationStatus } = useAppSelector((state) => state.todo);
  const isDeleting = mutationStatus === STORE_STATUS.LOADING;

  const handleDeleteTodo = async () => {
    if (!selectedTodo) return;

    try {
      await dispatch(deleteTodo(selectedTodo.id)).unwrap();
      addToast({
        title: 'Task deleted',
        description: 'Your task has been deleted.',
        color: 'success',
        timeout: systemConfigs.toastTimeout,
      });
      onClose();
    } catch {
      return;
    }
  };

  return (
    <Modal
      isDismissable={!isDeleting}
      isOpen={Boolean(selectedTodo)}
      placement="center"
      size="sm"
      onOpenChange={(open) => {
        if (!open && !isDeleting) onClose();
      }}
    >
      <ModalContent>
        <ModalBody className="flex-row items-start gap-4 pt-6">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <TrashIcon className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-950">Delete task?</h2>
            <p className="mt-1 text-sm text-slate-500">
              This action cannot be undone.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={isDeleting}
            radius="sm"
            variant="bordered"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            isLoading={isDeleting}
            radius="sm"
            onPress={handleDeleteTodo}
          >
            Delete Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

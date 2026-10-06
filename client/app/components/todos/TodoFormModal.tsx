'use client';

import { FormEvent, useState } from 'react';
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createTodo, updateTodo } from '@/lib/actions/todo';
import type { Todo } from '@/common/types';
import { STORE_STATUS } from '@/common/enums';
import { systemConfigs } from '@/configs/system.config';

interface TodoFormModalProps {
  isOpen: boolean;
  selectedTodo?: Todo;
  onClose: () => void;
}

export function TodoFormModal({
  isOpen,
  selectedTodo,
  onClose,
}: TodoFormModalProps) {
  const [title, setTitle] = useState(selectedTodo?.title || '');
  const [description, setDescription] = useState(
    selectedTodo?.description || '',
  );

  const dispatch = useAppDispatch();
  const { mutationStatus } = useAppSelector((state) => state.todo);

  const isEditMode = Boolean(selectedTodo);
  const isSubmitting = mutationStatus === STORE_STATUS.LOADING;

  const handleSubmit = async (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    const todoData = {
      title: title.trim(),
      description: description.trim(),
    };

    try {
      if (selectedTodo) {
        await dispatch(
          updateTodo({ todoId: selectedTodo.id, todoData }),
        ).unwrap();
        addToast({
          title: 'Task updated',
          description: 'Your task has been updated.',
          color: 'success',
          timeout: systemConfigs.toastTimeout,
        });
      } else {
        await dispatch(createTodo(todoData)).unwrap();
        addToast({
          title: 'Task created',
          description: 'Your task has been added.',
          color: 'success',
          timeout: systemConfigs.toastTimeout,
        });
      }

      onClose();
    } catch {
      return;
    }
  };

  return (
    <Modal
      isDismissable={!isSubmitting}
      isOpen={isOpen}
      placement="center"
      size="lg"
      onOpenChange={(open) => {
        if (!open && !isSubmitting) onClose();
      }}
    >
      <ModalContent>
        <Form validationBehavior="native" onSubmit={handleSubmit}>
          <ModalHeader className="flex-col items-start gap-1 pb-2">
            <h2 className="text-xl font-bold text-slate-950">
              {isEditMode ? 'Edit task' : 'Create a new task'}
            </h2>
            <p className="text-sm font-normal text-slate-500">
              {isEditMode
                ? 'Update the details for your task.'
                : 'Add the details for your task below.'}
            </p>
          </ModalHeader>
          <ModalBody className="w-full gap-5">
            <Input
              isRequired
              label="Title"
              labelPlacement="outside"
              maxLength={255}
              placeholder="What needs to be done?"
              radius="sm"
              value={title}
              onValueChange={setTitle}
            />
            <Textarea
              label="Description (optional)"
              labelPlacement="outside"
              maxLength={1000}
              minRows={4}
              placeholder="Add some details..."
              radius="sm"
              value={description}
              onValueChange={setDescription}
            />
          </ModalBody>
          <ModalFooter className="w-full">
            <Button
              isDisabled={isSubmitting}
              radius="sm"
              variant="bordered"
              onPress={onClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
              isLoading={isSubmitting}
              radius="sm"
              type="submit"
            >
              {isEditMode ? 'Save Changes' : 'Create Task'}
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
}

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '@/configs/axios.configs';
import type { ErrorResponse, Todo, TodoPayload } from '@/common/types';

function getErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<ErrorResponse>;
  return axiosError.response?.data?.message || 'Request failed';
}

export const getTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  'todo/getTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Todo[]>('/todos');
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createTodo = createAsyncThunk<
  Todo,
  TodoPayload,
  { rejectValue: string }
>('todo/createTodo', async (todoData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<Todo>('/todos', todoData);
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateTodo = createAsyncThunk<
  Todo,
  { todoId: string; todoData: TodoPayload },
  { rejectValue: string }
>(
  'todo/updateTodo',
  async ({ todoId, todoData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<Todo>(
        `/todos/${todoId}`,
        todoData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const toggleTodoDone = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>('todo/toggleTodoDone', async (todoId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch<Todo>(`/todos/${todoId}/done`);
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('todo/deleteTodo', async (todoId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/todos/${todoId}`);
    return todoId;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

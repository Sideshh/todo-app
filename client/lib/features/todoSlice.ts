import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { STORE_STATUS } from '@/common/enums';
import type { Todo } from '@/common/types';
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoDone,
  updateTodo,
} from '@/lib/actions/todo';

interface TodoState {
  todos: Todo[];
  status: STORE_STATUS;
  mutationStatus: STORE_STATUS;
  error?: string;
  mutationError?: string;
}

const initialState: TodoState = {
  todos: [],
  status: STORE_STATUS.IDLE,
  mutationStatus: STORE_STATUS.IDLE,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    resetTodoError: (state) => {
      state.error = undefined;
      state.mutationError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = STORE_STATUS.LOADING;
        state.error = undefined;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = STORE_STATUS.SUCCEEDED;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = STORE_STATUS.FAILED;
        state.error = action.payload || 'Unable to load tasks';
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (todoIndex !== -1) state.todos[todoIndex] = action.payload;
      })
      .addCase(toggleTodoDone.fulfilled, (state, action) => {
        const todoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (todoIndex !== -1) state.todos[todoIndex] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          createTodo.pending,
          updateTodo.pending,
          toggleTodoDone.pending,
          deleteTodo.pending,
        ),
        (state) => {
          state.mutationStatus = STORE_STATUS.LOADING;
          state.mutationError = undefined;
        },
      )
      .addMatcher(
        isAnyOf(
          createTodo.fulfilled,
          updateTodo.fulfilled,
          toggleTodoDone.fulfilled,
          deleteTodo.fulfilled,
        ),
        (state) => {
          state.mutationStatus = STORE_STATUS.SUCCEEDED;
        },
      )
      .addMatcher(
        isAnyOf(
          createTodo.rejected,
          updateTodo.rejected,
          toggleTodoDone.rejected,
          deleteTodo.rejected,
        ),
        (state, action) => {
          state.mutationStatus = STORE_STATUS.FAILED;
          state.mutationError = action.payload || 'Unable to update task';
        },
      );
  },
});

export const { resetTodoError } = todoSlice.actions;
export default todoSlice.reducer;

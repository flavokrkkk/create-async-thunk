import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodosState } from "./types";

const initialState = <TodosState>{
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo(state, { payload }: PayloadAction<string>) {
      state.todos.push({
        id: Date.now(),
        title: payload,
        completed: false,
      });
    },
    setCompletedTodo(state, { payload }: PayloadAction<number>) {
      const toggleTodo = state.todos.find((todo) => todo.id === payload);
      if (toggleTodo) {
        toggleTodo.completed = !toggleTodo.completed;
      }
    },
    setDeleteTodo(state, { payload }: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
  },
});

export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;

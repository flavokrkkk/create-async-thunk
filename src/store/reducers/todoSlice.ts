import {
  Dispatch,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { TodosState } from "./types";
import axios from "axios";
import { ITodos } from "../../models/ITodos";
import { AppDispatch } from "..";

const initialState = <TodosState>{
  todos: [],
  loading: false,
  error: "",
};

export const fetchTodos = createAsyncThunk<
  ITodos[],
  void,
  { rejectValue: string }
>("todos/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<ITodos[]>(
      "https://jsonplaceholder.typicode.com/todos",
      { params: { _limit: 10 } }
    );
    return data;
  } catch (err) {
    return rejectWithValue(`${err}`);
  }
});

export const setAsyncTodos = createAsyncThunk<
  ITodos,
  string,
  { rejectValue: string }
>("todos/setAsyncTodos", async (title, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        id: Date.now(),
        title,
        completed: false,
      }
    );
    return data;
  } catch (err) {
    rejectWithValue(`${err}`);
  }
});

export const toggleTodoComplete = createAsyncThunk<
  void,
  number,
  { rejectValue: string; dispatch: AppDispatch }
>("todos/toggleTodoComplete", async (id, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.get<ITodos>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    dispatch(todoActions.setCompletedTodo(data.id));
  } catch (err) {
    rejectWithValue(`${err}`);
  }
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setCompletedTodo(state, { payload }: PayloadAction<number>) {
      const toggleTodo = state.todos.find((todo) => todo.id === payload);
      if (toggleTodo) {
        toggleTodo.completed = !toggleTodo.completed;
      }
    },
    // setDeleteTodo(state, { payload }: PayloadAction<number>) {
    //   state.todos = state.todos.filter((todo) => todo.id !== payload);
    // },
  },
  extraReducers: (builder) => {
    //Builder с загрузкой
    builder.addCase(fetchTodos.pending, (state) => {
      (state.loading = true), (state.error = "");
    }),
      //Builder в случае успеха
      builder.addCase(
        fetchTodos.fulfilled,
        (state, { payload }: PayloadAction<ITodos[] | undefined>) => {
          if (payload) {
            state.todos = payload;
            state.loading = false;
          }
        }
      );
    //Builder в случае ошибки
    builder.addCase(
      fetchTodos.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => {
        state.error = payload;
        state.loading = false;
      }
    );

    //Builder в случае успеха
    builder.addCase(
      setAsyncTodos.fulfilled,
      (state, { payload }: PayloadAction<ITodos>) => {
        state.todos.push(payload);
      }
    );
    builder.addCase(
      setAsyncTodos.rejected,
      (state, { payload }: PayloadAction<string | undefined>) => {
        if (payload) {
          state.error = payload;
        }
      }
    );
  },
});

export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;
export const todoExtraReducer = {
  fetchTodos,
  setAsyncTodos,
  toggleTodoComplete,
};

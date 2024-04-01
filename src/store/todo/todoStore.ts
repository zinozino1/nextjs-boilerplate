import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type TodoType = {
  id: number;
  title: string;
  timeStamp: number;
};

type initialStateType = {
  todos: TodoType[];
  selectedTodoItem?: TodoType;
};

export const initialState: initialStateType = {
  todos: [],
  selectedTodoItem: undefined,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos = state.todos.concat(action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
      state.todos = state.todos.map((item, index) => {
        if (item.id === action.payload.id) {
          return { ...item, title: action.payload.title };
        }
        return item;
      });
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(
        (item, index) => item.id !== action.payload
      );
    },
    setSelectedTodo: (state, action: PayloadAction<TodoType | undefined>) => {
      state.selectedTodoItem = action.payload;
    },
  },
});

export const { addTodo, editTodo, deleteTodo, setSelectedTodo } =
  todoSlice.actions;

export const todos = (state: RootState) => state.todo.todos;
export const selectedTodoItem = (state: RootState) =>
  state.todo.selectedTodoItem;

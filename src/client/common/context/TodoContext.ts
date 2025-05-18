import React, {createContext} from "react";
import {TodoState} from "common/reducer/TodoReducer";
import {TodoActions} from "common/reducer/TodoActions";

export type TodoContextType = {
  colorMode: ColorMode,
  dispatch: React.Dispatch<TodoActions>
}

export type ColorMode =
  'light' |
  'dark';

export const TodoContext = (createContext<TodoContextType | null>(null))
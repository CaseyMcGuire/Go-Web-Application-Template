import {ColorMode} from "common/context/TodoContext";
import {TodoActions} from "common/reducer/TodoActions";

export type TodoState = {
  colorMode: ColorMode
}

export const initialTodoState: TodoState = {
  colorMode: 'light'
}

export const reducer = (state: TodoState, action: TodoActions): TodoState => {
  switch(action.type) {
    case "SET_COLOR_MODE":
      return {
        ...state,
        colorMode: action.colorMode
      }
    default:
      return state
  }
}
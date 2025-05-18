import {ColorMode} from "common/context/TodoContext";

type SetColorModeAction = {
  type: 'SET_COLOR_MODE',
  colorMode: ColorMode
}

export type TodoActions =
  SetColorModeAction
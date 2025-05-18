import {createContext, ReactNode, useReducer} from "react";
import {initialTodoState, reducer, TodoState} from "common/reducer/TodoReducer";
import {TodoContext, TodoContextType} from "common/context/TodoContext";

export default function TodoContextProvider(props: {
  children: ReactNode
}) {

  const [state, dispatch] = useReducer(reducer, initialTodoState)

  const defaultState: TodoContextType = {
    ...state,
    dispatch
  }


  return (
    <TodoContext.Provider value={defaultState}>
      {props.children}
    </TodoContext.Provider>
  )
}
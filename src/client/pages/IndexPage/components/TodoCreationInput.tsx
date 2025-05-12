import {graphql, useMutation} from "react-relay";
import {TodoCreationInputMutation} from "relay/__generated__/TodoCreationInputMutation.graphql";
import * as stylex from "@stylexjs/stylex";
import {ChangeEvent, KeyboardEvent, useState} from "react";

const styles = stylex.create({
  todoTextContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  todoTextField: {
    width: '100%',
    fontSize: '18px',
    fontFamily: 'Josefin Sans',
    border: '1px solid grey',
    padding: '8px',
    borderRadius: '5px'
  }
})

export default function TodoCreationInput() {

  const [input, setInput] = useState<string>('')

  const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleEnterPress = () => {
    if (input.trim() === "") {
      return
    }
    commit({
      variables: {
        input: {
          text: input,
          complete: false,
          userID: "1"
        }
      }
    })
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEnterPress();
    }
  };

  const [commit, isInFlight] = useMutation<TodoCreationInputMutation>(
    graphql`
      mutation TodoCreationInputMutation($input: CreateTodoInput) {
          createTodo(input: $input) {
              id
          }
      }
    `
  )

  return (
    <div {...stylex.props(styles.todoTextContainer)}>
      <input
        {...stylex.props(styles.todoTextField)}
        type="text"
        placeholder="Create a new todo..."
        disabled={isInFlight}
        onKeyDown={event => handleKeyDown(event)}
        onChange={event => handleInputChange(event)}
      />
    </div>
  )
}
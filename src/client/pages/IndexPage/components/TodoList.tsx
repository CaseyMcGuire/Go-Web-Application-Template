import {graphql, useFragment} from "react-relay";
import {TodoList_todos$key} from "relay/__generated__/TodoList_todos.graphql";
import stylex from "@stylexjs/stylex";

type Props = {
  todos:TodoList_todos$key
}

const styles = stylex.create({
  todoListContainer: {
    borderRadius: '5px',
    border: '1px solid grey',
    width: '100%'
  },
  todoListItem: {
    fontFamily: 'Josefin Sans',
    padding: '24px',
    fontSize: '18px'
  },
  todoListItemCheckbox: {
    '::after': {
      borderRadius: '100%',
      backgroundColor: 'green'
    },
  }
})

export default function TodoList(props: Props) {
  const data = useFragment<TodoList_todos$key>(
    graphql`
      fragment TodoList_todos on Query {
         todos {
             id
             text
             complete
         }
      }
    `,
    props.todos
  )

  return (
    <div {...stylex.props(styles.todoListContainer)}>
      {
        data.todos.map(todo => {
          return (
            <div
              {...stylex.props(styles.todoListItem)}
            >
              <TodoListCompletionCheck checked={todo.complete} />
              {todo.text}
            </div>
          )
        })
      }
    </div>
  )
}

function TodoListCompletionCheck(props: {checked: boolean}) {
  return (
    <input
      {...stylex.props(styles.todoListItemCheckbox)}
      type="checkbox" checked={props.checked} />
  )
}
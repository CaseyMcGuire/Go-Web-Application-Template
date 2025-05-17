import {graphql, useFragment} from "react-relay";
import {TodoList_todos$key} from "relay/__generated__/TodoList_todos.graphql";
import stylex from "@stylexjs/stylex";

type Props = {
  todos:TodoList_todos$key
}

const styles = stylex.create({
  todoListContainer: {
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    width: '100%'
  },
  todoListItem: {
    fontFamily: 'Josefin Sans',
    padding: '24px',
    fontSize: '18px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E3E4F1'
  },
  todoListItemText: {
    marginLeft: '24px'
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
             user {
                 id
             }
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
              <span {...stylex.props(styles.todoListItemText)}>{todo.text}</span>
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
import {graphql, useFragment} from "react-relay";
import {TodoList_todos$key} from "relay/__generated__/TodoList_todos.graphql";
import stylex from "@stylexjs/stylex";

type Props = {
  todos: TodoList_todos$key
}

const styles = stylex.create({
  todoListContainer: {
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    width: '100%'
  },
  todoListItem: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Josefin Sans',
    padding: '24px',
    fontSize: '18px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E3E4F1',
  },
  todoListItemText: {
    marginLeft: '24px'
  },
  todoListItemCheckbox: {
    border: '0.1px solid #979797',
    borderRadius: '100%',
    height: '24px',
    width: '24px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  todoListItemCheckboxSelected: {
    backgroundImage: 'linear-gradient(to bottom right, #55DDFF, #C058F3)',
    border: 'none'
  },
  todoListItemCheckmark: {
    border: '2px solid white',
    borderTop: 'none',
    borderLeft: 'none',
    height: '10px',
    width: '6px',
    transform: 'rotate(45deg)'
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
              <TodoListItem checked={todo.complete} text={todo.text} />
          )
        })
      }
    </div>
  )
}

function TodoListItem(props: {checked: boolean, text: string}) {
  return (
    <div {...stylex.props(styles.todoListItem)}>
      <div {...stylex.props(styles.todoListItemCheckbox, props.checked && styles.todoListItemCheckboxSelected)}>
        {
          props.checked && <div {...stylex.props(styles.todoListItemCheckmark)} />
        }
      </div>
      <div {...stylex.props(styles.todoListItemText)}>{props.text}</div>
    </div>
  )
}
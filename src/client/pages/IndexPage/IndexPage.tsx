import {graphql, useLazyLoadQuery} from "react-relay";
import {IndexPageQuery} from "relay/__generated__/IndexPageQuery.graphql";
import TodoCreationInput from "pages/IndexPage/components/TodoCreationInput";
import TodoHeader from "pages/IndexPage/components/TodoHeader";
import TodoList from "pages/IndexPage/components/TodoList";
import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  todoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '540px'
  }
})

export default function IndexPage() {
  const query = useLazyLoadQuery<IndexPageQuery>(graphql`
    query IndexPageQuery {
        ...TodoList_todos
    }
  `, {});

  return (
    <div {...stylex.props(styles.todoContainer)}>
      <TodoHeader />
      <TodoCreationInput />
      <TodoList todos={query} />
    </div>
  )
}


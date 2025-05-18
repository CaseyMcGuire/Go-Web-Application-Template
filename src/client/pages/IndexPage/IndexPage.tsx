import {graphql, useLazyLoadQuery} from "react-relay";
import {IndexPageQuery} from "relay/__generated__/IndexPageQuery.graphql";
import TodoCreationInput from "pages/IndexPage/components/TodoCreationInput";
import TodoHeader from "pages/IndexPage/components/TodoHeader";
import TodoList from "pages/IndexPage/components/TodoList";
import stylex from "@stylexjs/stylex";
import {useContext} from "react";
import {TodoContext} from "common/context/TodoContext";

const styles = stylex.create({
  body: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'center'
  },
  darkImage: {
    backgroundImage: `url("../../../../assets/images/bg-desktop-dark.jpg")`
  },
  lightImage: {
    backgroundImage: `url("../../../../assets/images/bg-desktop-light.jpg")`
  },
  todoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '540px',
    marginTop: '72px',
  },
  todoHeaderContainer: {
    marginBottom: '48px',
    width: '100%'
  },
  todoCreationInputContainer: {
    width: '100%',
    marginBottom: '24px',
  }
})

export default function IndexPage() {
  const query = useLazyLoadQuery<IndexPageQuery>(graphql`
    query IndexPageQuery {
        ...TodoList_todos
    }
  `, {});

  const context = useContext(TodoContext);
  const imageStyle = context?.colorMode == 'light' ? styles.lightImage : styles.darkImage;
  return (
      <div {...stylex.props(styles.imageContainer, imageStyle)}>
        <div {...stylex.props(styles.todoContainer)}>
          <div {...stylex.props(styles.todoHeaderContainer)}>
            <TodoHeader />
          </div>
          <div {...stylex.props(styles.todoCreationInputContainer)}>
            <TodoCreationInput />
          </div>
          <TodoList todos={query} />
        </div>
      </div>
  )
}


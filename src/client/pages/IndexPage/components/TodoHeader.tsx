import stylex from "@stylexjs/stylex";
import {useContext} from "react";
import {TodoContext} from "common/context/TodoContext";

const styles = stylex.create({
  titleContainer: {
    fontFamily: "Josefin Sans",
    fontSize: 40,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  textContainer: {
    color: '#FFFFFF',
    letterSpacing: '15px'
  },
  colorModeIcon: {
    cursor: 'pointer'
  }
})

export default function TodoHeader() {
  const context = useContext(TodoContext)
  const icon = context!.colorMode == 'light' ? "icon-moon.svg" : "icon-sun.svg"
  const iconPath = `/assets/svg/${icon}`;

  const onClick = () => {
    const newColorMode = context!.colorMode == 'light' ? 'dark' : 'light';

    context!.dispatch({
      type: 'SET_COLOR_MODE',
      colorMode: newColorMode
    })
  }

  return (
    <div {...stylex.props(styles.titleContainer)}>
      <div {...stylex.props(styles.textContainer)}>
        TODO
      </div>
      <div>
        <img {...stylex.props(styles.colorModeIcon)}
             onClick={() => onClick()}
             src={iconPath}
             alt=""
        />
      </div>
    </div>
  )
}
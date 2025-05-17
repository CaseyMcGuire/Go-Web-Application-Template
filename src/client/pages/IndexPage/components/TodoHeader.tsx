import stylex from "@stylexjs/stylex";

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
  }
})

export default function TodoHeader() {
  return (
    <div {...stylex.props(styles.titleContainer)}>
      <div {...stylex.props(styles.textContainer)}>
        TODO
      </div>
      <div>
        <img src="../../../../assets/svg/icon-moon.svg" alt=""/>
      </div>
    </div>
  )
}
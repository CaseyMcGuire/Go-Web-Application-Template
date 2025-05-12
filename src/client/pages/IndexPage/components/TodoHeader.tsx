import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  title: {
    fontFamily: "Josefin Sans",
    fontSize: 40,
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
})

export default function TodoHeader() {
  return (
    <div {...stylex.props(styles.title)}>
      TODO
    </div>
  )
}
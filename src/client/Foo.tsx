import stylex from "@stylexjs/stylex";


const styles = stylex.create({
  foo: {
    backgroundColor: 'green',
    border: '1px solid grey',
    fontSize: '14px'
  }
})

export default function Foo() {
  return (
    <div {...stylex.props(styles.foo)}>
      foo
    </div>
  )
}
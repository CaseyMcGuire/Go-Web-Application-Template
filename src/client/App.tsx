import stylex from "@stylexjs/stylex";
import {createRoot} from "react-dom/client";

const styles = stylex.create({
  body: {
    backgroundColor: 'green'
  }
})

export default function App() {
  return (
    <div {...stylex.props(styles.body)}>
      hello
    </div>
  )
}

const domNode = document.getElementById('root');
const root = createRoot(domNode!!);
root.render(<App />);
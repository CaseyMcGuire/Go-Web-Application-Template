import {createRoot} from "react-dom/client";

export default function App() {
  return (
    <div>
      hello
    </div>
  )
}

const domNode = document.getElementById('root');
const root = createRoot(domNode!!);
root.render(<App />);
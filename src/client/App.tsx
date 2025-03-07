import * as stylex from "@stylexjs/stylex";
import {renderComponent} from "./util/ReactPageUtils";
import {createBrowserRouter, RouterProvider} from "react-router";

const styles = stylex.create({
  body: {
    backgroundColor: 'green'
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>lasjdkf</div>
  },
  {
    path: '/login',
    element: <div>login</div>
  },
  {
    path: '/register',
    element: <div>Register</div>
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}

renderComponent(<App />);
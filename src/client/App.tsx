import * as stylex from "@stylexjs/stylex";
import {renderComponent} from "util/ReactPageUtils";
import {createBrowserRouter, RouterProvider} from "react-router";
import LoginPage from "pages/LoginPage/LoginPage";
import RegisterPage from "pages/RegisterPage/RegisterPage";

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
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}

renderComponent(<App />);
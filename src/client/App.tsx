import {renderComponent} from "util/ReactPageUtils";
import {createBrowserRouter, RouterProvider} from "react-router";
import LoginPage from "pages/LoginPage/LoginPage";
import RegisterPage from "pages/RegisterPage/RegisterPage";
import {RelayEnvironmentProvider} from "react-relay";
import {RelayConfig} from "relay/RelayConfig";
import { Suspense } from "react";
import IndexPage from "pages/IndexPage/IndexPage";
import TodoContextProvider from "common/context/TodoContextProvider";

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />
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
    <RelayEnvironmentProvider environment={RelayConfig.getEnvironment()} >
      <Suspense fallback={null}>
        <TodoContextProvider>
          <RouterProvider router={router} />
        </TodoContextProvider>
      </Suspense>
    </RelayEnvironmentProvider>
  )
}

renderComponent(<App />);
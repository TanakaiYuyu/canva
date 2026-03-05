import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Render from './views/Render'
import Settings from './views/Settings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/render" replace />,
  },
  {
    path: '/render',
    element: <Render />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}

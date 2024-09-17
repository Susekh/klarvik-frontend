import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import ContentPage from './pages/ContentPage.tsx'
import Auth from './pages/Auth.tsx'
import ProtectRoutes from './components/ProtectRoutes.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'


const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/',
        element : (<ProtectRoutes>
                    <Home />
                  </ProtectRoutes>
        )
      },
      {
        path : '/auth',
        element : (
          <ProtectRoutes>
            <Auth />
          </ProtectRoutes>
        )
      },
      {
        path : '/content',
        element : (
          <ProtectRoutes>
            <ContentPage />
          </ProtectRoutes>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)

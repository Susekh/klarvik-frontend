
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
import HandleGithubOauth from './components/HandleGithubOauth.tsx'
import HandleGoogleOauth from './components/HandleGoogleOauth.tsx'
import ContentShimmer from './components/loaders/shimmers/ContentShimmer.tsx'
import Profile from './pages/Profile.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import ResetPassword from './pages/ResetPassword.tsx'
import EditProfile from './pages/EditProfile.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Project from './components/projects/Project.tsx'
import Sprint from './components/sprints/Sprint.tsx'


const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        index : true,
        element : (
        <ProtectRoutes isProtected={false}>
          <Home />
        </ProtectRoutes>
      )
      },
      {
        path : '/auth',
        element : (
          <ProtectRoutes isProtected={true}>
            <Auth />
          </ProtectRoutes>
        )
      },
      {
        path : '/dashboard',
        element : (
          <ProtectRoutes isProtected={true}>
            <Dashboard/>
          </ProtectRoutes>
        )
      },
      {
        path : '/auth/forgot-password',
        element : <ForgotPassword/>
      },
      {
        path : '/auth/reset-password/:token',
        element : <ResetPassword/>
      },
      {
        path : '/shop',
        element : (
        <ProtectRoutes isProtected={true}>
          <ContentShimmer/>
        </ProtectRoutes>
        )
      },
      {
        path : '/profile',
        element : (
          <ProtectRoutes isProtected={true}>
            <Profile/>
          </ProtectRoutes>
        )//Todo : show option to change password or set password if they are logged in using oauth -> also option to edit other details
      },
      {
        path : '/profile/edit',
        element : (
          <ProtectRoutes isProtected={true} >
            <EditProfile/>
          </ProtectRoutes>
        )
      },
      {
        path: '/projects/:projectId',
        element: (
          <ProtectRoutes isProtected={true}>
            <Project />
          </ProtectRoutes>
        ),
      },
      {
        path: '/projects/:projectId/sprints/:sprintId',
        element: (
          <ProtectRoutes isProtected={true}>
            <Sprint />
          </ProtectRoutes>
        ),
      },
      {
        path: 'auth/oauth',
        children : [
          {
            path: 'github',
            element : (<HandleGithubOauth/>)
          },
          {
            path : 'google',
            element : <HandleGoogleOauth/>
          },
        ]
      },
      {
        path : '/content',
        element : (
          <ProtectRoutes isProtected={true}>
            <ContentPage />
          </ProtectRoutes>
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import Home from './pages/home/home.jsx';
import Sign from './pages/signIn/sign.jsx';
import Admin from './pages/admin/admin.jsx';
import FilterPage from './pages/filterPage/filterPage.jsx';
import AppProvider from './components/context/appcontext.jsx';
import RealStateDetails from './pages/realStateDetails/realStateDetails.jsx';
import RegisterProperty from './pages/registerProperty/registerProperty.jsx';
import './index.css'
import "@radix-ui/themes/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'primereact/resources/primereact.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AdminHome from './pages/adminHome/adminHome.jsx';
import UsersManagement from './pages/usersManagement/usersManagement.jsx';
import RealStateManagement from './pages/realStateManagement/realStateManagement.jsx';
import PaymentsManagement from './pages/paymentsManagement/paymentsManagement.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <RealStateDetails />,
        path: 'details/:id'
      },
      {
        element: <FilterPage />,
        path: 'filters'
      },
      {
        element: <RegisterProperty />,
        path: 'cadastrar-imovel'
      } 
    ],
  },
  {
    element: <Sign />,
    path: '/sign',
  },
  {
    element: <Admin />,
    path: '/admin',
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: '/admin/users-management',
        element: <UsersManagement />,
      },
      {
        path: '/admin/realstate-management',
        element: <RealStateManagement />,
      },
      {
        path: '/admin/payments-management',
        element: <PaymentsManagement />,
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)

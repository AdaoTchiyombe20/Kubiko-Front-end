import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import AppProvider from './components/context/appcontext.jsx';
import Home from './components/home/home.jsx';
import RealStateDetails from './components/realStateDetails/realStateDetails.jsx';
import FilterPage from './components/filterPage/filterPage.jsx';
import './index.css'
import "@radix-ui/themes/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'primereact/resources/primereact.min.css';

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
        path: '/details/:id'
      },
      {
        element: <FilterPage />,
        path: '/filters'
      } 
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)

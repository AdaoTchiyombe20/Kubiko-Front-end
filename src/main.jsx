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
import 'primeicons/primeicons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AdminHome from './pages/adminHome/adminHome.jsx';
import UsersManagement from './pages/usersManagement/usersManagement.jsx';
import RealStateManagement from './pages/realStateManagement/realStateManagement.jsx';
import PaymentsManagement from './pages/paymentsManagement/paymentsManagement.jsx';
import MyProfile from './pages/my-profile/myProfile.jsx';
import MyProposals from './pages/my-proposals/myProposals.jsx';
import ReceivedProposals from './pages/received-proposals/receivedProposals.jsx';
import PurchaseHistory from './pages/purchase-history/purchaseHistory.jsx';
import ProposalDetails from './pages/proposal-details/proposalDetails.jsx';
import MyProfileHome from './pages/my-profile-home/myProfileHome.jsx';
import MakePayment from './pages/make-payment/makePayment.jsx';
import MyPayments from './pages/my-payments/myPayments.jsx';
import MyProperties from './pages/my-properties/myProperties.jsx';

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
      },
      {
        element: <MakePayment />,
        path: 'payment',
      },
    ],
  },
  {
    element: <Sign />,
    path: '/sign',
  },
  {
    element: <MyProfile />,
    path: '/my-profile',
    children: [
      {
        index: true,
        element: <MyProfileHome />,
      },
      {
        path: 'my-proposals',
        element: <MyProposals />,
      },
      {
        path: 'my-proposals/details-proposal/:id',
        element: <ProposalDetails />,
      },
      {
        path: 'my-payments',
        element: <MyPayments />,
      },
      {
        path: 'my-properties',
        element: <MyProperties />,
      },
      {
        path: 'received-proposals',
        element: <ReceivedProposals />,
      },
      {
        path: 'received-proposals/details-proposal/:id',
        element: <ProposalDetails />,
      },
      {
        path: 'purchase-history',
        element: <PurchaseHistory />,
      },
    ],
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
        path: 'users-management',
        element: <UsersManagement />,
      },
      {
        path: 'realstate-management',
        element: <RealStateManagement />,
      },
      {
        path: 'payments-management',
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

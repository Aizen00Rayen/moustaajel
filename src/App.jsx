import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import HuissierDirectory from './pages/HuissierDirectory'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

import ClientDashboard from './pages/client/ClientDashboard'
import NewRequest from './pages/client/NewRequest'
import RequestDetail from './pages/client/RequestDetail'
import ClientProfile from './pages/client/ClientProfile'

import HuissierDashboard from './pages/huissier/HuissierDashboard'
import HuissierRequestDetail from './pages/huissier/HuissierRequestDetail'
import HuissierProfile from './pages/huissier/HuissierProfile'
import HuissierSubscription from './pages/huissier/HuissierSubscription'

import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/directory" element={<HuissierDirectory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/client"
          element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/new-request"
          element={
            <ProtectedRoute role="client">
              <NewRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/requests/:id"
          element={
            <ProtectedRoute role="client">
              <RequestDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/profile"
          element={
            <ProtectedRoute role="client">
              <ClientProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/huissier"
          element={
            <ProtectedRoute role="huissier">
              <HuissierDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/huissier/requests/:id"
          element={
            <ProtectedRoute role="huissier">
              <HuissierRequestDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/huissier/profile"
          element={
            <ProtectedRoute role="huissier">
              <HuissierProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/huissier/subscription"
          element={
            <ProtectedRoute role="huissier">
              <HuissierSubscription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

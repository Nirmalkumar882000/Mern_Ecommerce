import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashBoard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccounts from './pages/shopping-view/accounts'
import ShoppingListings from './pages/shopping-view/listing'
import CheckAuth from './components/common/check-auth'
import UnAuthPage from './pages/unauth-page'

const App = () => {
  const isAuthenticated =false
  const user = null
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AuthLayout/>
          </CheckAuth>
          } >
        <Route path='login' element={<AuthLogin/>} />
        <Route path='register' element={<AuthRegister/>} />
        </Route>
        {/* admin routes */}
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AdminLayout/>
          </CheckAuth>
          }>
        <Route path='dashboard' element={<AdminDashBoard/>} />
        <Route path='products' element={<AdminProducts/>} />
        <Route path='orders' element={<AdminOrders/>} />
        <Route path='features' element={<AdminFeatures/>} />
        </Route>
        {/* shopping Routes */}
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <ShoppingLayout/>
          </CheckAuth>
          }>
        <Route path='home' element={<ShoppingHome/>}/>
        <Route path='checkout' element={<ShoppingCheckout/>}/>
        <Route path='account' element={<ShoppingAccounts/>}/>
        <Route path='listing' element={<ShoppingListings/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/unauth-page' element={<UnAuthPage/>}/>
      </Routes>
    </div>
  )
}

export default App
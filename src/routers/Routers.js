import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import CheckOut from '../pages/CheckOut'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import PageNotFound from '../pages/PageNotFound'
import ProtectedRoute from './ProtectedRoute'

function Routers() {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/shop/:id' element={<ProductDetails/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<ProtectedRoute>
          <CheckOut />
        </ProtectedRoute> } />
        <Route path='/Login' element={<Login/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='*' element={<PageNotFound/>} />
    </Routes>
  )
}

export default Routers

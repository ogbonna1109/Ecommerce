import React from 'react'
import Footer from './Components/Footer/Footer.jsx'
import NavBar from './Components/NavBar/NavBar.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Categories from './Pages/Categories/Categories.jsx'
import Home from './Pages/Home/Home.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import About from './Pages/About/About.jsx'

import Profile from './Pages/Profile/Profile.jsx'
import Shop from './Pages/Shop/Shop.jsx'
import NewArrivals from './Pages/NewArrivals/NewArrivals.jsx'
import { Routes, Route } from 'react-router-dom'

import ProductDetails from './Pages/ProductDetails/ProductDetails.jsx'
import Checkout from './Pages/Checkout/Checkout.jsx'
import OrderConfirmation from './Pages/OrderConfirmation/OrderConfirmation.jsx'

import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute.jsx'
import Admin from './Pages/Admin/AdminDashboard/AdminDashboard.jsx'
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin.jsx'

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/NewArrivals" element={<NewArrivals />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />

        <Route path="/ProductDetails" element={<ProductDetails />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/OrderConfirmation" element={<OrderConfirmation />} />

        {/* Protected Admin Routes */}
        <Route path="/Admin" element={<AdminLogin />} />
        <Route
          path="/Admin/Dashboard"
          element={
            <AdminProtectedRoute>
              <Admin initialTab="overview" />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/Admin/Products"
          element={
            <AdminProtectedRoute>
              <Admin initialTab="products" />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/Admin/Orders"
          element={
            <AdminProtectedRoute>
              <Admin initialTab="orders" />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/Admin/Settings"
          element={
            <AdminProtectedRoute>
              <Admin initialTab="settings" />
            </AdminProtectedRoute>
          }
        />

      </Routes>

      <Footer />
    </>
  )
}

export default App

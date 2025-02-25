import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../src/components/Homepage';
import ProductListing from './components/Screens/ProductListing';
import ProductDetail from './components/Screens/ProductDetail';
import NavigationBar from './components/Navbar';
import CartPage from './components/Screens/Cart';

const App = () => {
  const [cart, setCart] = useState([]); // Cart state
  return(
    
      
      <Routes>
        
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/products" element={<ProductListing cart={cart} setCart={setCart} />} />
        <Route path="/products/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} /> 
      </Routes>
    
    
  )
}

export default App;

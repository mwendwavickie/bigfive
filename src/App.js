import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../src/components/Homepage';
import ProductListing from './components/ProductListing';
import ProductCard from './components/ProductCard';
import NavigationBar from './components/Navbar';
import CartPage from './components/Cart';

const App = () => {
  const [cart, setCart] = useState([]); // Cart state
  return(
    
      
      <Routes>
        
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/products" element={<ProductListing cart={cart} setCart={setCart} />} />
        <Route path="/product/:id" element={<ProductCard cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} /> 
      </Routes>
    
    
  )
}

export default App;

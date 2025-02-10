import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../src/components/Homepage';
import ProductListing from './components/ProductListing';
import ProductCard from './components/ProductCard';

const App = () => {
  return(
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductCard />} />  {/* Ensure route is set */}
      </Routes>
    
  )
}

export default App;

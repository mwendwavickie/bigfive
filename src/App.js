import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../src/components/Homepage';

const App = () => {
  return(
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/products/:id" element={<ProductCard products={products} cart={cart} setCart={setCart}'/>
      </Routes>
    
  )
}

export default App;

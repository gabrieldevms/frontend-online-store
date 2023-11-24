import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import ProductsList from './pages/ProductsList/ProductsList';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <>
      <Search />
      <Link to="/shoppingcart">
        <button data-testid="shopping-cart-button">
          Carrinho de Compras
        </button>

      </Link>
      <Routes>
        <Route path="/" element={ <ProductsList /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/shoppingcart" element={ <ShoppingCart /> } />
      </Routes>
    </>
  );
}

export default App;

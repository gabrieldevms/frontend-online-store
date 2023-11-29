import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import ProductsList from './pages/ProductsList/ProductsList';
import ShoppingCart from './components/ShoppingCart';
import ProductDetail from './components/ProductDetail';
import Checkout from './pages/Checkout/Checkout';

type Product = {
  id: number | string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
};

function App() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (
    productId: number | string,
    productName: string,
    productThumbnail: string,
    productPrice: number,
  ) => {
    setCart([...cart, { id: productId,
      name: productName,
      thumbnail: productThumbnail,
      price: productPrice,
      quantity: 1 }]);
  };

  return (
    <>
      <Search addToCart={ addToCart } />
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      <Link to="/shoppingcart">
        <button data-testid="shopping-cart-button">
          Carrinho de Compras
        </button>
      </Link>
      <Routes>
        <Route path="/" element={ <ProductsList addToCart={ addToCart } /> } />
        <Route path="/search" element={ <Search addToCart={ addToCart } /> } />
        <Route
          path="/shoppingcart"
          element={ <ShoppingCart cart={ cart } setCart={ setCart } /> }
        />
        <Route
          path="/product/:productId"
          element={ <ProductDetail addToCart={ addToCart } /> }
        />
        <Route
          path="/checkout"
          element={ <Checkout cart={ cart } setCart={ setCart } /> }
        />
      </Routes>
    </>
  );
}

export default App;

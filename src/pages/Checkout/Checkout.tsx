import React, { useState } from 'react';
import ShoppingCart from '../../components/ShoppingCart';

interface Product {
  id: number | string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

function Checkout() {
  const initialCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<Product[]>(initialCart);

  return (
    <>
      <h2>Suas compras:</h2>
      <ul>
        {cart.map((product) => (
          <li key={ product.id }>{product.name}</li>
        ))}
      </ul>
    </>
  );
}

export default Checkout;

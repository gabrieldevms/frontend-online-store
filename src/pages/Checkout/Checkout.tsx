import React, { useState, useEffect } from 'react';

interface Product {
  id: number | string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

function Checkout() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <ul>
      {cart.map((product) => (
        <li key={ product.id }>{product.name}</li>
      ))}
    </ul>
  );
}

export default Checkout;

import React, { useEffect } from 'react';
import CheckoutPage from '../../components/CheckoutPage';

interface Product {
  id: number | string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

function Checkout({ cart, setCart }: ShoppingCartProps) {
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);

  return (
    <>
      <ul>
        {cart.map((product) => (
          <li key={ product.id }>{product.name}</li>
        ))}
      </ul>

      <CheckoutPage />
    </>
  );
}

export default Checkout;

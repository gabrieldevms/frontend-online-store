import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

function ShoppingCart({ cart, setCart }: ShoppingCartProps) {
  const [emptyCart, setEmptyCart] = useState(true);
  const [initialCart, setInitialCart] = useState<Product[]>([]);

  useEffect(() => {
    if (cart.length > 0) {
      setEmptyCart(false);
      // Salvando no localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      setEmptyCart(true);
    }
  }, [cart]);

  const handleIncrementQuantity = (productId: number | string) => {
    const updatedCart = cart.map((product) => (product.id === productId
      ? { ...product, quantity: (product.quantity || 1) + 1 } // Garante que a quantidade mínima seja 1
      : product));
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId: number | string) => {
    const updatedCart = cart.map((product) => (product.id === productId
      ? { ...product, quantity: Math.max((product.quantity || 1) - 1, 1) } // Garante que a quantidade mínima seja 1
      : product));
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveProduct = (productId: number | string) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <h1>Seu Carrinho de Compras:</h1>

      {emptyCart ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
        cart.map((product) => (
          <div key={ product.id }>
            <img src={ product.thumbnail } alt={ product.name } />
            <p data-testid="shopping-cart-product-name">{product.name}</p>
            <p>
              R$
              {' '}
              {product.price}
            </p>
            <p data-testid="shopping-cart-product-quantity">
              Quantidade:
              {' '}
              {product.quantity || 1}
              {' '}
            </p>
            <button
              onClick={ () => handleIncrementQuantity(product.id) }
              data-testid="product-increase-quantity"
            >
              Incrementar Quantidade
            </button>
            <button
              onClick={ () => handleDecreaseQuantity(product.id) }
              data-testid="product-decrease-quantity"
            >
              Diminuir Quantidade
            </button>
            <button
              onClick={ () => handleRemoveProduct(product.id) }
              data-testid="remove-product"
            >
              Remover Produto
            </button>
          </div>
        ))
      )}
      <Link to="/checkout">
        <button data-testid="checkout-products">Finalizar Compra</button>
      </Link>
    </>
  );
}

export default ShoppingCart;

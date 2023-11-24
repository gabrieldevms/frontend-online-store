import React from 'react';

function ShoppingCart() {
  const [cart, setCart] = React.useState([]);
  const [emptyCart, setEmptyCart] = React.useState(true);

  return (
    <>
      <h1>Seu Carrinho de Compras:</h1>
      {emptyCart
        ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        : null}
    </>

  );
}

export default ShoppingCart;

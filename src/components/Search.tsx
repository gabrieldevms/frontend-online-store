import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default function Search() {
  const [name, setName] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  const handleSearch = async () => {
    try {
      const results = await getProductsFromCategoryAndQuery('MLB', name);
      const productsData = results.results;
      if (productsData.length === 0) {
        setNoResults(true);
        setProducts([]);
      } else {
        setProducts(productsData);
        setNoResults(false);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };
  return (
    <div>
      <h2>Pesquisa:</h2>
      <input
        type="text"
        data-testid="query-input"
        value={ name }
        onChange={ (event) => setName(event.target.value) }
      />
      <button onClick={ handleSearch } data-testid="query-button">
        Buscar
      </button>

      {noResults && <p data-testid="no-results">Nenhum produto foi encontrado.</p>}

      {products.map((product) => (
        <div key={ product.id } data-testid="product">
          <NavLink
            data-testid="product-detail-link"
            to={ `/product/${product.id}` }
          >
            <h2>{product.title}</h2>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>
              Preço: R$
              {product.price}
            </p>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

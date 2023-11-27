import React, { useState } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

type Result = {
  id: number;
  title: string;
};
export default function Search() {
  const [name, setName] = useState('');
  const [resultados, setResultados] = useState<Result[]>([]);
  const handleSearch = async () => {
    try {
      const results = await getProductsFromCategoryAndQuery('MLB', name);
      setResultados(results.results);
      console.log(resultados);
    } catch (error) {
      console.error('Erro na busca:', error);
      setResultados([]);
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
      {name.length <= 0 ? (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      ) : (
        <p />
      )}
      <h2>Resultado</h2>
      <ul>
        {resultados.map((result: Result) => (
          <li key={ result.id } data-testid="product">{result.title}</li>))}
      </ul>
    </div>
  );
}

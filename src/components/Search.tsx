import React, { useState } from 'react';

export default function Search() {
  const [name, setname] = useState('');

  return (
    <div>
      <input
        type="text"
        data-testid="search-artist-input"
        value={ name }
        onChange={ (event) => setname(event.target.value) }
      />
      {name.length <= 0
        ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
        : (<p />)}

    </div>
  );
}

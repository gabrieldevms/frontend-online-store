import React, { useEffect, useState } from 'react';
import { getCategories } from '../../services/api';

type Category = {
  id: number;
  name: string;
};

function ProductsList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <>
      <h2>Categorias</h2>
      <ul>
        {categories.map((category: Category) => (
          <li key={ category.id } data-testid="category">{category.name}</li>))}
      </ul>
    </>
  );
}

export default ProductsList;

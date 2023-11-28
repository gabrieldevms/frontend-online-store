import React, { useEffect, useState } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import Search from '../../components/Search';

type Category = {
  id: string;
  name: string;
};
type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
};
function ProductsList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  useEffect(() => {
    getCategories().then((categoriesData) => {
      setCategories(categoriesData);
    });
  }, []);
  useEffect(() => {
    if (selectedCategory !== null) {
      getProductsFromCategoryAndQuery(selectedCategory, searchQuery)
        .then((productsData) => {
          setProducts(productsData.results);
        });
    }
  }, [selectedCategory, searchQuery]);
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <>
      <Search />
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      <h2>Categorias</h2>
      <ul>
        {categories.map((category: Category) => (
          // <li key={ category.id } onClick={ () => handleCategoryClick(category.id) } data-testid="category">
          <li key={ category.id }>
            <input
              type="button"
              value={ category.name }
              key={ category.id }
              onClick={ () => handleCategoryClick(category.id) }
              data-testid="category"
            />
          </li>

        ))}
      </ul>

      {products.length > 0 && (
        <>
          <h2>Produtos da Categoria</h2>
          <ul>
            {products.map((product: Product) => (
              <li key={ product.id } data-testid="product">
                <img src={ product.thumbnail } alt={ product.title } />
                <div>{product.title}</div>
                <div>{product.price}</div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
export default ProductsList;

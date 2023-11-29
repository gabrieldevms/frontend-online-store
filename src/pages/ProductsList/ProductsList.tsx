import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';

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

interface ProductsListProps {
  addToCart: (
    productId: string,
    productName: string,
    productThumbnail: string,
    productPrice: number
  ) => void;
}

function ProductsList({ addToCart }: ProductsListProps) {
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

  const handleClickAddToCart = (
    productId: string,
    productName: string,
    productImage: string,
    productPrice: number,
  ) => {
    addToCart(productId, productName, productImage, productPrice);
    localStorage.setItem('cart', JSON.stringify({
      productId,
      productName,
      productImage,
      productPrice,
    }));
  };

  return (
    <>
      <h2>Categorias</h2>
      <ul>
        {categories.map((category: Category) => (
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
          {products.map((product: Product) => (
            <div key={ product.id } data-testid="product">
              <NavLink
                data-testid="product-detail-link"
                to={ `/product/${product.id}` }
              >
                <img src={ product.thumbnail } alt={ product.title } />
                <div>{product.title}</div>
                <div>{product.price}</div>
              </NavLink>
              <button
                onClick={ () => handleClickAddToCart(
                  product.id,
                  product.title,
                  product.thumbnail,
                  product.price,
                ) }
                data-testid="product-add-to-cart"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
}
export default ProductsList;

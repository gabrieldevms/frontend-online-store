import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

function ProductDetail({ addToCart }: ProductsListProps) {
  const { productId: routeProductId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const apiUrl = `https://api.mercadolibre.com/items/${routeProductId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Define os detalhes do produto no estado
        setProduct(data);
        setLoading(false); // Define loading como false após obter os dados
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
        setLoading(false); // Define loading como false em caso de erro
      }
    };

    fetchProductDetails();
  }, [routeProductId]);

  if (loading) {
    return <p>Carregando...</p>; // mensagem de carregamento enquanto os detalhes do produto estão sendo buscados
  }

  if (!product) {
    return <p>Não foi possível carregar os detalhes do produto.</p>; // mensagem de erro se não conseguir obter os detalhes do produto
  }

  const handleClickAddToCart = (
    productId: string,
    productName: string,
    productImage: string,
    productPrice: number,
  ) => {
    addToCart(productId, productName, productImage, productPrice);
  };

  return (
    <>
      <div>
        <h2 data-testid="product-detail-name">{product.title}</h2>
        <img
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">
          Preço: R$
          {product.price}
        </p>
      </div>
      <button
        onClick={ () => handleClickAddToCart(
          product.id,
          product.title,
          product.thumbnail,
          product.price,
        ) }
        data-testid="product-detail-add-to-cart"
      >
        Adicionar ao Carrinho
      </button>
    </>
  );
}
export default ProductDetail;

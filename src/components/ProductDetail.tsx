import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const apiUrl = `https://api.mercadolibre.com/items/${productId}`;
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
  }, [productId]);

  if (loading) {
    return <p>Carregando...</p>; // mensagem de carregamento enquanto os detalhes do produto estão sendo buscados
  }

  if (!product) {
    return <p>Não foi possível carregar os detalhes do produto.</p>; // mensagem de erro se não conseguir obter os detalhes do produto
  }

  return (
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

      {/* Se for preciso adicionar outras infos para o produto, pode inseri-las aqui */}

      {/* Botão para ir para o carrinho, quando for implementado essa função futuramente */}
      {/* <Link
        to="/shoppingcart"
        data-testid="shopping-cart-button"
      >
        <button>Ir para o Carrinho</button>
      </Link> */}
    </div>
  );
}
export default ProductDetail;

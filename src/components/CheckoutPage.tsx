import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/');
    localStorage.clear();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        data-testid="checkout-fullname"
        type="text"
        placeholder="Nome completo"
        required
      />
      <input
        type="email"
        data-testid="checkout-email"
        placeholder="Email"
        required
      />
      <input
        type="text"
        data-testid="checkout-cpf"
        placeholder="CPF"
        required
      />
      <input
        type="text"
        data-testid="checkout-phone"
        placeholder="Telefone"
        required
      />
      <input
        type="text"
        data-testid="checkout-cep"
        placeholder="CEP"
        required
      />
      <input
        type="text"
        data-testid="checkout-address"
        placeholder="Endereço"
        required
      />
      <div>
        <label htmlFor="ticket">Boleto</label>
        <input
          type="radio"
          data-testid="ticket-payment"
          id="ticket"
          name="radio"
          required
        />
        <label htmlFor="visa">Visa</label>
        <input
          type="radio"
          data-testid="visa-payment"
          id="visa"
          name="radio"
          required
        />
        <label htmlFor="master">Master</label>
        <input
          type="radio"
          data-testid="master-payment"
          id="master"
          name="radio"
          required
        />
        <label htmlFor="elo">Elo</label>
        <input
          type="radio"
          data-testid="elo-payment"
          id="elo"
          name="radio"
          required
        />
      </div>

      <button data-testid="checkout-btn">Finalizar Compra</button>

      <div data-testid="error-msg">Campos inválidos</div>
    </form>
  );
}

export default CheckoutPage;

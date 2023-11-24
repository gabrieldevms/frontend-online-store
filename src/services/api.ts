export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestJson = await request.json();
  console.log(requestJson);
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(categoryId:string, query:string) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const requestProductJson = await request.json();
  console.log(requestProductJson);
  return requestProductJson;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}

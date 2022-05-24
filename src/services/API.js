const getAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const isResponse = await response.json();
  const filtro = Object.keys(isResponse).filter((chulambes) => chulambes !== 'USDT');

  return filtro;
};

export default getAPI;

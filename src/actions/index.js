import getAPI from '../services/API';

export const SUCESS = 'SUCESS';

export const SUCESS_CURRENCIES = 'SUCESS_CURRENCIES';

export const login = (email) => ({ type: 'LOGIN', email });

const requestAPI = () => ({
  type: 'REQUEST',
});

export const currenciesTest = (currencies) => ({
  type: SUCESS_CURRENCIES,
  currencies,
});

const fetchAPI = async (dispatch) => {
  dispatch(requestAPI());
  const isResponse = await getAPI();
  const currencies = isResponse;
  dispatch(currenciesTest(currencies));
};

export const actionFetchAPI = () => fetchAPI;

export const expenseTest = (expenses) => ({
  type: SUCESS,
  expenses,
});

export const fetchExpense = (outraExpense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const isResponse = await response.json();
  if (!outraExpense.exchangeRates) {
    outraExpense.exchangeRates = isResponse;
  }
  dispatch(expenseTest(outraExpense));
};

import { SUCESS, SUCESS_CURRENCIES } from '../actions';

const ESTADO_INICIAL = {
  currencies: [],
  expenses: [],
};

function wallet(state = ESTADO_INICIAL, action) {
  switch (action.type) {
  case SUCESS_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SUCESS:
    return {
      ...state,
      expenses: ([...state.expenses, action.expenses]).sort((a, b) => a.id - b.id),
    };

  default:
    return state;
  }
}

export default wallet;

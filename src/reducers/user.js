// Esse reducer será responsável por tratar as informações da pessoa usuária
// import login from '../actions';

const LOGIN = 'LOGIN';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default user;

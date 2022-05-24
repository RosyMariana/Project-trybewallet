import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchAPI, fetchExpense } from '../actions';
import NovaTabela from '../Components/NovaTabela';

const cambio = 'BRL';
let num2 = 0;
const CARTAO_CREDITO = 'Cartão de crédito';
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: CARTAO_CREDITO,
      tag: 'Lazer',
      description: '',
      ativado: true,
    };
  }

  componentDidMount() {
    const { currenciesTest, currencies } = this.props;
    currenciesTest(currencies);
  }

  Validar= () => {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    this.setState({
      ativado: true,
    });
    if (value && currency && method && tag && description) {
      this.setState({
        ativado: false,
      });
    }
  }

  Adicionar = () => {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const { test } = this.props;
    const outraExpense = {
      id: num2,
      value,
      currency,
      method,
      tag,
      description,
    };

    num2 += 1;

    test(outraExpense);

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: CARTAO_CREDITO,
      tag: 'Lazer' }, () => this.Validar());
  }

  inputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.Validar();
    });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
      ativado } = this.state;

    const METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const TAG = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const valorFinal = expenses.reduce((total, atual) => {
      const num = Number.parseFloat(atual.exchangeRates[atual.currency].ask);
      total += atual.value * num;
      return total;
    }, 0);
    const valorFinal2 = valorFinal.toFixed(2);
    return (
      <main>
        <header>
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field">
            { valorFinal2 }
          </p>
          <span data-testid="header-currency-field">
            { cambio }
          </span>
        </header>
        <section>
          <label htmlFor="value">
            <input
              data-testid="value-input"
              name="value"
              type="number"
              value={ value }
              onChange={ this.inputChange }
            />
          </label>
          <label htmlFor="description">
            <input
              data-testid="description-input"
              name="description"
              type="text"
              value={ description }
              onChange={ this.inputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.inputChange }
            >
              {currencies.map((moedaTeste) => (
                <option key={ moedaTeste } value={ moedaTeste }>
                  {moedaTeste}
                </option>))}
            </select>
          </label>

          <label htmlFor="method">
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.inputChange }
            >
              {METHOD.map((chulambes) => (
                <option key={ chulambes }>
                  {' '}
                  { chulambes }
                </option>))}
            </select>
          </label>

          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.inputChange }
            >
              {TAG.map((chulambes2) => (
                <option key={ chulambes2 }>
                  {' '}
                  { chulambes2 }
                </option>))}
            </select>
          </label>

          <button
            type="button"
            data-testid="btn-adicionar"
            disabled={ ativado }
            onClick={ this.Adicionar }
          >
            Adicionar despesa
          </button>
        </section>
        <table>
          <thead>
            <tr>
              <th>
                Descrição
              </th>
              <th>
                Tag
              </th>
              <th>
                Método de pagamento
              </th>
              <th>
                Valor
              </th>
              <th>
                Moeda
              </th>
              <th>
                Câmbio utilizado
              </th>
              <th>Valor convertido </th>
              <th>
                Moeda de conversão
              </th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((teste, index) => (
              <NovaTabela
                expense={ teste }
                key={ index }
              />
            ))}
          </tbody>
        </table>
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  currenciesTest: () => dispatch(actionFetchAPI()),
  test: (outraExpense) => dispatch(fetchExpense(outraExpense)),
});
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currenciesTest: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  test: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

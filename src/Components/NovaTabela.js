import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NovaTabela extends Component {
  render() {
    const { expense } = this.props;
    return (
      <tr key={ expense.id } id={ expense.id }>
        <td>
          {' '}
          {expense.description}
          {' '}
        </td>
        <td>
          {' '}
          {expense.tag}
          {' '}
        </td>
        <td>
          {' '}
          {expense.method}
          {' '}
        </td>
        <td>
          {' '}
          {Number.parseFloat(expense.value).toFixed(2)}
          {' '}
        </td>
        <td>
          {' '}
          {(expense.exchangeRates[expense.currency].name).split('/', 1)}
          {' '}
        </td>
        <td>
          {' '}
          {Number.parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
          {' '}
        </td>
        <td>
          {' '}
          {Number.parseFloat((expense.exchangeRates[expense.currency].ask)
          * expense.value).toFixed(2)}
          {' '}
        </td>
        <td>
          {' '}
          Real
          {' '}
        </td>
      </tr>
    );
  }
}

NovaTabela.propTypes = {
  expense: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NovaTabela;

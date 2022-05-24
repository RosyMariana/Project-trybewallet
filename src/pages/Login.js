import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

const num = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      ativado: true,
    };
  }

  onChangeSenha = ({ target }) => {
    this.setState({
      password: target.value,
    }, () => this.teste());
  }

  teste = () => {
    const { email, password } = this.state;
    this.setState({
      ativado: true,
    });
    if (email.match(/\S+@\S+\.\S+/) && password.length >= num) { // referencia: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
      this.setState({
        ativado: false,
      });
    }
  }

  onChangeEmail = ({ target }) => {
    this.setState({
      email: target.value,
    }, () => this.teste());
  }

  chulambes = () => {
    const { email } = this.state;
    const { history, TestEmail } = this.props;
    TestEmail(email);
    history.push('/carteira');
  }

  render() {
    const { ativado, email, password } = this.state;
    return (
      <div className="login">
        <section className="inputs-login">
          <input
            data-testid="email-input"
            type="text"
            onChange={ this.onChangeEmail }
            placeholder="email"
            value={ email }
          />
          <input
            data-testid="password-input"
            type="password"
            onChange={ this.onChangeSenha }
            placeholder="senha"
            value={ password }
          />
        </section>
        <div className="link">
          <button
            type="button"
            onClick={ this.chulambes }
            data-testid="btn-login"
            disabled={ ativado }
          >
            Entrar
          </button>
        </div>

      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  TestEmail: (email) => dispatch(login(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  TestEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

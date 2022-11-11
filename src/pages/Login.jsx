import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    userName: '',
    isButtonDisable: true,
    loading: false,
  };

  verifyName = ({ target }) => {
    const { value } = target;
    const minName = 3;
    this.setState({ userName: value });
    if (value.length >= minName) {
      this.setState({
        isButtonDisable: false,
      });
    } else {
      this.setState({
        isButtonDisable: true,
      });
    }
  };

  doLogin = async () => {
    const { userName } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { isButtonDisable, loading } = this.state;

    return (
      <div data-testid="page-login">
        { loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="login-name-input">
              <input
                name="name"
                type="text"
                id="login-name-input"
                data-testid="login-name-input"
                onChange={ this.verifyName }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ isButtonDisable }
              onClick={ this.doLogin }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    userName: '',
    loading: false,
  };

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    this.setState({ loading: true });
    const name = await getUser();
    this.setState({ loading: false, userName: name });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <div>
        <div data-testid="header-component">
          {loading ? (
            <Loading />
          ) : (
            <h1 data-testid="header-user-name">
              { userName.name }
            </h1>
          )}
        </div>
        <button type="button">
          <Link data-testid="link-to-search" to="/search">Search</Link>
        </button>
        <button type="button">
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        </button>
        <button type="button">
          <Link to="/albun/:id">Album</Link>
        </button>
        <button type="button">
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </button>
        <button type="button">
          <Link to="/profile/edit">Prodile Edit</Link>
        </button>
      </div>
    );
  }
}

export default Header;

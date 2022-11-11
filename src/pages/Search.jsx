import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    search: '',
    isButtonDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { search } = this.state;
      const minChar = 2;
      if (search.length >= minChar) {
        this.setState({ isButtonDisable: false });
      } else {
        this.setState({ isButtonDisable: true });
      }
    });
  };

  render() {
    const { isButtonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="search"
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

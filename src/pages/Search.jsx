import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  state = {
    search: '',
    isButtonDisable: true,
    loading: false,
    albuns: [],
    searched: false,
    results: false,
    searchedArtist: '',
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

  searchArtist = async (artist) => {
    const album = await searchAlbumsAPI(artist);
    this.setState({ loading: true }, () => {
      this.setState({ albuns: album }, () => {
        const { albuns } = this.state;
        this.setState({ searched: true });
        if (albuns[0] !== undefined) {
          this.setState({ results: true });
        } else {
          this.setState({ results: false });
        }
        const { search } = this.state;
        this.setState({
          loading: false,
          searchedArtist: search,
          search: '',
        });
      });
    });
  };

  render() {
    const {
      loading,
      isButtonDisable,
      search,
      searched,
      results,
      albuns,
      searchedArtist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="search"
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ search }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisable }
            onClick={ async (event) => {
              event.preventDefault();
              await this.searchArtist(search);
            } }
          >
            Pesquisar
          </button>
        </form>
        <section>
          {
            !searched ? (
              <h1>Insira o nome do artista/banda</h1>
            ) : (
              null
            )
          }
          {
            loading ? <Loading /> : null
          }
          {
            searched && !results ? (
              <h1>Nenhum álbum foi encontrado</h1>
            ) : (
              null
            )
          }
          {
            searched && results ? (
              <div>
                <h4>{ `Resultado de álbuns de: ${searchedArtist}` }</h4>
                { albuns.map((album) => (
                  <AlbumCard
                    key={ album.collectionId }
                    album={ album }
                  />)) }
              </div>
            ) : (
              null
            )
          }
        </section>
      </div>
    );
  }
}

export default Search;

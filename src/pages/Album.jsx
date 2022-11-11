import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    album: {},
    musics: [],
    loading: true,
  };

  componentDidMount() {
    this.findId();
  }

  findId = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const [album, ...musics] = await getMusics(id);
    this.setState({
      album,
      musics,
      loading: false,
    });
  };

  render() {
    const { album, loading, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? (
            <Loading />
          ) : (
            <div>
              <h2 data-testid="album-name">{ album.collectionName }</h2>
              <h3 data-testid="artist-name">{ album.artistName }</h3>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              { musics.map((music) => (<MusicCard
                key={ music.trackName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
              />)) }
            </div>
          )
        }
      </div>
    );
  }
}

export default Album;

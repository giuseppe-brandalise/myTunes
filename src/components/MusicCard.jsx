import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    favorite: false,
    loading: true,
  };

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    const { music } = this.props;
    const favoritesSongs = await getFavoriteSongs();
    const isInFav = favoritesSongs
      .filter((favMusic) => favMusic.trackId === music.trackId);
    this.setState({
      loading: false,
      favorite: isInFav[0] !== undefined,
    });
  };

  handlerChange = ({ target }) => {
    const { checked } = target;
    this.setState({ favorite: checked }, () => {
      const { favorite } = this.state;
      const { music } = this.props;
      this.setState({ loading: true }, async () => {
        if (favorite === true) {
          await addSong(music);
          this.setState({ loading: false });
        } else {
          await removeSong(music);
          this.setState({ loading: false });
        }
      });
    });
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { favorite, loading } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite">
              <input
                type="checkbox"
                name="favorite"
                id=""
                data-testid={ `checkbox-music-${trackId}` }
                checked={ favorite }
                onChange={ this.handlerChange }
              />
            </label>
          </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;

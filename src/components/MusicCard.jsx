import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    favorite: false,
    loading: false,
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
        {loading ? <Loading /> : null}
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
            value={ favorite }
            onChange={ this.handlerChange }
          />
        </label>
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

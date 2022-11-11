import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { album } = this.props;
    const {
      artistName,
      collectionName,
      artworkUrl100,
      collectionId,
    } = album;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <h3>{ collectionName }</h3>
        </Link>
        <p>{ artistName }</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    collectionId: PropTypes.number,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;

import React from 'react';
import { useMusic } from '../context/MusicContext';
import './SongItem.css';

const SongItem = ({ song, userRole }) => {
  const { deleteSong } = useMusic();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${song.title}"?`)) {
      deleteSong(song.id);
    }
  };

  return (
    <div className="song-item">
      <div className="song-header">
        <h3 className="song-title">{song.title}</h3>
        {userRole === 'admin' && (
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
      <div className="song-details">
        <div className="song-detail">
          <strong>Artist:</strong> {song.artist}
        </div>
        <div className="song-detail">
          <strong>Album:</strong> {song.album}
        </div>
        <div className="song-detail">
          <strong>Year:</strong> {song.year}
        </div>
      </div>
    </div>
  );
};

export default SongItem;
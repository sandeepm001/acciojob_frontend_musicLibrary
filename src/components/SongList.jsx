import React from 'react';
import { useMusic } from '../context/MusicContext';
import SongItem from './SongItem';
import './SongList.css';

const SongList = ({ userRole }) => {
  const { songs, groupBy } = useMusic();

  const renderSongs = () => {
    if (groupBy && typeof songs === 'object' && !Array.isArray(songs)) {
      return Object.entries(songs).map(([group, groupSongs]) => (
        <div key={group} className="song-group">
          <h3 className="group-header">{group}</h3>
          <div className="song-grid">
            {groupSongs.map(song => (
              <SongItem key={song.id} song={song} userRole={userRole} />
            ))}
          </div>
        </div>
      ));
    }

    return (
      <div className="song-grid">
        {Array.isArray(songs) && songs.map(song => (
          <SongItem key={song.id} song={song} userRole={userRole} />
        ))}
      </div>
    );
  };

  return <div className="song-list">{renderSongs()}</div>;
};

export default SongList;
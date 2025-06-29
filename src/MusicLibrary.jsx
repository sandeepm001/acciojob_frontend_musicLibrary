import React from 'react';
import { MusicProvider } from './context/MusicContext';
import FilterControls from './components/FilterControls';
import AddSongForm from './components/AddSongForm';
import SongList from './components/SongList';
import './MusicLibrary.css';

const MusicLibrary = ({ userRole, songs, onAddSong, onDeleteSong }) => {
  // If no props are passed, use default behavior (for standalone mode)
  const isStandalone = !songs || !onAddSong || !onDeleteSong;
  
  const effectiveUserRole = userRole || (() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const [, payload] = token.split('.');
        const decoded = JSON.parse(atob(payload));
        return decoded.role || 'user';
      } catch {
        return 'user';
      }
    }
    return 'user';
  })();

  if (isStandalone) {
    // Standalone mode - use internal state
    return (
      <MusicProvider>
        <div className="music-library">
          <FilterControls />
          {effectiveUserRole === 'admin' && <AddSongForm />}
          <SongList userRole={effectiveUserRole} />
        </div>
      </MusicProvider>
    );
  }

  // Controlled mode - use props from parent
  return (
    <MusicProvider 
      initialSongs={songs} 
      onAddSong={onAddSong} 
      onDeleteSong={onDeleteSong}
    >
      <div className="music-library">
        <FilterControls />
        {effectiveUserRole === 'admin' && <AddSongForm />}
        <SongList userRole={effectiveUserRole} />
      </div>
    </MusicProvider>
  );
};

export default MusicLibrary;
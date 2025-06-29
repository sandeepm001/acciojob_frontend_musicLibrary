import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSongs as defaultSongs } from '../data/mockSongs';

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children, initialSongs, onAddSong, onDeleteSong }) => {
  // Use provided songs or fall back to default
  const [songs, setSongs] = useState(initialSongs || defaultSongs);
  const [filter, setFilter] = useState({ type: '', value: '' });
  const [sortBy, setSortBy] = useState('title');
  const [groupBy, setGroupBy] = useState('');

  // Update songs when props change
  useEffect(() => {
    if (initialSongs) {
      setSongs(initialSongs);
    }
  }, [initialSongs]);

  const addSong = (songData) => {
    if (onAddSong) {
      // Controlled mode - call parent handler
      onAddSong(songData);
    } else {
      // Standalone mode - manage internally
      setSongs(prev => [...prev, { ...songData, id: Date.now() }]);
    }
  };

  const deleteSong = (id) => {
    if (onDeleteSong) {
      // Controlled mode - call parent handler
      onDeleteSong(id);
    } else {
      // Standalone mode - manage internally
      setSongs(prev => prev.filter(song => song.id !== id));
    }
  };

  const getFilteredSongs = () => {
    let filtered = [...songs];

    // Apply filter
    if (filter.value && filter.type) {
      filtered = filtered.filter(song => 
        String(song[filter.type])
          .toLowerCase()
          .includes(filter.value.toLowerCase())
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      const aVal = String(a[sortBy]).toLowerCase();
      const bVal = String(b[sortBy]).toLowerCase();
      return aVal.localeCompare(bVal);
    });

    // Apply grouping
    if (groupBy) {
      const grouped = filtered.reduce((acc, song) => {
        const key = String(song[groupBy]) || 'Unknown';
        if (!acc[key]) acc[key] = [];
        acc[key].push(song);
        return acc;
      }, {});
      return grouped;
    }

    return filtered;
  };

  return (
    <MusicContext.Provider value={{
      songs: getFilteredSongs(),
      addSong,
      deleteSong,
      filter,
      setFilter,
      sortBy,
      setSortBy,
      groupBy,
      setGroupBy
    }}>
      {children}
    </MusicContext.Provider>
  );
};
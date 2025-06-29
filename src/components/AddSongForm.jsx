import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import './AddSongForm.css';

const AddSongForm = () => {
  const { addSong } = useMusic();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.title && formData.artist) {
      addSong({
        ...formData,
        year: formData.year ? parseInt(formData.year) : new Date().getFullYear()
      });
      
      
      // Reset form
      setFormData({
        title: '',
        artist: '',
        album: '',
        year: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="add-song-form" onSubmit={handleSubmit}>
      <h3>Add New Song</h3>
      <div className="form-grid">
        <div className="form-field">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Artist *</label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Album</label>
          <input
            type="text"
            name="album"
            value={formData.album}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
      </div>
      <button type="submit" className="add-btn">
        Add Song
      </button>
    </form>
  );
};

export default AddSongForm;
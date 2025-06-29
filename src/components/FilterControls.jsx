import React from 'react';
import { useMusic } from '../context/MusicContext';
import './FilterControls.css';

const FilterControls = () => {
  const { filter, setFilter, sortBy, setSortBy, groupBy, setGroupBy } = useMusic();

  return (
    <div className="filter-controls">
      <div className="control-group">
        <label>Filter by:</label>
        <select 
          value={filter.type} 
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <option value="">Select field</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        {/* <input
          type="text"
          placeholder="Search..."
          value={filter.value}
          onChange={(e) => setFilter({ ...filter, value: e.target.value })}
        /> */}
      </div>

      <div className="control-group">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="year">Year</option>
        </select>
      </div>

      <div className="control-group">
        <label>Group by:</label>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="">No grouping</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="year">Year</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
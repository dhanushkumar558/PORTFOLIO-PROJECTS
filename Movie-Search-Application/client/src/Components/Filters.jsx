import React, { useState } from 'react';

function Filters({ onSearch }) {
  const [industry, setIndustry] = useState('');
  const [year, setYear] = useState('');
  const [actor, setActor] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');

  const handleSearch = () => {
    onSearch({ industry, year, actor, rating, genre });
  };

  return (
    <div className="bg-light rounded shadow-sm">
      <h5 className="mb-2.5">🎯 Filter Movies</h5>
      <div className="row g-1">
        <div className="col-12 col-md-6 col-lg-12">
          <label>Industry</label>
          <select className="form-select" value={industry} onChange={e => setIndustry(e.target.value)}>
            <option value="">Select</option>
            <option value="kollywood">Kollywood</option>
            <option value="bollywood">Bollywood</option>
            <option value="hollywood">Hollywood</option>
            <option value="tollywood">Tollywood</option>
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-12">
          <label>Year</label>
          <select className="form-select" value={year} onChange={e => setYear(e.target.value)}>
            <option value="">Select</option>
            {Array.from({ length: 30 }, (_, i) => {
              const y = 2025 - i;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-12">
          <label>Actor</label>
          <input type="text" className="form-control" value={actor} onChange={e => setActor(e.target.value)} />
        </div>

        <div className="col-12 col-md-6 col-lg-12">
          <label>Rating</label>
          <select className="form-select" value={rating} onChange={e => setRating(e.target.value)}>
            <option value="">Select</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}+</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-12">
          <label>Genre</label>
          <select className="form-select" value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="">Select</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-12 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={handleSearch}>Go 🔍</button>
        </div>
      </div>
    </div>
  );
}

export default Filters;

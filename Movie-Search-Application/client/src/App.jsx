import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Filters from './Components/Filters';

function App() {
  const [movies, setMovies] = useState([]);

  // Function to fetch movies based on filters
  const fetchMovies = async (filters = {}) => {
    try {
      const res = await axios.post('http://localhost:5000/api/movies', filters);
      setMovies(res.data);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    }
  };

  // Fetch all movies on initial render
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="row">
          {/* Filter Section - 100% on mobile, 25% on large */}
          <div className="col-12 col-lg-3 mb-4">
            <Filters onSearch={fetchMovies} />
          </div>

          {/* Movies Section - 100% on mobile, 75% on large */}
          <div className="col-12 col-lg-9">
            <div className="row g-3">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div key={movie.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100">
                  


                      <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">
                          <strong>Industry:</strong> {movie.industry}<br />
                          <strong>Year:</strong> {movie.year}<br />
                          <strong>Actor:</strong> {movie.actor}<br />
                          <strong>Rating:</strong> {movie.rating}<br />
                          <strong>Genre:</strong> {movie.genre}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <p className="text-muted">No movies found for selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

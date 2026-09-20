"use client";

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedCity = city.trim();
    if (trimmedCity === '') {
      return;
    }

    onSearch(trimmedCity);
    setCity('');
  };

  return (
    <div className="search-bar-wrapper">
      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Write your city name e.g.: Dhaka, London)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search Here
        </button>
      </form>
    </div>
  );
}
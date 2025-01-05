import React from 'react';
import FlightWidget from './FlightWidget';

export default function SearchForm() {
  return (
    <div className="relative" style={{ zIndex: 9999 }}>
      <FlightWidget />
    </div>
  );
}
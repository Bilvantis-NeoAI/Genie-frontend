// ShimmerLoader.js
import React from 'react';
import '../styles/ShimmerLoader.css';

const ShimmerLoader = ({ width = '100px', height = '20px' }) => {
  return (
    <div className="shimmer-loader" style={{ width, height }}></div>
  );
};

export default ShimmerLoader;

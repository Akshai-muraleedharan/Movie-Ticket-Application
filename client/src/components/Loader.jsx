// Loader.js
import React from 'react';
import './Loader.css'; // Assume you have some styles in Loader.css

const Loader = () => {
  return (
    <div class="spinner">
    <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <div>Loading...</div>
</div>
  );
};

export default Loader;

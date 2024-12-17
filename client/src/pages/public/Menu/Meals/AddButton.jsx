import React from 'react'

function AddButton({ text, fun, className = "" }) {
    return (
      <button
        className={`
         px-4 py-2 rounded-lg bg-amber-500 text-white font-mediu
         hover:bg-amber-600
         focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all duration-200
          ${className}`}
          onClick={fun}
      >
        {text}
      </button>
    );
  }
export default AddButton;

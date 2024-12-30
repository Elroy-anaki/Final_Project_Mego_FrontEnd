import React from 'react'

function AddButton({ text, fun, className = "", disabled = false }) {
    return (
      <button
        className={`
          rounded-lg bg-amber-500 text-white font-medium
          transition-all duration-200
          ${className}`}
          onClick={fun}
          disabled={disabled}
      >
        {text}
      </button>
    );
  }
export default AddButton;

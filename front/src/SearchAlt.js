import React from "react";

function SearchAlt({ className }) {
  return (
    <svg
      className={'${className}'}
      fill="none"
      height="60"
      viewBox="0 0 62 60"
      width="62"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="28.4168" cy="27.1052" rx="18.0833" ry="17.2487" stroke="#8884FF" strokeWidth="2" />
      <path
        d="M28.4165 19.7128C27.3988 19.7128 26.391 19.904 25.4507 20.2755C24.5104 20.647 23.6561 21.1915 22.9364 21.8779C22.2168 22.5644 21.6459 23.3793 21.2564 24.2762C20.867 25.173 20.6665 26.1343 20.6665 27.1051"
        stroke="#8884FF"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path d="M51.6665 49.2821L43.9165 41.8898" stroke="#8884FF" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
};

export default SearchAlt;
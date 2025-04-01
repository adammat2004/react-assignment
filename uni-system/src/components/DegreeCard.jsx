
import React from 'react';
import { Link } from 'react-router-dom';

const DegreeCard = ({ name, shortcode }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="mt-2 text-lg text-gray-600">{shortcode}</p>
        <Link 
          to={`/degrees/${shortcode}`} 
          className="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DegreeCard;

import React from 'react';
import { Link } from 'react-router-dom';

const ModuleCard = ({ ca_split, code, full_name }) => {
  return (
    <Link to={`/modules/${code}`}>
        <div className="max-w-sm bg-white rounded-lg shadow-md border border-gray-200 p-6 
                    hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-xl 
                    transition-transform duration-300 ease-in-out">
            <h2 className="text-lg font-semibold">{full_name}</h2>
            <p className="text-sm mt-1">Code: <span className="font-medium">{code}</span></p>
            <p className="text-sm mt-2">CA Split: <span className="font-medium">{ca_split}</span></p>
        </div>
    </Link>
  );
};

export default ModuleCard;

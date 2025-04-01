import React from 'react';
import { Link } from "react-router-dom";
import SingleCohortPage from '../pages/SingleCohortPage';

const CohortCard = ({ id, name, year }) => {
  return (
    <Link to={`/cohorts/${id}`}>
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="text-sm text-gray-500">Cohort ID: {id}</div>
        <h2 className="text-xl font-semibold text-gray-800 mt-2">{name}</h2>
        <p className="text-gray-600 mt-1">Year: {year}</p>
      </div>
    </Link>
  );
};

export default CohortCard;

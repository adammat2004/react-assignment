import React from 'react';
import { Link } from 'react-router-dom';

const StudentCard = ({ email, first_name, last_name, student_id }) => {
  return (
    <Link to={`/students/${student_id}`}>
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-gray-800">
            {first_name} {last_name}
        </h2>
        <p className="text-gray-600 mt-1">{email}</p>
        <p className="text-gray-500 mt-2 text-sm">Student ID: <span className="font-medium text-gray-700">{student_id}</span></p>
        </div>
    </Link>
  );
};

export default StudentCard;

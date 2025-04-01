import React, { useEffect, useState } from 'react'
import CohortCard from '../components/CohortCard';

const Cohorts = () => {
    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/cohort/');

                if(!response.ok){
                    console.error("Failed to fetch cohorts");
                }
                const data = await response.json()
                setCohorts(data);
            } catch (error) {
                throw new Error("Failed to fetch cohorts");
            }
        }
        fetchCohorts();
    }, [])
    return (
        <div>
            <button className="px-6 py-3 mb-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out" onClick={() => window.location.href = '/create-cohort'}>Create Cohort</button>
            <ul>
                {cohorts.map((cohort) => (
                    <li key={cohort.id}>
                        <CohortCard 
                            name={cohort.name}
                            id={cohort.id}
                            year={cohort.year}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Cohorts
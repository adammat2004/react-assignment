import React, { useEffect, useState } from 'react'
import DegreeCard from '../components/DegreeCard';

const Degrees = () => {
    const [degrees, setDegrees] = useState([]);
    useEffect(() => {
        const fetchDegrees = async() => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/degree/');
                console.log("response", response);
                if(!response.ok){
                    throw new Error('Failed to fetch degrees');
                }
                const data = await response.json();

                setDegrees(data);
            } catch (error) {
                console.error("Failed to fetch degrees")
            }
        }

        fetchDegrees();
    }, [])
    console.log(degrees);
    return (
        <div className=''>
            <button className="px-6 py-3 mb-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out" onClick={() => window.location.href = '/create-degree'}>Create Degree</button>
            <ul className='p-8'>
                {degrees.map((degree) => (
                    <li className="p-6" key={degree.full_name}>
                        <DegreeCard 
                            name={degree.full_name}
                            shortcode={degree.shortcode}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Degrees
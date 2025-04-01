import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CohortCard from '../components/CohortCard';
const SingleDegreePage = () => {
    const { shortcode } = useParams();
    const [cohort, setCohort] = useState([]);

    useEffect(() => {
        const fetchCohort = async() => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/cohort/?degree=${shortcode}`);

                if(!response.ok){
                    console.error("Error fetching cohort");
                }
                const data = await response.json();
                setCohort(data);
            } catch (error) {
                console.error("error in fetch request")
            }
        }
        fetchCohort();
    }, [])
    console.log("cohort", cohort);
    return (
        <div>
            <ul>
                {cohort.map((c) => (
                    <li key={c.id}>
                        <CohortCard 
                            id={c.id}
                            name={c.name}
                            year={c.year}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SingleDegreePage
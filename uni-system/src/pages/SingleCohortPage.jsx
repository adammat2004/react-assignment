import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CohortCard from '../components/CohortCard';
import StudentCard from '../components/StudentCard';

const SingleCohortPage = () => {
    const { id } = useParams();
    const [cohort, setCohort] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchCohort = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/cohort/${id}/`);
                if(!response.ok){
                    console.error("Failed to get cohort");
                }
                const data =  await response.json();
                setCohort(data);
            } catch (error) {
                console.error("Error in fetching cohort function");
            }
        }
        fetchCohort();
    }, [id])

    useEffect(() => {
        const fetchStudents= async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/student/?cohort=${id}`);
                if(!response.ok){
                    console.error("Failed to get students");
                }
                const data =  await response.json();
                setStudents(data);
            } catch (error) {
                throw new Error("Error in fetching student function");
            }
        }
        fetchStudents();
    }, [id])
    console.log(students);

    return (
        <div>
            <CohortCard 
                id={cohort.id}
                name={cohort.name}
                year={cohort.year}
            />
            <div className="mt-4 pl-3">
                <Link 
                    to={`/modules/cohort/${cohort.id}`} 
                    className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Modules for this Cohort
                </Link>
            </div>
            <div className='mt-6'>
                <ul className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {students.map((student) => (
                        <li key={student.id}>
                            <StudentCard
                                first_name={student.first_name}
                                last_name={student.last_name}
                                email={student.email}
                                student_id={student.student_id}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SingleCohortPage
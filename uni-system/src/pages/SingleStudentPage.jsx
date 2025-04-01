import React, { useEffect, useState } from 'react'
import { resolvePath, useParams } from 'react-router-dom'
import StudentCard from '../components/StudentCard';
import ModuleCard from '../components/ModuleCard';

const SingleStudentPage = () => {
    const { id } = useParams();
    const [student, setStudent] = useState([]);
    const [registeredModules, setRegisteredModules] = useState([]);
    const [grades, setGrades] = useState([]);
    useEffect(() => {
        const fetchStudent = async () =>{
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/student/${id}/`);

                if(!response.ok){
                    throw new Error("failed to fetch student");
                }
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                throw new Error("fetch student function failed");
            }
        }
        fetchStudent();
    }, [id])

    useEffect(() => {
        const fetchGrades = async () =>{
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/grade/?student=${id}`);

                if(!response.ok){
                    throw new Error("failed to modules");
                }
                const data = await response.json();
                setGrades(data);
                
            } catch (error) {
                throw new Error("fetch modules function failed");
            }
        }
        fetchGrades();
    }, [id])
    return (
        <div>
            <StudentCard 
                first_name={student.first_name}
                last_name={student.last_name}
                email={student.email}
                student_id={student.student_id}
            />
            <div className="bg-white shadow-md rounded-md p-4 max-w-4xl mx-auto mt-6">
                <ul className="space-y-4">
                    {grades.map((grade) => (
                    <li key={grade.id} className="flex justify-around items-center border-b border-gray-200 pb-2">
                        <p className="text-lg font-semibold text-gray-800">{grade.module.slice(33, 38)}</p>
                        <p className="text-lg font-medium text-gray-600">{grade.total_grade}</p>
                    </li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    {registeredModules.map((module) => (
                        <li key={module.code}>
                            <ModuleCard 
                                full_name={module.full_name}
                                code={module.code}
                                ca_split={module.ca_split}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SingleStudentPage
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ModuleCard from '../components/ModuleCard';

const ModulesForCohert = () => {
    const { code } = useParams();
    const [modules, setModules] = useState([]);
    console.log(code);
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${code}`)

                if(!response.ok){
                    throw new Error("Failed to fetch modules");
                }
                const data = await response.json();
                setModules(data);
            } catch (error) {
                throw new Error("Error in fetching modules component");
            }
        }
        fetchModules();
    }, [])
    return (
        <div>
            <ul className='grid grid-cols-3'>
                {modules.map((module) => (
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
    )
}

export default ModulesForCohert
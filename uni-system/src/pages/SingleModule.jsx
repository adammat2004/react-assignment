import React from 'react'
import { UNSAFE_getPatchRoutesOnNavigationFunction, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ModuleCard from '../components/ModuleCard';

const SingleModule = () => {
    const { code } = useParams();
    const [module, setModule] = useState([]);

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/module/${code}/`);
                if(!response.ok){
                    throw new Error("Failed to fetch module");
                }
                const data = await response.json();
                setModule(data);
            } catch (error) {
                throw new Error("Error in fetching module function");
            }
        }
        fetchModule();
    }, [])
    return (
        <div>
            <ModuleCard 
                ca_split={module.ca_split}
                code={module.code}
                full_name={module.full_name}
            />
        </div>
    )
}

export default SingleModule
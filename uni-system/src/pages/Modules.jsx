import React, { useEffect, useState } from 'react'
import ModuleCard from '../components/ModuleCard';
import { Link } from 'react-router-dom';
const Modules = () => {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/module/');
                
                if(!response.ok){
                    throw new Error("Failed to fetch modules");
                }
                const data = await response.json();
                setModules(data);
            } catch (error) {
                throw new Error("Error is fetch modules function")
            }
        }
        fetchModules();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <button className="px-6 py-3 mb-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out" onClick={() => window.location.href = '/create-module'}>Create Module</button>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {modules.map((module) => (
                    <li key={module.code} className="flex">
                        <ModuleCard 
                            full_name={module.full_name}
                            code={module.code}
                            ca_split={module.ca_split}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );    
}

export default Modules
import React, { useState, useEffect } from 'react';

const CreateGrade = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    module: '',
    ca_mark: 0,
    exam_mark: 0,
    cohort: '',
    student: '',
    total_grade: 0,
  });

  // State to store fetched modules and cohorts
  const [modules, setModules] = useState([]);
  const [cohorts, setCohorts] = useState([]);

  // Fetch modules and cohorts from the API
  useEffect(() => {
    const fetchModulesAndCohorts = async () => {
      try {
        // Fetch modules
        const moduleResponse = await fetch('http://127.0.0.1:8000/api/module/');
        const moduleData = await moduleResponse.json();
        setModules(moduleData);

        // Fetch cohorts
        const cohortResponse = await fetch('http://127.0.0.1:8000/api/cohort/');
        const cohortData = await cohortResponse.json();
        setCohorts(cohortData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchModulesAndCohorts();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.module || !formData.cohort || !formData.student || formData.total_grade === '') {
      alert('Please fill out all fields.');
      return;
    }

    // Construct URLs for module, cohort, and student
    const moduleUrl = `http://127.0.0.1:8000/api/module/${formData.module}/`;
    const cohortUrl = `http://127.0.0.1:8000/api/cohort/${formData.cohort}/`;
    const studentUrl = `http://127.0.0.1:8000/api/student/${formData.student}/`;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/grade/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: moduleUrl,
          ca_mark: formData.ca_mark,
          exam_mark: formData.exam_mark,
          cohort: cohortUrl,
          total_grade: formData.total_grade,
          student: studentUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error response:', data);
        alert(`Error: ${JSON.stringify(data)}`);
        return;
      }

      alert('Grade Created!');
      window.location.href = `/students/${formData.student}`; // Redirect to the grades list page after creation
    } catch (error) {
      console.error('Error creating grade:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create New Grade</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="module" className="block text-sm font-medium text-gray-700">
            Module
          </label>
          <select
            id="module"
            name="module"
            value={formData.module}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Module</option>
            {modules.map((module) => (
              <option key={module.code} value={module.code}>
                {module.code}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ca_mark" className="block text-sm font-medium text-gray-700">
            CA Mark
          </label>
          <input
            type="number"
            id="ca_mark"
            name="ca_mark"
            value={formData.ca_mark}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="exam_mark" className="block text-sm font-medium text-gray-700">
            Exam Mark
          </label>
          <input
            type="number"
            id="exam_mark"
            name="exam_mark"
            value={formData.exam_mark}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="cohort" className="block text-sm font-medium text-gray-700">
            Cohort
          </label>
          <select
            id="cohort"
            name="cohort"
            value={formData.cohort}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Cohort</option>
            {cohorts.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="student" className="block text-sm font-medium text-gray-700">
            Student ID
          </label>
          <input
            type="text"
            id="student"
            name="student"
            value={formData.student}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="total_grade" className="block text-sm font-medium text-gray-700">
            Total Grade
          </label>
          <input
            type="number"
            id="total_grade"
            name="total_grade"
            value={formData.total_grade}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateGrade;

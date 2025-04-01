import React, { useState, useEffect } from 'react';

const CreateStudent = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    cohort: '', // This will hold the cohort's shortcode
    email: '',
  });

  // State to store fetched cohorts
  const [cohorts, setCohorts] = useState([]);

  // Fetch cohorts from the API
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        // Example API fetch, replace this with your actual API endpoint
        const response = await fetch('http://127.0.0.1:8000/api/cohort/');
        const data = await response.json();
        setCohorts(data); // Assuming the API returns an array of cohorts
      } catch (error) {
        console.error('Error fetching cohorts:', error);
      }
    };

    fetchCohorts();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (Marking this as async to use await)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.student_id || !formData.first_name || !formData.last_name || !formData.cohort || !formData.email) {
      alert('Please fill out all fields.');
      return;
    }

    // Construct the cohort URL
    const cohortUrl = `http://127.0.0.1:8000/api/cohort/${formData.cohort}/`;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/student/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: formData.student_id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          cohort: cohortUrl,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error response:", data);
        alert(`Error: ${JSON.stringify(data)}`);
        return;
      }

      alert("Student Created!");
      window.location.href = `/students/${formData.student_id}`; // Redirect to the students list page after creation
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create New Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">
            Student ID
          </label>
          <input
            type="text"
            id="student_id"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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

export default CreateStudent;

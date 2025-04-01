import React, { useState, useEffect } from 'react';

const CreateModule = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    code: '',
    full_name: '',
    delivered_to: '', // Single degree code, will be converted to an array
    ca_split: 100,
  });

  // State to store fetched degrees
  const [cohorts, setCohorts] = useState([]);

  // Fetch degrees from an API or data source
  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        // Example API fetch, replace this with your actual API endpoint
        const response = await fetch('http://127.0.0.1:8000/api/cohort/');
        const data = await response.json();
        setCohorts(data); // Assuming the API returns an array of degrees
      } catch (error) {
        console.error('Error fetching degrees:', error);
      }
    };

    fetchDegrees();
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

    // Validate that code is 5 characters or less
    if (formData.code.length > 5) {
      alert('Code should not be more than 5 characters');
      return;
    }

    // Ensure delivered_to is an array (even if it's just one degree selected)
    const cohortUrl = `http://127.0.0.1:8000/api/cohort/${formData.delivered_to}/`;
    const deliveredToArray = [cohortUrl]; // Wrap the degree URL in an array
    console.log(deliveredToArray);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/module/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "code": formData.code,
          "full_name": formData.full_name,
          "delivered_to": deliveredToArray,
          "ca_split": formData.ca_split,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error response:", data);
        alert(`Error: ${JSON.stringify(data)}`);
        return;
      }

      alert("Module Created!");
      window.location.href = "/modules";
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Code
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="delivered_to" className="block text-sm font-medium text-gray-700">
          Delivered To (Degree)
        </label>
        <select
          id="delivered_to"
          name="delivered_to"
          value={formData.delivered_to}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Degree</option>
          {cohorts.map((cohort) => (
            <option key={cohort.id} value={cohort.id}>
              {cohort.id}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ca_split" className="block text-sm font-medium text-gray-700">
          CA Split
        </label>
        <input
          type="number"
          id="ca_split"
          name="ca_split"
          value={formData.ca_split}
          onChange={handleChange}
          min="0"
          max="100"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateModule;

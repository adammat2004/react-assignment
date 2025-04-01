import React, { useState } from 'react';

const CreateDegree = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    full_name: '',
    shortcode: '',
  });

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
    if (!formData.full_name || !formData.shortcode) {
      alert('Please fill out both fields.');
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/degree/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.full_name,
          shortcode: formData.shortcode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error response:", data);
        alert(`Error: ${JSON.stringify(data)}`);
        return;
      }

      alert("Degree Created!");
      window.location.href = "/degrees"; // Redirect to the degrees page after creation
    } catch (error) {
      console.error("Error creating degree:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create New Degree</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            required
          />
        </div>

        <div>
          <label htmlFor="shortcode" className="block text-sm font-medium text-gray-700">
            Shortcode
          </label>
          <input
            type="text"
            id="shortcode"
            name="shortcode"
            value={formData.shortcode}
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

export default CreateDegree;

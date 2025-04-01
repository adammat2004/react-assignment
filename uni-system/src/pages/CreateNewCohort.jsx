import React, { useState, useEffect } from "react";

const CohortForm = () => {
  const [degrees, setDegrees] = useState([]);
  const [cohort, setCohort] = useState({
    id: "",
    degree: "",
    year: "",
  });

  // Fetch degrees for the dropdown
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/degree/")
      .then((response) => response.json())
      .then((data) => setDegrees(data))
      .catch((error) => console.error("Error fetching degrees:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure year is a number
    if (name === "year" && isNaN(value)) {
      return; // Ignore non-numeric input
    }

    setCohort({ ...cohort, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure year is a valid number
    if (!/^\d+$/.test(cohort.year)) {
      alert("Year must be a number.");
      return;
    }
    const degreeUrl = `http://127.0.0.1:8000/api/degree/${cohort.degree}/`;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cohort/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: cohort.id, // ID as string
          degree: degreeUrl, // Degree ID as string
          year: parseInt(cohort.year, 10), // Ensure year is an integer
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error response:", data);
        alert(`Error: ${JSON.stringify(data)}`);
        return;
      }

      alert("Cohort Created!");
      setCohort({ id: "", degree: "", year: "" }); // Reset form
      window.location.href = "/cohorts"
    } catch (error) {
      console.error("Error creating cohort:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Cohort</h2>
      <form onSubmit={handleSubmit}>
        {/* ID Field (String Input) */}
        <div className="mb-4">
          <label className="block font-medium">ID</label>
          <input
            type="text"
            name="id"
            value={cohort.id}
            onChange={handleChange}
            required
            placeholder="Enter Cohort ID (String)"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Degree Dropdown */}
        <div className="mb-4">
          <label className="block font-medium">Degree</label>
          <select
            name="degree"
            value={cohort.degree}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select a Degree</option>
            {degrees.map((degree) => (
              <option key={degree.shortcode} value={degree.id}>
                {degree.shortcode}
              </option>
            ))}
          </select>
        </div>

        {/* Year Input (Number) */}
        <div className="mb-4">
          <label className="block font-medium">Year (Number)</label>
          <input
            type="text"
            name="year"
            value={cohort.year}
            onChange={handleChange}
            required
            placeholder="e.g., 2"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Cohort
        </button>
      </form>
    </div>
  );
};

export default CohortForm;

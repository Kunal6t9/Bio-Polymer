import { useState, useEffect } from "react";
import axios from "axios";

const SimulatorPage = () => {
  const [allPolymers, setAllPolymers] = useState([]);

  const [selectedPolymerId, setSelectedPolymerId] = useState("");
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [result, setResult] = useState(null);

  const environments = ["Ocean", "Landfill", "Industrial Compost", "Soil"];
  useEffect(() => {
    const fetchPolymers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/polymers");
        setAllPolymers(response.data);
      } catch (error) {
        console.error("Error fetching polymers:", error);
      }
    };
    fetchPolymers();
  }, []);

  const handleSimulate = () => {
    if (!selectedPolymerId || !selectedEnvironment) {
      alert("Please select both a material and an environment.");
      return;
    }

    const selectedPolymer = allPolymers.find(
      (p) => p._id === selectedPolymerId
    );

    const time =
      selectedPolymer.degradationTimes[selectedEnvironment] ||
      "Data not available";

    setResult({
      name: selectedPolymer.name,
      time: time,
      environment: selectedEnvironment,
    });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Degradation Simulator</h1>
        <p className="text-lg text-gray-600 mb-8">
          Select a material and an environment to see its estimated time to
          degrade.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label
            htmlFor="polymer-select"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            1. Choose a Material
          </label>
          <select
            id="polymer-select"
            value={selectedPolymerId}
            onChange={(e) => setSelectedPolymerId(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              -- Select a Polymer --
            </option>
            {allPolymers.map((polymer) => (
              <option key={polymer._id} value={polymer._id}>
                {polymer.name} ({polymer.abbreviation})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="env-select"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            2. Choose an Environment
          </label>
          <select
            id="env-select"
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              -- Select an Environment --
            </option>
            {environments.map((env) => (
              <option key={env} value={env}>
                {env}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSimulate}
          className="w-full bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition-colors duration-300"
        >
          Simulate
        </button>

        {result && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h2 className="text-2xl font-bold">{result.name}</h2>
            <p className="text-lg mt-2">
              in <span className="font-semibold">{result.environment}</span>,
              has an estimated degradation time of:
            </p>
            <p className="text-4xl font-extrabold text-green-700 mt-4">
              {result.time}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulatorPage;

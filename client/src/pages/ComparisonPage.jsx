import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ComparisonPage = () => {
  const [searchParams] = useSearchParams();
  const [polymers, setPolymers] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderPolymerImage = (polymer) => {
    const isBiodegradable = polymer.type === "Biodegradable";
    return (
      <div
        className={`w-20 h-16 rounded-lg mb-2 flex items-center justify-center text-white font-bold text-xs ${
          isBiodegradable
            ? "bg-gradient-to-br from-green-400 to-green-600"
            : "bg-gradient-to-br from-red-400 to-red-600"
        }`}
      >
        <div className="text-center">
          <div className="text-lg">{isBiodegradable ? "🌱" : "🏭"}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchPolymersForComparison = async () => {
      const idsParam = searchParams.get("ids");
      console.log("URL params:", idsParam);

      if (idsParam) {
        const ids = idsParam.split(",");
        console.log("Parsed IDs:", ids);

        try {
          console.log("Making API call to compare polymers...");
          const response = await axios.post(
            "http://localhost:5001/api/polymers/compare",
            { ids }
          );
          console.log("API response:", response.data);
          setPolymers(response.data);
        } catch (error) {
          console.error("Error fetching polymers for comparison:", error);
          console.error("Error details:", error.response?.data);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No IDs found in URL params");
        setLoading(false);
      }
    };

    fetchPolymersForComparison();
  }, [searchParams]);

  if (loading)
    return <div className="p-8 text-center">Loading comparison...</div>;
  if (polymers.length === 0)
    return (
      <div className="p-8 text-center">No polymers selected or found.</div>
    );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Polymer Comparison
      </h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
              {polymers.map((polymer) => (
                <th
                  key={polymer._id}
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex flex-col items-center">
                    {renderPolymerImage(polymer)}
                    <span>{polymer.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                Type
              </td>
              {polymers.map((polymer) => (
                <td key={polymer._id} className="px-6 py-4 whitespace-nowrap">
                  {polymer.type}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                Abbreviation
              </td>
              {polymers.map((polymer) => (
                <td key={polymer._id} className="px-6 py-4 whitespace-nowrap">
                  {polymer.abbreviation || "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                Common Uses
              </td>
              {polymers.map((polymer) => (
                <td
                  key={polymer._id}
                  className="px-6 py-4 text-sm text-gray-700"
                >
                  <ul className="list-disc list-inside">
                    {polymer.commonUses.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                Degradation Times
              </td>
              {polymers.map((polymer) => (
                <td
                  key={polymer._id}
                  className="px-6 py-4 text-sm text-gray-700"
                >
                  <ul className="list-disc list-inside">
                    {Object.entries(polymer.degradationTimes).map(
                      ([env, time]) => (
                        <li key={env}>
                          <strong>{env}:</strong> {time}
                        </li>
                      )
                    )}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                Notes
              </td>
              {polymers.map((polymer) => (
                <td
                  key={polymer._id}
                  className="px-6 py-4 text-sm text-gray-700"
                >
                  {polymer.notes}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonPage;

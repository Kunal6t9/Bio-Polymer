import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PolymerDetailPage = () => {
  const { id } = useParams();
  const [polymer, setPolymer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolymer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/polymers/${id}`
        );
        setPolymer(response.data);
      } catch (error) {
        console.error("Error fetching polymer details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolymer();
  }, [id]);

  const renderImage = () => {
    const isBiodegradable = polymer?.type === "Biodegradable";
    return (
      <div
        className={`w-full h-64 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xl ${
          isBiodegradable
            ? "bg-gradient-to-br from-green-400 to-green-600"
            : "bg-gradient-to-br from-red-400 to-red-600"
        }`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">{isBiodegradable ? "🌱" : "🏭"}</div>
          <div className="text-lg opacity-90">
            {isBiodegradable ? "ECO-FRIENDLY MATERIAL" : "INDUSTRIAL MATERIAL"}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!polymer)
    return <div className="p-8 text-center">Polymer not found.</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold mb-4">{polymer.name}</h1>
      <p className="text-xl text-gray-500 mb-8">{polymer.abbreviation}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>{renderImage()}</div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold border-b pb-2">Details</h2>
          <p>
            <strong className="font-semibold">Type:</strong> {polymer.type}
          </p>
          <p>
            <strong className="font-semibold">Degradation Time:</strong>{" "}
            {polymer.degradationTime}
          </p>
          <div>
            <strong className="font-semibold">Common Uses:</strong>
            <ul className="list-disc list-inside mt-2">
              {polymer.commonUses.map((use) => (
                <li key={use}>{use}</li>
              ))}
            </ul>
          </div>
          <p className="mt-4 pt-4 border-t">
            <strong className="font-semibold">Notes:</strong> {polymer.notes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolymerDetailPage;

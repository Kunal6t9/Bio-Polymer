import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from '../config/api.js';

const PolymerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [polymer, setPolymer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolymer = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/polymers/${id}`
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
        className={`w-full h-64 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-xl relative overflow-hidden ${
          isBiodegradable
            ? "bg-gradient-to-br from-secondary-400 via-secondary-500 to-secondary-600"
            : "bg-gradient-to-br from-red-400 via-red-500 to-red-600"
        }`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="text-7xl mb-4">{isBiodegradable ? "🌱" : "🏭"}</div>
          <div className="text-lg opacity-90 font-semibold tracking-wide">
            {isBiodegradable ? "ECO-FRIENDLY MATERIAL" : "INDUSTRIAL MATERIAL"}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading polymer details...</p>
        </div>
      </div>
    );
  }

  if (!polymer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Polymer Not Found</h2>
          <p className="text-gray-600 mb-6">The polymer you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/explorer')} className="btn-primary">
            Back to Explorer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/explorer')}
          className="mb-6 flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Explorer
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">{polymer.name}</h1>
          <div className="flex items-center gap-4">
            <p className="text-2xl text-gray-500">{polymer.abbreviation}</p>
            <span className={polymer.type === 'Biodegradable' ? 'badge-biodegradable text-lg' : 'badge-non-biodegradable text-lg'}>
              {polymer.type}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <div>{renderImage()}</div>

          {/* Basic Details */}
          <div className="card p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-500">Type</p>
                <p className="text-lg text-gray-900">{polymer.type}</p>
              </div>
              {polymer.chemicalFormula && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">Chemical Formula</p>
                  <p className="text-lg text-gray-900 font-mono">{polymer.chemicalFormula}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-500">Common Uses</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {polymer.commonUses.map((use, idx) => (
                    <li key={idx} className="text-gray-900">{use}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Degradation Times */}
        <div className="card p-6 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">
            Degradation Times by Environment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(polymer.degradationTimes || {}).map(([env, time]) => (
              <div key={env} className="bg-gradient-to-br from-primary-50 to-accent-50 p-4 rounded-lg border border-primary-200">
                <p className="text-sm font-semibold text-primary-700 mb-1">{env}</p>
                <p className="text-2xl font-bold text-gray-900">{time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Degradation Coefficients */}
        {polymer.degradationCoefficients && (
          <div className="card p-6 shadow-xl mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">
              Degradation Coefficients (for Simulation)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Base Rate</p>
                <p className="text-xl font-bold text-gray-900">{polymer.degradationCoefficients.baseRate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Temperature Factor</p>
                <p className="text-xl font-bold text-gray-900">{polymer.degradationCoefficients.temperatureFactor}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">pH Factor</p>
                <p className="text-xl font-bold text-gray-900">{polymer.degradationCoefficients.phFactor}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Moisture Factor</p>
                <p className="text-xl font-bold text-gray-900">{polymer.degradationCoefficients.moistureFactor}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              These coefficients are used in the parameter-driven simulator to calculate adjusted degradation times.
            </p>
          </div>
        )}

        {/* Notes */}
        {polymer.notes && (
          <div className="card p-6 shadow-xl mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">
              Additional Notes
            </h2>
            <p className="text-gray-700 leading-relaxed">{polymer.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(`/simulator`)}
            className="btn-primary"
          >
            🧪 Simulate Degradation
          </button>
          <button
            onClick={() => navigate('/explorer')}
            className="btn-outline"
          >
            Browse More Polymers
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolymerDetailPage;

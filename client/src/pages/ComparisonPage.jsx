import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from '../config/api.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const ComparisonPage = () => {
  const [searchParams] = useSearchParams();
  const [polymers, setPolymers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCharts, setShowCharts] = useState(true);
  const navigate = useNavigate();

  const renderPolymerImage = (polymer) => {
    const isBiodegradable = polymer.type === "Biodegradable";
    return (
      <div
        className={`w-24 h-20 rounded-lg mb-3 flex items-center justify-center text-white font-bold text-xs shadow-lg ${
          isBiodegradable
            ? "bg-gradient-to-br from-secondary-400 to-secondary-600"
            : "bg-gradient-to-br from-red-400 to-red-600"
        }`}
      >
        <div className="text-center">
          <div className="text-2xl">{isBiodegradable ? "🌱" : "🏭"}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchPolymersForComparison = async () => {
      const idsParam = searchParams.get("ids");

      if (idsParam) {
        const ids = idsParam.split(",");

        try {
          const response = await axios.post(
            `${API_URL}/api/polymers/compare`,
            { ids }
          );
          setPolymers(response.data);
        } catch (error) {
          console.error("Error fetching polymers for comparison:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchPolymersForComparison();
  }, [searchParams]);

  // Prepare chart data
  const getDegradationChartData = () => {
    if (polymers.length === 0) return null;

    const environments = ['Ocean', 'Landfill', 'Industrial Compost', 'Soil'];
    const datasets = polymers.map((polymer, index) => {
      const colors = [
        'rgba(20, 184, 166, 0.8)', // primary
        'rgba(59, 130, 246, 0.8)', // accent
        'rgba(34, 197, 94, 0.8)',  // secondary
        'rgba(249, 115, 22, 0.8)', // orange
      ];

      return {
        label: polymer.name,
        data: environments.map(env => {
          const time = polymer.degradationTimes[env];
          if (!time) return 0;
          // Extract numeric value (e.g., "450 years" -> 450)
          const match = time.match(/(\d+)/);
          return match ? parseInt(match[1]) : 0;
        }),
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length].replace('0.8', '1'),
        borderWidth: 2,
      };
    });

    return {
      labels: environments,
      datasets: datasets
    };
  };

  const getCoefficientsChartData = () => {
    if (polymers.length === 0 || !polymers[0].degradationCoefficients) return null;

    const labels = ['Base Rate', 'Temperature Factor', 'pH Factor', 'Moisture Factor'];
    const datasets = polymers.map((polymer, index) => {
      const colors = [
        'rgba(20, 184, 166, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(34, 197, 94, 0.6)',
        'rgba(249, 115, 22, 0.6)',
      ];

      const coeffs = polymer.degradationCoefficients || {};
      
      return {
        label: polymer.name,
        data: [
          coeffs.baseRate || 0,
          coeffs.temperatureFactor || 0,
          coeffs.phFactor || 0,
          coeffs.moistureFactor || 0
        ],
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length].replace('0.6', '1'),
        borderWidth: 2,
      };
    });

    return {
      labels: labels,
      datasets: datasets
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (polymers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">No Polymers Selected</h2>
          <p className="text-gray-600 mb-6">Please select at least 2 polymers from the explorer to compare</p>
          <button
            onClick={() => navigate('/explorer')}
            className="btn-primary"
          >
            Go to Explorer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Polymer Comparison</h1>
          <p className="text-gray-600 text-lg">Side-by-side analysis of selected polymers</p>
        </div>

        {/* Toggle Charts/Table */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowCharts(true)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              showCharts
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📊 Charts View
          </button>
          <button
            onClick={() => setShowCharts(false)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              !showCharts
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📋 Table View
          </button>
        </div>

        {/* Charts View */}
        {showCharts && getDegradationChartData() && (
          <div className="space-y-8 mb-8">
            {/* Degradation Times Chart */}
            <div className="card p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Degradation Times by Environment
              </h2>
              <div className="h-96">
                <Bar data={getDegradationChartData()} options={chartOptions} />
              </div>
            </div>

            {/* Coefficients Radar Chart */}
            {getCoefficientsChartData() && (
              <div className="card p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Degradation Coefficients Comparison
                </h2>
                <div className="h-96">
                  <Radar data={getCoefficientsChartData()} options={radarOptions} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comparison Table */}
        {!showCharts && (
          <div className="card overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-primary-500 to-accent-500">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Property
                  </th>
                  {polymers.map((polymer) => (
                    <th
                      key={polymer._id}
                      className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider"
                    >
                      <div className="flex flex-col items-center">
                        {renderPolymerImage(polymer)}
                        <span className="text-base">{polymer.name}</span>
                        <span className="text-xs font-normal opacity-90 mt-1">
                          {polymer.abbreviation}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 bg-gray-50">
                    Type
                  </td>
                  {polymers.map((polymer) => (
                    <td key={polymer._id} className="px-6 py-4 text-center">
                      <span className={polymer.type === 'Biodegradable' ? 'badge-biodegradable' : 'badge-non-biodegradable'}>
                        {polymer.type}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 bg-gray-50">
                    Abbreviation
                  </td>
                  {polymers.map((polymer) => (
                    <td key={polymer._id} className="px-6 py-4 text-center text-gray-700 font-medium">
                      {polymer.abbreviation || "N/A"}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 bg-gray-50">
                    Common Uses
                  </td>
                  {polymers.map((polymer) => (
                    <td
                      key={polymer._id}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      <ul className="list-disc list-inside space-y-1 text-left">
                        {polymer.commonUses.map((use, idx) => (
                          <li key={idx}>{use}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 bg-gray-50">
                    Degradation Times
                  </td>
                  {polymers.map((polymer) => (
                    <td
                      key={polymer._id}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      <ul className="space-y-2 text-left">
                        {Object.entries(polymer.degradationTimes).map(
                          ([env, time]) => (
                            <li key={env} className="flex items-start">
                              <span className="font-semibold text-primary-600 mr-2">{env}:</span>
                              <span>{time}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 bg-gray-50">
                    Notes
                  </td>
                  {polymers.map((polymer) => (
                    <td
                      key={polymer._id}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      {polymer.notes || "No additional notes"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate('/explorer')}
            className="btn-outline"
          >
            Back to Explorer
          </button>
          <button
            onClick={() => window.print()}
            className="btn-secondary"
          >
            Print Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;

import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from '../config/api.js';

const SimulatorPage = () => {
  const [allPolymers, setAllPolymers] = useState([]);
  const [selectedPolymerId, setSelectedPolymerId] = useState("");
  const [selectedEnvironment, setSelectedEnvironment] = useState("Ocean");
  
  // Environmental parameters
  const [temperature, setTemperature] = useState(25); // Celsius
  const [ph, setPh] = useState(7); // pH level
  const [moisture, setMoisture] = useState(50); // Percentage
  
  const [result, setResult] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const environments = [
    { name: "Ocean", icon: "🌊", baseTemp: 15, basePh: 8.1, baseMoisture: 100 },
    { name: "Landfill", icon: "🗑️", baseTemp: 30, basePh: 6.5, baseMoisture: 40 },
    { name: "Industrial Compost", icon: "♻️", baseTemp: 55, basePh: 7.5, baseMoisture: 60 },
    { name: "Soil", icon: "🌱", baseTemp: 20, basePh: 6.8, baseMoisture: 30 }
  ];

  useEffect(() => {
    const fetchPolymers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/polymers`);
        setAllPolymers(response.data);
      } catch (error) {
        console.error("Error fetching polymers:", error);
      }
    };
    fetchPolymers();
  }, []);

  // Update parameters when environment changes
  useEffect(() => {
    const env = environments.find(e => e.name === selectedEnvironment);
    if (env) {
      setTemperature(env.baseTemp);
      setPh(env.basePh);
      setMoisture(env.baseMoisture);
    }
  }, [selectedEnvironment]);

  const calculateDegradation = () => {
    if (!selectedPolymerId || !selectedEnvironment) {
      alert("Please select both a polymer and an environment.");
      return;
    }

    setCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const selectedPolymer = allPolymers.find(p => p._id === selectedPolymerId);
      
      // Get base degradation time
      const baseTime = selectedPolymer.degradationTimes[selectedEnvironment] || "Unknown";
      
      // Extract numeric value from base time (e.g., "450 years" -> 450)
      const baseYears = parseFloat(baseTime) || 100;
      
      // Get degradation coefficients (with defaults)
      const coeffs = selectedPolymer.degradationCoefficients || {
        baseRate: 1.0,
        temperatureFactor: 0.05,
        phFactor: 0.03,
        moistureFactor: 0.04
      };
      
      // Calculate environmental impact multipliers
      const tempMultiplier = 1 + (temperature - 25) * coeffs.temperatureFactor;
      const phMultiplier = 1 - Math.abs(ph - 7) * coeffs.phFactor;
      const moistureMultiplier = 1 + (moisture - 50) * coeffs.moistureFactor / 100;
      
      // Calculate adjusted degradation time
      const adjustedYears = baseYears / (tempMultiplier * phMultiplier * moistureMultiplier * coeffs.baseRate);
      
      // Calculate percentage change
      const percentageChange = ((adjustedYears - baseYears) / baseYears * 100);
      
      setResult({
        name: selectedPolymer.name,
        type: selectedPolymer.type,
        environment: selectedEnvironment,
        baseTime: baseTime,
        baseYears: baseYears,
        adjustedYears: Math.max(0.1, adjustedYears).toFixed(1),
        percentageChange: percentageChange.toFixed(1),
        parameters: {
          temperature,
          ph,
          moisture
        },
        multipliers: {
          temperature: tempMultiplier.toFixed(2),
          ph: phMultiplier.toFixed(2),
          moisture: moistureMultiplier.toFixed(2)
        }
      });
      
      setCalculating(false);
    }, 800);
  };

  const handleReset = () => {
    setSelectedPolymerId("");
    setSelectedEnvironment("Ocean");
    setTemperature(25);
    setPh(7);
    setMoisture(50);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-accent-50 p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl shadow-xl mb-4">
            <div className="text-5xl">⚗️</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Parameter-Driven Degradation Simulator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Adjust environmental parameters to see how they affect polymer degradation rates.
            Real-time calculations based on temperature, pH, and moisture levels.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Polymer Selection */}
            <div className="card p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">1</span>
                Select Polymer
              </h2>
              <select
                value={selectedPolymerId}
                onChange={(e) => setSelectedPolymerId(e.target.value)}
                className="input-field"
              >
                <option value="">-- Choose a Polymer --</option>
                {allPolymers.map((polymer) => (
                  <option key={polymer._id} value={polymer._id}>
                    {polymer.name} ({polymer.abbreviation}) - {polymer.type}
                  </option>
                ))}
              </select>
            </div>

            {/* Environment Selection */}
            <div className="card p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-accent-100 text-accent-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">2</span>
                Select Environment
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {environments.map((env) => (
                  <button
                    key={env.name}
                    onClick={() => setSelectedEnvironment(env.name)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedEnvironment === env.name
                        ? 'border-primary-500 bg-primary-50 shadow-lg'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{env.icon}</div>
                    <div className="font-semibold text-gray-900">{env.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Environmental Parameters */}
            <div className="card p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-secondary-100 text-secondary-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">3</span>
                Adjust Parameters
              </h2>
              
              <div className="space-y-6">
                {/* Temperature */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold text-gray-700 flex items-center">
                      <span className="text-2xl mr-2">🌡️</span>
                      Temperature
                    </label>
                    <span className="text-2xl font-bold text-primary-600">{temperature}°C</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="80"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>-10°C</span>
                    <span>80°C</span>
                  </div>
                </div>

                {/* pH Level */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold text-gray-700 flex items-center">
                      <span className="text-2xl mr-2">💧</span>
                      pH Level
                    </label>
                    <span className="text-2xl font-bold text-accent-600">{ph.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="14"
                    step="0.1"
                    value={ph}
                    onChange={(e) => setPh(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 (Acidic)</span>
                    <span>7 (Neutral)</span>
                    <span>14 (Basic)</span>
                  </div>
                </div>

                {/* Moisture */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold text-gray-700 flex items-center">
                      <span className="text-2xl mr-2">💨</span>
                      Moisture Level
                    </label>
                    <span className="text-2xl font-bold text-secondary-600">{moisture}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={moisture}
                    onChange={(e) => setMoisture(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0% (Dry)</span>
                    <span>100% (Saturated)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={calculateDegradation}
                disabled={!selectedPolymerId || calculating}
                className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  selectedPolymerId && !calculating
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {calculating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  '🧪 Run Simulation'
                )}
              </button>
              {result && (
                <button onClick={handleReset} className="px-8 py-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all">
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-1">
            {result ? (
              <div className="card p-6 shadow-2xl sticky top-8">
                <div className="text-center mb-6">
                  <div className="inline-block p-4 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full mb-4">
                    <div className="text-4xl">
                      {result.type === "Biodegradable" ? "🌱" : "🏭"}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{result.name}</h3>
                  <p className="text-gray-600">in {result.environment}</p>
                </div>

                <div className="space-y-4">
                  {/* Base Time */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Base Degradation Time</p>
                    <p className="text-2xl font-bold text-gray-900">{result.baseTime}</p>
                  </div>

                  {/* Adjusted Time */}
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-4 border-2 border-primary-200">
                    <p className="text-sm text-primary-700 font-semibold mb-1">Adjusted Time (with parameters)</p>
                    <p className="text-3xl font-bold text-primary-600">{result.adjustedYears} years</p>
                    <p className={`text-sm font-semibold mt-2 ${
                      result.percentageChange > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {result.percentageChange > 0 ? '↑' : '↓'} {Math.abs(result.percentageChange)}% 
                      {result.percentageChange > 0 ? ' slower' : ' faster'}
                    </p>
                  </div>

                  {/* Parameters Used */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Parameters Used:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">🌡️ Temperature:</span>
                        <span className="font-semibold">{result.parameters.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">💧 pH Level:</span>
                        <span className="font-semibold">{result.parameters.ph}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">💨 Moisture:</span>
                        <span className="font-semibold">{result.parameters.moisture}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Multipliers */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Impact Multipliers:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temperature:</span>
                        <span className="font-mono font-semibold">{result.multipliers.temperature}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">pH:</span>
                        <span className="font-mono font-semibold">{result.multipliers.ph}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Moisture:</span>
                        <span className="font-mono font-semibold">{result.multipliers.moisture}x</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-xs text-blue-800">
                    <span className="font-semibold">Note:</span> Results are estimates based on environmental factors and polymer properties. Actual degradation may vary.
                  </p>
                </div>
              </div>
            ) : (
              <div className="card p-8 shadow-xl text-center sticky top-8">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Results will appear here</h3>
                <p className="text-gray-600">
                  Select a polymer, choose an environment, adjust parameters, and run the simulation to see results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;

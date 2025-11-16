import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PolymerCard from '../components/PolymerCard';

const ExplorerPage = () => {
  const [polymers, setPolymers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPolymers, setSelectedPolymers] = useState([]);
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const fetchPolymers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/polymers');
        setPolymers(response.data);
      } catch (error) {
        console.error('Error fetching polymers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolymers();
  }, []);

  const filteredPolymers = polymers.filter(polymer => {
    const matchesSearch = polymer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || polymer.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handlePolymerSelect = (polymerId) => {
    setSelectedPolymers(prev => 
      prev.includes(polymerId) 
        ? prev.filter(id => id !== polymerId)
        : [...prev, polymerId]
    );
  };

  const handleCompare = () => {
    if (selectedPolymers.length >= 2) {
      navigate(`/comparison?ids=${selectedPolymers.join(',')}`);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center">Polymer Explorer</h1>
      <p className="text-center text-gray-600 mb-8">Search, filter, and learn about different materials.</p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setFilterType('All')} className={`px-4 py-2 rounded-lg ${filterType === 'All' ? 'bg-green-700 text-white' : 'bg-white'}`}>All</button>
          <button onClick={() => setFilterType('Biodegradable')} className={`px-4 py-2 rounded-lg ${filterType === 'Biodegradable' ? 'bg-green-700 text-white' : 'bg-white'}`}>Biodegradable</button>
          <button onClick={() => setFilterType('Non-Biodegradable')} className={`px-4 py-2 rounded-lg ${filterType === 'Non-Biodegradable' ? 'bg-green-700 text-white' : 'bg-white'}`}>Non-Biodegradable</button>
        </div>
      </div>

      {selectedPolymers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <span className="text-blue-800">
            {selectedPolymers.length} polymer{selectedPolymers.length !== 1 ? 's' : ''} selected for comparison
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedPolymers([])}
              className="px-4 py-2 text-blue-600 hover:bg-blue-100 rounded-lg"
            >
              Clear
            </button>
            <button 
              onClick={handleCompare}
              disabled={selectedPolymers.length < 2}
              className={`px-6 py-2 rounded-lg font-medium ${
                selectedPolymers.length >= 2 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Compare ({selectedPolymers.length})
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPolymers.map(polymer => (
          <PolymerCard 
            key={polymer._id} 
            polymer={polymer}
            isSelected={selectedPolymers.includes(polymer._id)}
            onSelect={handlePolymerSelect}
            showSelection={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ExplorerPage;
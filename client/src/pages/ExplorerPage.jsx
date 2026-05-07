import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PolymerCard from '../components/PolymerCard';
import API_URL from '../config/api.js';

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
        const response = await axios.get(`${API_URL}/api/polymers`);
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading polymers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 p-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Polymer Explorer</h1>
          <p className="text-gray-600 text-lg">Search, filter, and discover different polymer materials</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by polymer name..."
                  className="input-field pl-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="absolute left-4 top-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setFilterType('All')} 
                className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                  filterType === 'All' 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Types
              </button>
              <button 
                onClick={() => setFilterType('Biodegradable')} 
                className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                  filterType === 'Biodegradable' 
                    ? 'bg-secondary-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Biodegradable
              </button>
              <button 
                onClick={() => setFilterType('Non-Biodegradable')} 
                className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                  filterType === 'Non-Biodegradable' 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Non-Biodegradable
              </button>
            </div>
          </div>
        </div>

        {/* Selection Bar */}
        {selectedPolymers.length > 0 && (
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl p-5 mb-6 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="font-semibold text-lg">
                {selectedPolymers.length} polymer{selectedPolymers.length !== 1 ? 's' : ''} selected for comparison
              </span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedPolymers([])}
                className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-all"
              >
                Clear Selection
              </button>
              <button 
                onClick={handleCompare}
                disabled={selectedPolymers.length < 2}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedPolymers.length >= 2 
                    ? 'bg-white text-primary-700 hover:bg-gray-100 shadow-lg' 
                    : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
              >
                Compare Now ({selectedPolymers.length})
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600 font-medium">
            Showing <span className="text-primary-600 font-bold">{filteredPolymers.length}</span> of {polymers.length} polymers
          </p>
        </div>

        {/* Polymer Grid */}
        {filteredPolymers.length > 0 ? (
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No polymers found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorerPage;
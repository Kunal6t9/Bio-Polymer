import { Link } from 'react-router-dom';

const PolymerCard = ({ polymer, isSelected, onSelect, showSelection = false }) => {
  const handleCheckboxClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(polymer._id);
  };

  const renderImage = () => {
    const isBiodegradable = polymer.type === 'Biodegradable';
    return (
      <div className={`w-full h-48 flex items-center justify-center text-white font-bold text-lg ${
        isBiodegradable 
          ? 'bg-gradient-to-br from-green-400 to-green-600' 
          : 'bg-gradient-to-br from-red-400 to-red-600'
      }`}>
        <div className="text-center">
          <div className="text-4xl mb-2">
            {isBiodegradable ? '🌱' : '🏭'}
          </div>
          <div className="text-sm opacity-90">
            {isBiodegradable ? 'ECO-FRIENDLY' : 'INDUSTRIAL'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      {showSelection && (
        <div className="absolute top-3 right-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxClick}
            className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      )}
      
      <Link to={`/polymer/${polymer._id}`} className="block">
        {renderImage()}
        <div className="p-4">
          <h3 className="text-xl font-bold">{polymer.name}</h3>
          <p className="text-gray-600">{polymer.abbreviation}</p>
          <span 
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
              polymer.type === 'Biodegradable' 
              ? 'bg-green-200 text-green-800' 
              : 'bg-red-200 text-red-800'
            }`}
          >
            {polymer.type}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PolymerCard;
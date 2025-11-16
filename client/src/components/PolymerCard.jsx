import { Link } from 'react-router-dom';

const PolymerCard = ({ polymer, isSelected, onSelect, showSelection = false }) => {
  const handleCheckboxClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(polymer._id);
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
        <img 
          src={polymer.imageUrl || 'https://via.placeholder.com/400x200'} 
          alt={polymer.name} 
          className="w-full h-48 object-cover"
        />
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
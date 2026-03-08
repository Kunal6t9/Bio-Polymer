import { Link } from 'react-router-dom';

const PolymerCard = ({ polymer, isSelected, onSelect, showSelection = false }) => {
  const handleCheckboxClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(polymer._id);
  };

  const isBiodegradable = polymer.type === 'Biodegradable';

  const renderImage = () => {
    return (
      <div className={`w-full h-48 flex items-center justify-center text-white font-bold text-lg relative overflow-hidden ${
        isBiodegradable 
          ? 'bg-gradient-to-br from-secondary-400 via-secondary-500 to-secondary-600' 
          : 'bg-gradient-to-br from-red-400 via-red-500 to-red-600'
      }`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="text-5xl mb-2">
            {isBiodegradable ? '🌱' : '🏭'}
          </div>
          <div className="text-sm opacity-90 font-semibold tracking-wide">
            {isBiodegradable ? 'ECO-FRIENDLY' : 'INDUSTRIAL'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative card overflow-hidden transition-all duration-300 ${
      isSelected ? 'ring-4 ring-primary-500 shadow-2xl' : ''
    }`}>
      {showSelection && (
        <div className="absolute top-3 right-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxClick}
            className="w-6 h-6 text-primary-600 bg-white border-2 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
          />
        </div>
      )}
      
      <Link to={`/polymer/${polymer._id}`} className="block group">
        <div className="overflow-hidden">
          {renderImage()}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {polymer.name}
          </h3>
          <p className="text-gray-500 text-sm font-medium mt-1">{polymer.abbreviation}</p>
          <span className={isBiodegradable ? 'badge-biodegradable mt-3' : 'badge-non-biodegradable mt-3'}>
            {polymer.type}
          </span>
          {polymer.commonUses && polymer.commonUses.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-1">Common Uses:</p>
              <p className="text-sm text-gray-700 line-clamp-2">{polymer.commonUses.slice(0, 2).join(', ')}</p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PolymerCard;
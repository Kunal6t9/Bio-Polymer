import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">BioPolymer Hub</Link>
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-green-300">Home</Link>
            <Link to="/explorer" className="hover:text-green-300">Explorer</Link>
            <Link to="/simulator" className="hover:text-green-300">Simulator</Link>
            <Link to="/login" className="hover:text-green-300">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
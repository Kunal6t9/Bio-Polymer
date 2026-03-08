import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-3xl transform group-hover:rotate-12 transition-transform">🧬</div>
            <div>
              <div className="text-2xl font-bold tracking-tight">PolyVision</div>
              <div className="text-xs text-primary-100 font-light">Polymer Information Portal</div>
            </div>
          </Link>
          <div className="flex items-center space-x-8">
            <Link to="/" className="hover:text-primary-200 transition-colors font-medium">Home</Link>
            <Link to="/explorer" className="hover:text-primary-200 transition-colors font-medium">Explorer</Link>
            <Link to="/simulator" className="hover:text-primary-200 transition-colors font-medium">Simulator</Link>
            <Link to="/comparison" className="hover:text-primary-200 transition-colors font-medium">Compare</Link>
            <Link to="/learn" className="hover:text-primary-200 transition-colors font-medium">Learn</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-primary-200 capitalize">{user.role}</div>
                  </div>
                </div>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-all font-semibold">
                    Dashboard
                  </Link>
                )}
                {user.role === 'contributor' && (
                  <Link to="/contributor/dashboard" className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-all font-semibold">
                    My Submissions
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-white text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all font-semibold">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
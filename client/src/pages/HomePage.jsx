import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🔬",
      title: "Explore Polymers",
      description:
        "Browse our comprehensive database of biopolymers with detailed properties and characteristics.",
      action: () => navigate("/explorer"),
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: "⚗️",
      title: "Run Simulations",
      description:
        "Simulate polymer degradation using parameter-driven models with environmental variables.",
      action: () => navigate("/simulator"),
      color: "from-accent-500 to-accent-600"
    },
    {
      icon: "📊",
      title: "Compare Materials",
      description:
        "Side-by-side comparison of different polymers to find the perfect match for your needs.",
      action: () => navigate("/comparison"),
      color: "from-secondary-500 to-secondary-600"
    },
  ];

  const stats = [
    { value: "150+", label: "Biopolymers", icon: "🧪" },
    { value: "1000+", label: "Simulations", icon: "📈" },
    { value: "15+", label: "Material Types", icon: "🌿" },
    { value: "24/7", label: "Access", icon: "🌐" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-accent-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
              🎓 Academic Research Platform
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              PolyVision
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            An integrated polymer information portal and parameter-driven degradation simulator. 
            Explore, analyze, and understand polymer behavior in various environmental conditions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/explorer")}
              className="btn-primary"
            >
              Start Exploring
            </button>
            <button
              onClick={() => navigate("/simulator")}
              className="btn-outline"
            >
              Try Simulator
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card p-6 text-center transform hover:scale-105 transition-all"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Platform Features
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive tools for polymer research, education, and environmental impact analysis
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer group"
                onClick={feature.action}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <span className="text-primary-600 font-semibold group-hover:underline flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl p-12 shadow-xl mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About PolyVision</h2>
            <p className="text-lg mb-6 opacity-95 leading-relaxed">
              PolyVision is a cutting-edge MERN stack application designed for researchers, 
              students, and industry professionals. Our parameter-driven degradation simulator 
              allows you to visualize how environmental factors like temperature, pH, and moisture 
              affect polymer breakdown over time.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg font-medium">
                🌱 Sustainable Materials
              </div>
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg font-medium">
                🔬 Research-Backed Data
              </div>
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg font-medium">
                💡 Interactive Simulation
              </div>
            </div>
          </div>
        </div>

        {/* Admin CTA */}
        <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-8 border-2 border-accent-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🔐
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Administrator Access
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Manage the polymer database, review contributor submissions, and configure system settings. 
              Login with your credentials to access the admin dashboard.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

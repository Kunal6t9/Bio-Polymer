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
    },
    {
      icon: "⚗️",
      title: "Run Simulations",
      description:
        "Simulate polymer behavior and properties using advanced computational models.",
      action: () => navigate("/simulator"),
    },
    {
      icon: "📊",
      title: "Compare Materials",
      description:
        "Side-by-side comparison of different polymers to find the perfect match for your needs.",
      action: () => navigate("/comparison"),
    },
  ];

  const stats = [
    { value: "150+", label: "Biopolymers" },
    { value: "1000+", label: "Simulations Run" },
    { value: "15+", label: "Material Types" },
    { value: "24/7", label: "Access" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to the{" "}
            <span className="text-green-600">BioPolymer Hub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your comprehensive platform for exploring, analyzing, and simulating
            biopolymer properties. Discover sustainable materials for a better
            future.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/explorer")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Start Exploring
            </button>
            <button
              onClick={() => navigate("/simulator")}
              className="bg-white hover:bg-gray-50 text-green-600 px-8 py-3 rounded-lg font-semibold border-2 border-green-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Try Simulator
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-all hover:shadow-xl"
            >
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What You Can Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
                onClick={feature.action}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <span className="text-green-600 font-semibold hover:underline">
                  Learn more →
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-2xl p-12 shadow-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About BioPolymer Hub</h2>
            <p className="text-lg mb-6 opacity-90">
              BioPolymer Hub is a cutting-edge platform designed for
              researchers, students, and industry professionals working with
              sustainable biopolymers. Our mission is to accelerate the adoption
              of eco-friendly materials through accessible data and powerful
              simulation tools.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                🌱 Sustainable Materials
              </div>
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                🔬 Research-Backed Data
              </div>
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                💡 Innovation Focused
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mt-16 border border-blue-200">
          <div className="text-center">
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Are you an Admin?
            </h2>
            <p className="text-gray-600 mb-6">
              Access advanced features, manage the polymer database, and
              configure system settings. Please login to continue with
              administrative privileges.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

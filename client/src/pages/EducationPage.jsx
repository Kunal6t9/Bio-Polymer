import { useNavigate } from 'react-router-dom';

const EducationPage = () => {
  const navigate = useNavigate();

  const topics = [
    {
      icon: "🧬",
      title: "What are Polymers?",
      content: "Polymers are large molecules composed of repeating structural units called monomers, connected by covalent chemical bonds. They can be natural (like proteins, DNA, cellulose) or synthetic (like plastics, nylon, polyester)."
    },
    {
      icon: "🌱",
      title: "Biodegradable Polymers",
      content: "Biodegradable polymers can be broken down by microorganisms into natural substances like water, carbon dioxide, and biomass. Examples include PLA (Polylactic Acid), PHA (Polyhydroxyalkanoates), and starch-based polymers. These materials offer eco-friendly alternatives to traditional plastics."
    },
    {
      icon: "🏭",
      title: "Non-Biodegradable Polymers",
      content: "Non-biodegradable polymers resist natural decomposition and can persist in the environment for hundreds of years. Common examples include PET, HDPE, PVC, and polystyrene. While durable and versatile, they contribute significantly to environmental pollution."
    },
    {
      icon: "🌍",
      title: "Environmental Impact",
      content: "Plastic pollution affects ecosystems worldwide. Over 8 million tons of plastic enter oceans annually, harming marine life and entering food chains as microplastics. Biodegradable alternatives help reduce this impact, but proper disposal and composting infrastructure are essential."
    },
    {
      icon: "⚗️",
      title: "Degradation Process",
      content: "Polymer degradation occurs through various mechanisms: hydrolysis (water-based), oxidation (oxygen exposure), photodegradation (UV light), and biodegradation (microbial action). Environmental factors like temperature, pH, and moisture significantly affect degradation rates."
    },
    {
      icon: "🔬",
      title: "How Our Simulator Works",
      content: "Our parameter-driven simulator uses mathematical models to estimate degradation times based on environmental conditions. It calculates impact multipliers for temperature, pH, and moisture, then adjusts base degradation times accordingly. While estimates, these calculations help visualize how environmental factors influence polymer breakdown."
    }
  ];

  const factors = [
    {
      icon: "🌡️",
      name: "Temperature",
      description: "Higher temperatures generally accelerate degradation by increasing molecular activity and microbial metabolism.",
      impact: "Each 10°C increase can double degradation rate"
    },
    {
      icon: "💧",
      name: "pH Level",
      description: "Acidic or basic conditions can break chemical bonds. Neutral pH (7) is often optimal for microbial activity.",
      impact: "Extreme pH values slow degradation"
    },
    {
      icon: "💨",
      name: "Moisture",
      description: "Water is essential for hydrolysis and microbial activity. Higher moisture levels typically speed up biodegradation.",
      impact: "Dry conditions can halt degradation"
    },
    {
      icon: "🦠",
      name: "Microorganisms",
      description: "Bacteria and fungi produce enzymes that break down polymer chains into smaller molecules.",
      impact: "Microbial diversity increases degradation"
    }
  ];

  const polymerTypes = [
    {
      name: "PLA (Polylactic Acid)",
      type: "Biodegradable",
      source: "Corn starch, sugarcane",
      uses: "Food packaging, 3D printing, medical implants",
      degradation: "6 months - 2 years in industrial compost"
    },
    {
      name: "PET (Polyethylene Terephthalate)",
      type: "Non-Biodegradable",
      source: "Petroleum",
      uses: "Beverage bottles, food containers, textiles",
      degradation: "450+ years in natural environment"
    },
    {
      name: "PHA (Polyhydroxyalkanoates)",
      type: "Biodegradable",
      source: "Bacterial fermentation",
      uses: "Medical devices, packaging, agriculture",
      degradation: "3-6 months in marine environment"
    },
    {
      name: "HDPE (High-Density Polyethylene)",
      type: "Non-Biodegradable",
      source: "Petroleum",
      uses: "Milk jugs, detergent bottles, pipes",
      degradation: "1000+ years in landfills"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-accent-50 p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl shadow-xl mb-4">
            <div className="text-5xl">📚</div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Learn About Polymers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding polymer science, degradation mechanisms, and environmental impact
          </p>
        </div>

        {/* Main Topics */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {topics.map((topic, index) => (
            <div key={index} className="card p-6 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{topic.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{topic.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{topic.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Environmental Factors */}
        <div className="card p-8 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Factors Affecting Degradation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {factors.map((factor, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 rounded-xl border border-primary-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl">{factor.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900">{factor.name}</h4>
                </div>
                <p className="text-gray-700 mb-2">{factor.description}</p>
                <p className="text-sm font-semibold text-primary-600">
                  💡 {factor.impact}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Polymer Types */}
        <div className="card p-8 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Common Polymer Types
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-primary-500 to-accent-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Polymer</th>
                  <th className="px-6 py-3 text-left font-semibold">Type</th>
                  <th className="px-6 py-3 text-left font-semibold">Source</th>
                  <th className="px-6 py-3 text-left font-semibold">Common Uses</th>
                  <th className="px-6 py-3 text-left font-semibold">Degradation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {polymerTypes.map((polymer, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{polymer.name}</td>
                    <td className="px-6 py-4">
                      <span className={polymer.type === 'Biodegradable' ? 'badge-biodegradable' : 'badge-non-biodegradable'}>
                        {polymer.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{polymer.source}</td>
                    <td className="px-6 py-4 text-gray-700">{polymer.uses}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{polymer.degradation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl p-12 shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg mb-8 opacity-95">
            Use our tools to discover polymers, compare materials, and simulate degradation
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/explorer')}
              className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Polymers
            </button>
            <button
              onClick={() => navigate('/simulator')}
              className="bg-white/20 backdrop-blur text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all transform hover:scale-105"
            >
              Try Simulator
            </button>
          </div>
        </div>

        {/* References */}
        <div className="mt-12 card p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4">References & Further Reading</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Biodegradable Polymers: Opportunities and Challenges - Progress in Polymer Science</li>
            <li>• Environmental Impact of Plastic Waste - Nature Reviews</li>
            <li>• Polymer Degradation Mechanisms - Journal of Applied Polymer Science</li>
            <li>• Sustainable Alternatives to Conventional Plastics - Green Chemistry</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;

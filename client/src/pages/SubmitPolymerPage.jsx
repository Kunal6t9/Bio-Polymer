import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SubmitPolymerPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    chemicalFormula: '',
    type: 'Biodegradable',
    commonUses: '',
    notes: '',
    imageUrl: '',
    degradationTimes: '{"Ocean": "", "Landfill": "", "Industrial Compost": "", "Soil": ""}',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submissionData = {
        ...formData,
        commonUses: formData.commonUses.split(',').map(item => item.trim()).filter(item => item),
        degradationTimes: JSON.parse(formData.degradationTimes),
      };

      await axios.post('http://localhost:5001/api/submissions', submissionData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Polymer submitted successfully! It will be reviewed by an administrator.');
      navigate('/contributor/dashboard');
    } catch (error) {
      console.error('Error submitting polymer:', error);
      setError(error.response?.data?.msg || 'Failed to submit polymer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl shadow-xl mb-4">
            <div className="text-5xl">🧪</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Submit New Polymer</h1>
          <p className="text-gray-600 text-lg">
            Contribute to the PolyVision database by submitting polymer data for review
          </p>
        </div>

        {/* Form Card */}
        <div className="card p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Polymer Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Polyethylene Terephthalate"
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Abbreviation
                  </label>
                  <input
                    name="abbreviation"
                    value={formData.abbreviation}
                    onChange={handleChange}
                    placeholder="e.g., PET"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chemical Formula
                </label>
                <input
                  name="chemicalFormula"
                  value={formData.chemicalFormula}
                  onChange={handleChange}
                  placeholder="e.g., (C10H8O4)n"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Biodegradable">Biodegradable</option>
                  <option value="Non-Biodegradable">Non-Biodegradable</option>
                </select>
              </div>
            </div>

            {/* Common Uses */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Common Uses (comma-separated)
              </label>
              <input
                name="commonUses"
                value={formData.commonUses}
                onChange={handleChange}
                placeholder="e.g., Bottles, Packaging, Textiles"
                className="input-field"
              />
            </div>

            {/* Degradation Times */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                Degradation Times
              </h2>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Degradation Times (JSON format)
              </label>
              <textarea
                name="degradationTimes"
                value={formData.degradationTimes}
                onChange={handleChange}
                placeholder='{"Ocean": "450 years", "Landfill": "500 years"}'
                className="input-field font-mono text-sm"
                rows="4"
              />
              <p className="text-xs text-gray-500 mt-1">
                Specify degradation time for different environments in JSON format
              </p>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
                Additional Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Additional information, research notes, or references..."
                    className="input-field"
                    rows="4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL (optional)
                  </label>
                  <input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm text-blue-700 font-medium">
                    Your submission will be reviewed by an administrator before being published to the database.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/contributor/dashboard')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-lg ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 transform hover:scale-105'
                }`}
              >
                {loading ? 'Submitting...' : 'Submit for Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitPolymerPage;

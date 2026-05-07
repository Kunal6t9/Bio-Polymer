import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config/api.js';

const PolymerForm = ({ onSuccess, polymerToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    type: 'Non-Biodegradable',
    commonUses: '',
    notes: '',
    imageUrl: '',
    degradationTimes: '{}',
  });
  useEffect(() => {
    if (polymerToEdit) {
      setFormData({
        name: polymerToEdit.name || '',
        abbreviation: polymerToEdit.abbreviation || '',
        type: polymerToEdit.type || 'Non-Biodegradable',
        commonUses: polymerToEdit.commonUses.join(', ') || '',
        notes: polymerToEdit.notes || '',
        imageUrl: polymerToEdit.imageUrl || '',
        degradationTimes: JSON.stringify(polymerToEdit.degradationTimes, null, 2) || '{}',
      });
    }
  }, [polymerToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...formData,
        commonUses: formData.commonUses.split(',').map(item => item.trim()),
        degradationTimes: JSON.parse(formData.degradationTimes),
      };

      if (polymerToEdit) {
        await axios.put(`${API_URL}/api/polymers/${polymerToEdit._id}`, submissionData);
        alert('Polymer updated successfully!');
      } else {
        await axios.post(`${API_URL}/api/polymers`, submissionData);
        alert('Polymer created successfully!');
      }
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded" />
      <input name="abbreviation" value={formData.abbreviation} onChange={handleChange} placeholder="Abbreviation" className="w-full p-2 border rounded" />
      <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="Non-Biodegradable">Non-Biodegradable</option>
        <option value="Biodegradable">Biodegradable</option>
      </select>
      <input name="commonUses" value={formData.commonUses} onChange={handleChange} placeholder="Common Uses (comma-separated)" className="w-full p-2 border rounded" />
      <textarea name="degradationTimes" value={formData.degradationTimes} onChange={handleChange} placeholder='Degradation Times (JSON format e.g., {"Ocean": "450 years"})' className="w-full p-2 border rounded" rows="3" />
      <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="w-full p-2 border rounded" />
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL (e.g., /images/pet.png)" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        {polymerToEdit ? 'Update Polymer' : 'Create Polymer'}
      </button>
    </form>
  );
};

export default PolymerForm;
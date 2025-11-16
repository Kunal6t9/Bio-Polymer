import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal';
import PolymerForm from '../components/PolymerForm';

const AdminDashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [polymers, setPolymers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPolymer, setEditingPolymer] = useState(null);
  const fetchPolymers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/api/polymers');
      setPolymers(response.data);
    } catch (error) {
      console.error('Error fetching polymers:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPolymers();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAdd = () => {
    setEditingPolymer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (polymer) => {
    setEditingPolymer(polymer);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this polymer?')) {
      try {
        await axios.delete(`http://localhost:5001/api/polymers/${id}`);
        alert('Polymer deleted successfully.');
        fetchPolymers();
      } catch (error) {
        console.error('Error deleting polymer:', error);
        alert('Failed to delete polymer.');
      }
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setEditingPolymer(null);
    fetchPolymers();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPolymer(null);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-lg">Manage Polymers</p>
        </div>
        <button onClick={handleLogout} className="px-6 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
          Logout
        </button>
      </div>

      <div className="mb-6">
        <button 
            onClick={handleAdd}
            className="px-6 py-2 font-semibold text-white bg-green-700 rounded-md hover:bg-green-800">
          + Add New Polymer
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {polymers.map(polymer => (
              <tr key={polymer._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{polymer.name} ({polymer.abbreviation})</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{polymer.type}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => handleEdit(polymer)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(polymer._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingPolymer ? 'Edit Polymer' : 'Add New Polymer'}
      >
        <PolymerForm onSuccess={handleSuccess} polymerToEdit={editingPolymer} />
      </Modal>
    </div>
  );
};

export default AdminDashboardPage;

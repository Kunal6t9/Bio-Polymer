import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal';
import PolymerForm from '../components/PolymerForm';

const AdminDashboardPage = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [polymers, setPolymers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('polymers'); // 'polymers' or 'submissions'
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPolymer, setEditingPolymer] = useState(null);
  const [reviewingSubmission, setReviewingSubmission] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [polymersRes, submissionsRes] = await Promise.all([
        axios.get('http://localhost:5001/api/polymers'),
        axios.get('http://localhost:5001/api/submissions/pending', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setPolymers(polymersRes.data);
      setSubmissions(submissionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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
        fetchData();
      } catch (error) {
        console.error('Error deleting polymer:', error);
        alert('Failed to delete polymer.');
      }
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setEditingPolymer(null);
    fetchData();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPolymer(null);
  };

  const handleReviewSubmission = (submission) => {
    setReviewingSubmission(submission);
    setReviewNotes('');
  };

  const handleApprove = async () => {
    if (!reviewingSubmission) return;
    
    try {
      await axios.put(
        `http://localhost:5001/api/submissions/${reviewingSubmission._id}/approve`,
        { reviewNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Submission approved and polymer created!');
      setReviewingSubmission(null);
      setReviewNotes('');
      fetchData();
    } catch (error) {
      console.error('Error approving submission:', error);
      alert('Failed to approve submission.');
    }
  };

  const handleReject = async () => {
    if (!reviewingSubmission) return;
    
    if (!reviewNotes.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:5001/api/submissions/${reviewingSubmission._id}/reject`,
        { reviewNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Submission rejected.');
      setReviewingSubmission(null);
      setReviewNotes('');
      fetchData();
    } catch (error) {
      console.error('Error rejecting submission:', error);
      alert('Failed to reject submission.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">Manage polymers and review submissions</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="px-6 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Polymers</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{polymers.length}</p>
              </div>
              <div className="text-4xl">🧪</div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{submissions.length}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Biodegradable</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {polymers.filter(p => p.type === 'Biodegradable').length}
                </p>
              </div>
              <div className="text-4xl">🌱</div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Non-Biodegradable</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {polymers.filter(p => p.type === 'Non-Biodegradable').length}
                </p>
              </div>
              <div className="text-4xl">🏭</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('polymers')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'polymers'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Polymers Database ({polymers.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
              activeTab === 'submissions'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pending Submissions ({submissions.length})
            {submissions.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {submissions.length}
              </span>
            )}
          </button>
        </div>

        {/* Polymers Tab */}
        {activeTab === 'polymers' && (
          <>
            <div className="mb-6">
              <button 
                onClick={handleAdd}
                className="btn-primary"
              >
                + Add New Polymer
              </button>
            </div>

            <div className="card overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Polymer Database</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {polymers.map(polymer => (
                      <tr key={polymer._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{polymer.name}</div>
                          <div className="text-sm text-gray-500">{polymer.abbreviation}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={polymer.type === 'Biodegradable' ? 'badge-biodegradable' : 'badge-non-biodegradable'}>
                            {polymer.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                            {polymer.status || 'approved'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleEdit(polymer)} 
                            className="text-primary-600 hover:text-primary-900 mr-4 font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(polymer._id)} 
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="card overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Pending Submissions</h2>
            </div>
            
            {submissions.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">No pending submissions to review</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <div key={submission._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{submission.name}</h3>
                          <span className={submission.type === 'Biodegradable' ? 'badge-biodegradable' : 'badge-non-biodegradable'}>
                            {submission.type}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Abbreviation</p>
                            <p className="font-medium">{submission.abbreviation || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Chemical Formula</p>
                            <p className="font-medium">{submission.chemicalFormula || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Submitted By</p>
                            <p className="font-medium">{submission.submittedBy?.name || 'Unknown'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Submitted On</p>
                            <p className="font-medium">{new Date(submission.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Common Uses</p>
                          <p className="text-gray-700">{submission.commonUses?.join(', ') || 'N/A'}</p>
                        </div>

                        {submission.notes && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Notes</p>
                            <p className="text-gray-700">{submission.notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleReviewSubmission(submission)}
                        className="ml-4 btn-primary"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Polymer Form Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          title={editingPolymer ? 'Edit Polymer' : 'Add New Polymer'}
        >
          <PolymerForm onSuccess={handleSuccess} polymerToEdit={editingPolymer} />
        </Modal>

        {/* Review Submission Modal */}
        {reviewingSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-4 sticky top-0">
                <h3 className="text-2xl font-bold text-white">Review Submission</h3>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{reviewingSubmission.name}</h4>
                  <span className={reviewingSubmission.type === 'Biodegradable' ? 'badge-biodegradable' : 'badge-non-biodegradable'}>
                    {reviewingSubmission.type}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Abbreviation</p>
                      <p className="text-gray-900">{reviewingSubmission.abbreviation || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Chemical Formula</p>
                      <p className="text-gray-900">{reviewingSubmission.chemicalFormula || 'N/A'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Common Uses</p>
                    <p className="text-gray-900">{reviewingSubmission.commonUses?.join(', ') || 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Degradation Times</p>
                    <div className="bg-gray-50 p-3 rounded-lg mt-1">
                      {Object.entries(reviewingSubmission.degradationTimes || {}).map(([env, time]) => (
                        <div key={env} className="flex justify-between py-1">
                          <span className="font-medium text-primary-600">{env}:</span>
                          <span className="text-gray-900">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {reviewingSubmission.notes && (
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Notes</p>
                      <p className="text-gray-900">{reviewingSubmission.notes}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Submitted By</p>
                    <p className="text-gray-900">{reviewingSubmission.submittedBy?.name} ({reviewingSubmission.submittedBy?.email})</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Review Notes (optional for approval, required for rejection)
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add feedback or notes for the contributor..."
                    className="input-field"
                    rows="4"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setReviewingSubmission(null)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
                  >
                    Approve & Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;

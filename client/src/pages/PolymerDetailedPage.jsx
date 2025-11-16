import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PolymerDetailPage = () => {
  const { id } = useParams();
  const [polymer, setPolymer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolymer = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/polymers/${id}`);
        setPolymer(response.data);
      } catch (error) {
        console.error('Error fetching polymer details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolymer();
  }, [id]); 

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!polymer) return <div className="p-8 text-center">Polymer not found.</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold mb-4">{polymer.name}</h1>
      <p className="text-xl text-gray-500 mb-8">{polymer.abbreviation}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={polymer.imageUrl || 'https://via.placeholder.com/800x600'} 
            alt={polymer.name}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold border-b pb-2">Details</h2>
          <p><strong className="font-semibold">Type:</strong> {polymer.type}</p>
          <p><strong className="font-semibold">Degradation Time:</strong> {polymer.degradationTime}</p>
          <div>
            <strong className="font-semibold">Common Uses:</strong>
            <ul className="list-disc list-inside mt-2">
              {polymer.commonUses.map(use => <li key={use}>{use}</li>)}
            </ul>
          </div>
          <p className="mt-4 pt-4 border-t"><strong className="font-semibold">Notes:</strong> {polymer.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default PolymerDetailPage;
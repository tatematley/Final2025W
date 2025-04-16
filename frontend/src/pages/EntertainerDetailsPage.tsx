import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/entertainer';
import { deleteEntertainer } from '../api/EntertainerApi';
import { API_URL } from '../api/EntertainerApi';

const EntertainerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntertainer = async () => {
      try {
        const res = await fetch(`${API_URL}/Entertainers/${id}`);
        const data = await res.json();
        setEntertainer(data);
      } catch (err) {
        setError('Failed to load entertainer');
      }
    };

    fetchEntertainer();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entertainer?');
    if (!confirmDelete || !entertainer) return;

    await deleteEntertainer(entertainer.entertainerID);
    navigate('/entertainers');
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!entertainer) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{entertainer.entStageName}</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>SSN:</strong> {entertainer.entssn}</li>
        <li className="list-group-item"><strong>Street Address:</strong> {entertainer.entStreetAddress}</li>
        <li className="list-group-item"><strong>City:</strong> {entertainer.entCity}</li>
        <li className="list-group-item"><strong>State:</strong> {entertainer.entState}</li>
        <li className="list-group-item"><strong>Zip Code:</strong> {entertainer.entZipCode}</li>
        <li className="list-group-item"><strong>Phone Number:</strong> {entertainer.entPhoneNumber}</li>
        <li className="list-group-item"><strong>Web Page:</strong> {entertainer.entWebPage}</li>
        <li className="list-group-item"><strong>Email Address:</strong> {entertainer.entEMailAddress}</li>
        <li className="list-group-item"><strong>Date Entered:</strong> {entertainer.dateEntered}</li>
      </ul>

      <div className="mt-3 d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/entertainers/${entertainer.entertainerID}/edit`)}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/entertainers')}>
          Back to List
        </button>
      </div>
    </div>
  );
};

export default EntertainerDetailsPage;

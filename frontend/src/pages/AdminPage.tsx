import { useEffect, useState } from 'react';
import {
  fetchEntertainers,
  deleteEntertainer,
} from '../api/EntertainerApi';
import NewEntertainerForm from '../components/NewEntertainerForm';
import EditEntertainerForm from '../components/EditEntertainerForm';
import { Entertainer } from '../types/entertainer';

const AdminEntertainersPage = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEntertainer, setEditingEntertainer] = useState<Entertainer | null>(null);

  // Load all entertainers
  const loadEntertainers = async () => {
    try {
      const data = await fetchEntertainers();
      setEntertainers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntertainers();
  }, []);

  // Delete logic
  const handleDelete = async (entertainerID: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entertainer?');
    if (!confirmDelete) return;

    try {
      await deleteEntertainer(entertainerID);
      setEntertainers((prev) => prev.filter((e) => e.entertainerID !== entertainerID));
    } catch {
      alert('Failed to delete entertainer. Please try again.');
    }
  };

  // UI rendering
  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container">
      <h1 className="my-4">Admin – Entertainers</h1>

      {!showForm && (
        <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>
          Add Entertainer
        </button>
      )}

      {showForm && (
        <NewEntertainerForm
          onSuccess={() => {
            setShowForm(false);
            loadEntertainers();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingEntertainer && (
        <EditEntertainerForm
          entertainer={editingEntertainer}
          onSuccess={() => {
            setEditingEntertainer(null);
            loadEntertainers();
          }}
          onCancel={() => setEditingEntertainer(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Stage Name</th>
            <th>SSN</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Phone Number</th>
            <th>Web Page</th>
            <th>Email Address</th>
            <th>Date Entered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entertainers.map((e) => (
            <tr key={e.entertainerID}>
              <td>{e.entertainerID}</td>
              <td>{e.entStageName}</td>
              <td>{e.entssn}</td>
              <td>{e.entStreetAddress}</td>
              <td>{e.entCity}</td>
              <td>{e.entState}</td>
              <td>{e.entZipCode}</td>
              <td>{e.entPhoneNumber}</td>
              <td>{e.entWebPage}</td>
              <td>{e.entEMailAddress}</td>
              <td>{e.dateEntered}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditingEntertainer(e)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleDelete(e.entertainerID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEntertainersPage;

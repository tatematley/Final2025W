import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEntertainersSummary, EntertainerSummary } from "../api/EntertainerApi";
import NewEntertainerForm from "../components/NewEntertainerForm";
import EntertainerList from "../components/EntertainerList";
import WelcomeBand from "../components/WelcomeBand";

function EntertainersPage() {
  const [entertainers, setEntertainers] = useState<EntertainerSummary[]>([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const loadEntertainers = async () => {
    const data = await fetchEntertainersSummary();
    setEntertainers(data);
  };

  useEffect(() => {
    loadEntertainers();
  }, []);

  return (
    <div className="container mt-4">
      <WelcomeBand />

      <div className="row">
        <div className="col-md-9">
          <h2 className="mb-3">Available Entertainers</h2>

          <EntertainerList
            entertainers={entertainers}
            onDetailsClick={(id) => navigate(`/entertainers/${id}`)}
          />

          {!showForm && (
            <button className="btn btn-success mt-3" onClick={() => setShowForm(true)}>
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
        </div>
      </div>
    </div>
  );
}

export default EntertainersPage;

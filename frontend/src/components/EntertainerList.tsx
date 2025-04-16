import { EntertainerSummary } from "../api/EntertainerApi";

interface Props {
  entertainers: EntertainerSummary[];
  onDetailsClick: (id: number) => void;
}

const EntertainerList = ({ entertainers, onDetailsClick }: Props) => {
  return (
    <>
      {entertainers.map((e) => (
        <div className="card mb-3" key={e.entertainerID}>
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5>{e.entStageName}</h5>
              <p><strong>Times Booked:</strong> {e.timesBooked}</p>
              <p><strong>Last Booked:</strong> {e.lastBookedDate ?? 'N/A'}</p>
            </div>
            <button className="btn btn-primary" onClick={() => onDetailsClick(e.entertainerID)}>
              Details
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default EntertainerList;

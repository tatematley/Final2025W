import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '100px' }}>
      <h1>Welcome to the Entertainment Agency</h1>
      <p>Your gateway to top-tier entertainment experiences.</p>
      <Link to="/entertainer" style={{ marginTop: '20px', display: 'inline-block', fontSize: '18px', color: '#007bff' }}>
        Go to Entertainers
      </Link>
    </div>
  );
};

export default WelcomePage;

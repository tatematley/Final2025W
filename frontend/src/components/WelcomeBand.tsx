import { Link } from 'react-router-dom';

function WelcomeBand() {
    return (
        <Link to="/entertainer" style={{ textDecoration: 'none' }}>
            <div className="position-relative text-white text-center" style={{ height: '100vh' }}>
                {/* Overlay for readability */}
                <div 
                    className="w-100 h-100 d-flex justify-content-center align-items-center" 
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <h1 className="fw-bold">Entertainer List</h1>
                </div>
            </div>
        </Link>
    );   
}

export default WelcomeBand;

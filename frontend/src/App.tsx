import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntertainersPage from './pages/EntertainerPage';
import AdminEntertainersPage from './pages/AdminPage';
import EntertainerDetailsPage from './pages/EntertainerDetailsPage';


function App() {

  return (
    <>

        <Router>
          <Routes>  
            <Route path="/" element={<EntertainersPage />} />
            <Route path="/entertainers/:id" element={<EntertainerDetailsPage />} />
            <Route path="/adminentertainers" element={<AdminEntertainersPage />} />
          </Routes>
        </Router>
    </>
  );
}

export default App

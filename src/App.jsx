
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
import UserRegister from './pages/UserRegister.jsx';
import UserLogin from './pages/UserLogin.jsx';
import OTPVerify from './pages/OTPVerify.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AgentRegister from './pages/AgentRegister.jsx';
import AgentLogin from './pages/AgentLogin.jsx';
import AgentDashboard from './pages/AgentDashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminSetup from './pages/AdminSetup.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';
import LandingPage from './pages/LandingPage';
import Aboutus from './pages/Aboutus.jsx';
import SearchResults from './pages/SearchResults';
import PropertiesPage from './pages/PropertiesPage.jsx';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
    
      <div className="container mx-auto p-0">
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/verify-otp" element={<OTPVerify />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/agent/register" element={<AgentRegister />} />
          <Route path="/agent/login" element={<AgentLogin />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/setup-secret-admin" element={<AdminSetup />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/properties" element={<PropertiesPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
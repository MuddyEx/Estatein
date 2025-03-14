import { useState, useEffect } from 'react';
import { 
  getApartments, 
  bookInspection, 
  makePayment 
} from '../services/api.js'; // Removed getApartmentById since it's unused
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice.js';
import { jwtDecode } from 'jwt-decode';

function UserDashboard() {
  const [apartments, setApartments] = useState([]);
  const [activeTab, setActiveTab] = useState('browse'); // Tabs: browse, profile, booked, inspections
  const [profileData, setProfileData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [contactData, setContactData] = useState({
    apartmentId: '',
    message: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState({ browse: false, book: {}, pay: {}, profile: false, contact: false });
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let userId = null;
  let userEmail = '';
  let userFullName = '';
  try {
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.id;
      userEmail = decoded.email;
      userFullName = decoded.fullName || 'User Name'; // Adjust based on token data
      console.log('Decoded user ID:', userId);
    }
  } catch (err) {
    console.error('Error decoding token:', err.message);
    setError('Invalid token. Please log in again.');
  }

  useEffect(() => {
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/user/login');
      return;
    }

    const fetchApartments = async () => {
      setIsLoading(prev => ({ ...prev, browse: true }));
      try {
        const response = await getApartments();
        console.log('Fetched apartments:', response.data);
        if (Array.isArray(response.data)) {
          setApartments(response.data);
          setError(null);
        } else {
          throw new Error('Response data is not an array');
        }
      } catch (error) {
        console.error('Error fetching apartments:', error.message);
        setError('Failed to load apartments. Please try again.');
      } finally {
        setIsLoading(prev => ({ ...prev, browse: false }));
      }
    };

    fetchApartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]); // isLoading intentionally omitted as it's managed within the effect

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, profile: true });
    try {
      // Assuming an endpoint like /api/user/profile exists (needs backend)
      console.log('Profile update requested:', profileData);
      alert('Profile update not implemented yet. Add backend endpoint!');
      setProfileData({ currentPassword: '', newPassword: '' });
      setError(null);
    } catch (error) {
      console.error('Profile update error:', error.response?.data);
      setError(error.response?.data.message || 'Failed to update profile');
    } finally {
      setIsLoading({ ...isLoading, profile: false });
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      setIsLoading({ ...isLoading, profile: true });
      try {
        // Assuming an endpoint like /api/user/account exists (needs backend)
        console.log('Account delete requested');
        alert('Account deletion not implemented yet. Add backend endpoint!');
        dispatch(logout());
        navigate('/user/login');
      } catch (error) {
        console.error('Account delete error:', error.response?.data);
        setError(error.response?.data.message || 'Failed to delete account');
      } finally {
        setIsLoading({ ...isLoading, profile: false });
      }
    }
  };

  const handleBookInspection = async (apartmentId) => {
    setIsLoading({ ...isLoading, book: { ...isLoading.book, [apartmentId]: true } });
    try {
      const response = await bookInspection({ apartmentId });
      console.log('Inspection booked:', response.data);
      alert(response.data.message);
      setError(null);
    } catch (error) {
      console.error('Error booking inspection:', error.response?.data);
      setError(error.response?.data.message || 'Failed to book inspection');
    } finally {
      setIsLoading({ ...isLoading, book: { ...isLoading.book, [apartmentId]: false } });
    }
  };

  const handleMakePayment = async (apartmentId, amount) => {
    setIsLoading({ ...isLoading, pay: { ...isLoading.pay, [apartmentId]: true } });
    try {
      const response = await makePayment({ apartmentId, amount });
      console.log('Payment made:', response.data);
      alert(response.data.message);
      const fetchResponse = await getApartments();
      if (Array.isArray(fetchResponse.data)) {
        setApartments(fetchResponse.data);
      }
      setError(null);
    } catch (error) {
      console.error('Error making payment:', error.response?.data);
      setError(error.response?.data.message || 'Failed to make payment');
    } finally {
      setIsLoading({ ...isLoading, pay: { ...isLoading.pay, [apartmentId]: false } });
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, contact: true });
    try {
      // Assuming an endpoint like /api/user/contact exists (needs backend)
      console.log('Contact message sent:', contactData);
      alert('Contact feature not implemented yet. Add backend endpoint!');
      setContactData({ apartmentId: '', message: '' });
      setError(null);
    } catch (error) {
      console.error('Contact error:', error.response?.data);
      setError(error.response?.data.message || 'Failed to send message');
    } finally {
      setIsLoading({ ...isLoading, contact: false });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/user/login');
  };

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-gray-900 h-screen p-6 shadow-lg">
          <h2 className="text-3xl font-extrabold mb-8 text-white">User Panel</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTab('browse')}
                className={`w-full text-left p-3 rounded-lg ${activeTab === 'browse' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} transition-all duration-200`}
              >
                Browse Properties
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left p-3 rounded-lg ${activeTab === 'profile' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} transition-all duration-200`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('booked')}
                className={`w-full text-left p-3 rounded-lg ${activeTab === 'booked' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} transition-all duration-200`}
              >
                Booked Apartments
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('inspections')}
                className={`w-full text-left p-3 rounded-lg ${activeTab === 'inspections' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} transition-all duration-200`}
              >
                Inspection Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('contact')}
                className={`w-full text-left p-3 rounded-lg ${activeTab === 'contact' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} transition-all duration-200`}
              >
                Contact Agents
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-md transition-all duration-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-200 text-gray-800">
          <h2 className="text-4xl font-extrabold mb-8 text-gray-900">
            {activeTab === 'browse' ? 'Browse Properties' : 
             activeTab === 'profile' ? 'User Profile' : 
             activeTab === 'booked' ? 'Booked Apartments' : 
             activeTab === 'inspections' ? 'Inspection Requests' : 
             'Contact Agents'}
          </h2>
          {error && <div className="text-red-600 bg-red-100 p-3 rounded-md mb-6 shadow-inner">{error}</div>}

          {/* Browse Properties Tab */}
          {activeTab === 'browse' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading.browse ? (
                <div className="col-span-full text-center text-gray-600">Loading properties...</div>
              ) : apartments.length === 0 ? (
                <div className="col-span-full text-center text-gray-600">No properties available.</div>
              ) : (
                apartments.map((apt) => (
                  <div key={apt._id} className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <button
                      onClick={() => handleViewDetails(apt._id)}
                      className="text-xl font-bold text-gray-900 mb-2 hover:underline"
                    >
                      {apt.location}
                    </button>
                    <p className="text-gray-700">Price: <span className="font-semibold">₦{formatPrice(apt.pricePerDay)}/day</span></p>
                    <p className="text-gray-700">Address: <span className="font-semibold">{apt.address}</span></p>
                    <p className="text-gray-700">State: <span className="font-semibold">{apt.state}</span></p>
                    <p className="text-gray-700">Rooms: <span className="font-semibold">{apt.totalRooms}</span></p>
                    <p className="text-gray-700">Status: <span className={`font-semibold ${apt.availability === 'Available' ? 'text-green-600' : 'text-red-600'}`}>{apt.availability}</span></p>
                    {apt.images.length > 0 && (
                      <div className="mt-3 flex space-x-3 overflow-x-auto py-2">
                        {apt.images.slice(0, 1).map((img, idx) => (
                          <img key={idx} src={img} alt={`Apartment ${idx}`} className="w-28 h-28 object-cover rounded-lg shadow-md" />
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => handleBookInspection(apt._id)}
                        disabled={apt.availability !== 'Available' || isLoading.book[apt._id]}
                        className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 ${apt.availability !== 'Available' || isLoading.book[apt._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isLoading.book[apt._id] ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          'Book Inspection'
                        )}
                      </button>
                      <button
                        onClick={() => handleMakePayment(apt._id, apt.pricePerDay)}
                        disabled={apt.availability !== 'Available' || isLoading.pay[apt._id]}
                        className={`bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-200 ${apt.availability !== 'Available' || isLoading.pay[apt._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isLoading.pay[apt._id] ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          'Rent Now'
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Your Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    value={userFullName}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    value={userEmail}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
              </div>
              <form onSubmit={handleProfileSubmit} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      name="currentPassword"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={handleProfileChange}
                      placeholder="Enter current password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      name="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={handleProfileChange}
                      placeholder="Enter new password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div className="mt-6 space-x-3">
                  <button
                    type="submit"
                    disabled={isLoading.profile}
                    className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 ${isLoading.profile ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading.profile ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={isLoading.profile}
                    className={`bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200 ${isLoading.profile ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Delete Account
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Booked Apartments Tab */}
          {activeTab === 'booked' && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Booked Apartments</h3>
              {apartments.filter(apt => apt.rentedBy === userId).length === 0 ? (
                <p className="text-gray-600">You have not booked any apartments yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apartments.filter(apt => apt.rentedBy === userId).map((apt) => (
                    <div key={apt._id} className="bg-gray-50 p-5 rounded-xl shadow-md">
                      <button
                        onClick={() => handleViewDetails(apt._id)}
                        className="text-lg font-bold text-gray-900 mb-2 hover:underline"
                      >
                        {apt.location}
                      </button>
                      <p className="text-gray-700">Price: <span className="font-semibold">₦{formatPrice(apt.pricePerDay)}/day</span></p>
                      <p className="text-gray-700">Status: <span className="font-semibold text-red-600">Rented</span></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Inspection Requests Tab */}
          {activeTab === 'inspections' && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Inspection Requests</h3>
              <p className="text-gray-600">This feature requires backend support to track inspection statuses. Placeholder only.</p>
              {/* Example placeholder; implement with real data if backend exists */}
              <div className="mt-4">
                <p className="text-gray-700">No inspection requests tracked yet.</p>
              </div>
            </div>
          )}

          {/* Contact Agents Tab */}
          {activeTab === 'contact' && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Contact Agents</h3>
              <form onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Property</label>
                    <select
                      name="apartmentId"
                      value={contactData.apartmentId}
                      onChange={handleContactChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="">Select a property</option>
                      {apartments.map((apt) => (
                        <option key={apt._id} value={apt._id}>{apt.location}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      value={contactData.message}
                      onChange={handleContactChange}
                      placeholder="Enter your message to the agent"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32 resize-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading.contact || !contactData.apartmentId || !contactData.message}
                  className={`mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 ${isLoading.contact || !contactData.apartmentId || !contactData.message ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading.contact ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
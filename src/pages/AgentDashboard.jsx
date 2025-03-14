import { useState, useEffect } from 'react';
import { getApartments,  postApartment, editApartment,  deleteApartment, updateAgentProfile, deleteAgentAccount } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice.js';
import { jwtDecode } from 'jwt-decode';
import { FiHome, FiUser, FiMapPin, FiEdit, FiTrash, FiLogOut, FiImage, FiVideo, FiDollarSign, FiCheckSquare, FiXSquare } from 'react-icons/fi';
import { TbCurrencyNaira } from "react-icons/tb";

function AgentDashboard() {
  const [apartments, setApartments] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    images: [],
    video: '',
    pricePerDay: '',
    address: '',
    state: '',
    totalRooms: '',
    parkingSpace: false,
    propertyType: '',
    facilities: '',
    partiesAllowed: false,
    description: '',
  });
  const [editData, setEditData] = useState(null);
  const [profileData, setProfileData] = useState({
    passportPhoto: '',
    currentPassword: '',
    newPassword: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState({ post: false, edit: false, delete: {}, profile: false });
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let agentId = null;
  let agentEmail = '';
  let agentFullName = '';
  let agentPhone = '';
  let agentPassport = '';
  let agentCertificate = '';
  try {
    if (token) {
      const decoded = jwtDecode(token);
      agentId = decoded.id;
      agentEmail = decoded.email;
      agentFullName = decoded.fullName || 'Agent Name';
      agentPhone = decoded.phone || 'N/A';
      agentPassport = decoded.passportPhoto || '';
      agentCertificate = decoded.certificate || '';
      console.log('Decoded agent ID:', agentId);
    }
  } catch (err) {
    console.error('Error decoding token:', err.message);
    setError('Invalid token. Please log in again.');
  }

  useEffect(() => {
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/agent/login');
      return;
    }

    const fetchAgentData = async () => {
      try {
        const response = await getApartments();
        console.log('Fetched apartments:', response.data);
        if (Array.isArray(response.data)) {
          const filteredApartments = response.data.filter((apt) => apt.agentId === agentId);
          setApartments(filteredApartments);
          setError(null);
        } else {
          throw new Error('Response data is not an array');
        }
      } catch (error) {
        console.error('Error fetching apartments:', error.message);
        setError('Failed to load data. Please try again.');
      }
    };

    fetchAgentData();
  }, [token, navigate, agentId]);

  const fileToBase64 = (file, callback) => {
    if (file.size > 10 * 1024 * 1024) {
      callback('File size exceeds 10MB limit');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 5) {
      setError('You can upload a maximum of 5 images');
      return;
    }
    const imagePromises = files.map((file) =>
      new Promise((resolve) => fileToBase64(file, resolve))
    );
    Promise.all(imagePromises).then((results) => {
      const errors = results.filter((r) => typeof r === 'string' && !r.startsWith('data:image'));
      if (errors.length > 0) {
        setError(errors[0]);
      } else {
        setFormData({ ...formData, images: [...formData.images, ...results] });
        setError(null);
      }
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
    if (updatedImages.length >= 1) setError(null);
    else setError('At least one image is required');
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      fileToBase64(file, (result) => {
        if (typeof result === 'string' && result.startsWith('data:video')) {
          setFormData({ ...formData, video: result });
          setError(null);
        } else {
          setError(result);
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data being sent to postApartment:', formData); // Debug log
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (formData.images.length < 1) {
      setError('At least one image is required');
      return;
    }
    setIsLoading({ ...isLoading, post: true });
    try {
      const response = await postApartment(formData);
      console.log('Apartment posted successfully:', response.data);
      alert(response.data.message);
      const fetchResponse = await getApartments();
      if (Array.isArray(fetchResponse.data)) {
        setApartments(fetchResponse.data.filter((apt) => apt.agentId === agentId));
      }
      setFormData({
        title: '',
        location: '',
        images: [],
        video: '',
        pricePerDay: '',
        address: '',
        state: '',
        totalRooms: '',
        parkingSpace: false,
        propertyType: '',
        facilities: '',
        partiesAllowed: false,
        description: '',
      });
      setError(null);
    } catch (error) {
      console.error('Error in postApartment:', error.response?.data);
      setError(error.response?.data.message || 'Failed to post apartment');
    } finally {
      setIsLoading({ ...isLoading, post: false });
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({ ...editData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (editData.images.length + files.length > 5) {
      setError('You can upload a maximum of 5 images');
      return;
    }
    const imagePromises = files.map((file) =>
      new Promise((resolve) => fileToBase64(file, resolve))
    );
    Promise.all(imagePromises).then((results) => {
      const errors = results.filter((r) => typeof r === 'string' && !r.startsWith('data:image'));
      if (errors.length > 0) {
        setError(errors[0]);
      } else {
        setEditData({ ...editData, images: [...editData.images, ...results] });
        setError(null);
      }
    });
  };

  const handleEditRemoveImage = (index) => {
    const updatedImages = editData.images.filter((_, i) => i !== index);
    setEditData({ ...editData, images: updatedImages });
    if (updatedImages.length >= 1) setError(null);
    else setError('At least one image is required');
  };

  const handleEditVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      fileToBase64(file, (result) => {
        if (typeof result === 'string' && result.startsWith('data:video')) {
          setEditData({ ...editData, video: result });
          setError(null);
        } else {
          setError(result);
        }
      });
    }
  };

  const handleEdit = (apt) => {
    setEditData({ ...apt, title: apt.title || 'Untitled Apartment' }); // Default title if missing
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log('Edit Data being sent to editApartment:', editData); // Debug log
    if (!editData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (editData.images.length < 1) {
      setError('At least one image is required');
      return;
    }
    setIsLoading({ ...isLoading, edit: true });
    try {
      const response = await editApartment({ apartmentId: editData._id, ...editData });
      console.log('Apartment edited successfully:', response.data);
      alert(response.data.message);
      const fetchResponse = await getApartments();
      if (Array.isArray(fetchResponse.data)) {
        setApartments(fetchResponse.data.filter((apt) => apt.agentId === agentId));
      }
      setEditData(null);
      setError(null);
    } catch (error) {
      console.error('Error in editApartment:', error.response?.data);
      setError(error.response?.data.message || 'Edit failed');
    } finally {
      setIsLoading({ ...isLoading, edit: false });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this apartment?')) {
      console.log('Attempting to delete apartment with ID:', id);
      setIsLoading({ ...isLoading, delete: { ...isLoading.delete, [id]: true } });
      try {
        const response = await deleteApartment(id);
        console.log('Delete response:', response.data);
        alert(response.data.message);
        const fetchResponse = await getApartments();
        if (Array.isArray(fetchResponse.data)) {
          const updatedApartments = fetchResponse.data.filter((apt) => apt.agentId === agentId);
          console.log('Updated apartments after delete:', updatedApartments);
          setApartments(updatedApartments);
        }
        setError(null);
      } catch (error) {
        console.error('Error deleting apartment:', error.response?.data || error.message);
        setError(error.response?.data.message || 'Failed to delete apartment');
      } finally {
        setIsLoading({ ...isLoading, delete: { ...isLoading.delete, [id]: false } });
      }
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      fileToBase64(file, (result) => {
        if (typeof result === 'string' && result.startsWith('data:image')) {
          setProfileData({ ...profileData, passportPhoto: result });
          setError(null);
        } else {
          setError(result);
        }
      });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, profile: true });
    try {
      const response = await updateAgentProfile(profileData);
      console.log('Profile update response:', response.data);
      alert(response.data.message);
      setProfileData({ ...profileData, currentPassword: '', newPassword: '' });
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
        const response = await deleteAgentAccount();
        console.log('Account delete response:', response.data);
        alert(response.data.message);
        dispatch(logout());
        navigate('/agent/login');
      } catch (error) {
        console.error('Account delete error:', error.response?.data);
        setError(error.response?.data.message || 'Failed to delete account');
      } finally {
        setIsLoading({ ...isLoading, profile: false });
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/agent/login');
  };

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
  };

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 h-screen p-6 fixed shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <FiHome className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
            AgentPanel
          </h2>
        </div>

        <nav className="space-y-2">
          {[
            { tab: 'dashboard', icon: <FiMapPin />, label: 'Properties' },
            { tab: 'profile', icon: <FiUser />, label: 'Profile' },
            { tab: 'rented', icon: <FiHome />, label: 'Rented' },
          ].map(({ tab, icon, label }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === tab
                  ? 'bg-gray-700/50 text-white shadow-inner'
                  : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full mt-8 p-3 rounded-xl bg-gray-700/40 hover:bg-gray-700/60 text-red-300 hover:text-red-200 transition-all flex items-center gap-2"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Error Display */}
          {error && (
            <div className="bg-rose-100/80 text-rose-800 p-4 rounded-xl shadow-sm border border-rose-200/60">
              {error}
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && !editData && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60">
              <div className="p-6 border-b border-gray-200/60 flex items-center gap-4">
                <FiMapPin className="text-emerald-500 text-xl" />
                <h3 className="text-2xl font-semibold text-gray-900">Property Management</h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter apartment title"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter location"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day (₦)</label>
                      <div className="relative">
                        <TbCurrencyNaira className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                          name="pricePerDay"
                          type="number"
                          value={formData.pricePerDay}
                          onChange={handleChange}
                          placeholder="Enter price per day"
                          required
                          className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms</label>
                      <input
                        name="totalRooms"
                        type="number"
                        value={formData.totalRooms}
                        onChange={handleChange}
                        placeholder="Enter total rooms"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="block text-sm font-medium text-gray-700">Parking Space</label>
                      <input
                        name="parkingSpace"
                        type="checkbox"
                        checked={formData.parkingSpace}
                        onChange={handleChange}
                        className="h-5 w-5 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      >
                        <option value="">Select Property Type</option>
                        <option value="Single Room">Single Room</option>
                        <option value="2-Bedroom">2-Bedroom</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Studio">Studio</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facilities</label>
                      <textarea
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleChange}
                        placeholder="List facilities (e.g., Wi-Fi, Pool)"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-24 resize-none"
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center gap-3">
                      <label className="block text-sm font-medium text-gray-700">Parties Allowed</label>
                      <input
                        name="partiesAllowed"
                        type="checkbox"
                        checked={formData.partiesAllowed}
                        onChange={handleChange}
                        className="h-5 w-5 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter full description"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-32 resize-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Images (1-5, Max 10MB each)</label>
                      <div className="relative">
                        <FiImage className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                          className="w-full pl-10 p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-500 file:text-white file:hover:bg-indigo-600 transition-all"
                        />
                      </div>
                      <div className="mt-3 flex space-x-3 overflow-x-auto">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img src={img} alt={`Preview ${idx}`} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute -top-2 -right-2 bg-rose-600/90 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md hover:bg-rose-700 transition-all"
                            >
                              <FiXSquare />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Video (Optional, Max 10MB)</label>
                      <div className="relative">
                        <FiVideo className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                          className="w-full pl-10 p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-500 file:text-white file:hover:bg-indigo-600 transition-all"
                        />
                      </div>
                      {formData.video && (
                        <video src={formData.video} controls className="mt-3 w-full max-w-md rounded-lg shadow-md" />
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading.post}
                    className={`w-full p-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 transition-all ${isLoading.post ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading.post ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      <>
                        <FiCheckSquare /> Post Apartment
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Apartment List */}
              <div className="p-6 border-t border-gray-200/60">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {apartments.map((apt) => (
                    <div 
                      key={apt._id} 
                      onClick={() => handleViewDetails(apt._id)} 
                      className="bg-white rounded-xl shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow cursor-pointer p-5"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{apt.title}</h3>
                      <p className="text-gray-600">Location: <span className="font-medium">{apt.location}</span></p>
                      <p className="text-gray-600">Price: <span className="font-medium">₦{formatPrice(apt.pricePerDay)}/day</span></p>
                      <p className="text-gray-600">Address: <span className="font-medium">{apt.address}</span></p>
                      <p className="text-gray-600">State: <span className="font-medium">{apt.state}</span></p>
                      <p className="text-gray-600">Rooms: <span className="font-medium">{apt.totalRooms}</span></p>
                      <p className="text-gray-600">Status: <span className={`font-medium ${apt.availability === 'Available' ? 'text-emerald-800' : 'text-rose-800'}`}>{apt.availability}</span></p>
                      {apt.images.length > 0 && (
                        <div className="mt-3">
                          <img src={apt.images[0]} alt={apt.title} className="w-full h-32 object-cover rounded-lg shadow-sm" />
                        </div>
                      )}
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEdit(apt); }}
                          disabled={isLoading.delete[apt._id]}
                          className={`flex-1 p-2 bg-amber-600/90 hover:bg-amber-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm ${isLoading.delete[apt._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <FiEdit /> Edit
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(apt._id); }}
                          disabled={isLoading.delete[apt._id]}
                          className={`flex-1 p-2 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm ${isLoading.delete[apt._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isLoading.delete[apt._id] ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              Loading...
                            </span>
                          ) : (
                            <>
                              <FiTrash /> Delete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Edit Apartment Form */}
          {activeTab === 'dashboard' && editData && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60">
              <div className="p-6 border-b border-gray-200/60 flex items-center gap-4">
                <FiEdit className="text-amber-500 text-xl" />
                <h3 className="text-2xl font-semibold text-gray-900">Edit Property</h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleEditSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        placeholder="Enter apartment title"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        name="location"
                        value={editData.location}
                        onChange={handleEditChange}
                        placeholder="Location"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day (₦)</label>
                      <div className="relative">
                        <FiDollarSign className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                          name="pricePerDay"
                          type="number"
                          value={editData.pricePerDay}
                          onChange={handleEditChange}
                          placeholder="Price per day"
                          required
                          className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        name="address"
                        value={editData.address}
                        onChange={handleEditChange}
                        placeholder="Address"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        name="state"
                        value={editData.state}
                        onChange={handleEditChange}
                        placeholder="State"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms</label>
                      <input
                        name="totalRooms"
                        type="number"
                        value={editData.totalRooms}
                        onChange={handleEditChange}
                        placeholder="Total rooms"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="block text-sm font-medium text-gray-700">Parking Space</label>
                      <input
                        name="parkingSpace"
                        type="checkbox"
                        checked={editData.parkingSpace}
                        onChange={handleEditChange}
                        className="h-5 w-5 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                      <select
                        name="propertyType"
                        value={editData.propertyType}
                        onChange={handleEditChange}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      >
                        <option value="">Select Property Type</option>
                        <option value="Single Room">Single Room</option>
                        <option value="2-Bedroom">2-Bedroom</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Studio">Studio</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facilities</label>
                      <textarea
                        name="facilities"
                        value={editData.facilities}
                        onChange={handleEditChange}
                        placeholder="List facilities"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-24 resize-none"
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center gap-3">
                      <label className="block text-sm font-medium text-gray-700">Parties Allowed</label>
                      <input
                        name="partiesAllowed"
                        type="checkbox"
                        checked={editData.partiesAllowed}
                        onChange={handleEditChange}
                        className="h-5 w-5 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        placeholder="Full description"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-32 resize-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Images (1-5, Max 10MB each)</label>
                      <div className="relative">
                        <FiImage className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleEditImageChange}
                          className="w-full pl-10 p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-500 file:text-white file:hover:bg-indigo-600 transition-all"
                        />
                      </div>
                      <div className="mt-3 flex space-x-3 overflow-x-auto">
                        {editData.images.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img src={img} alt={`Preview ${idx}`} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                            <button
                              type="button"
                              onClick={() => handleEditRemoveImage(idx)}
                              className="absolute -top-2 -right-2 bg-rose-600/90 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md hover:bg-rose-700 transition-all"
                            >
                              <FiXSquare />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Video (Optional, Max 10MB)</label>
                      <div className="relative">
                        <FiVideo className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleEditVideoChange}
                          className="w-full pl-10 p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-500 file:text-white file:hover:bg-indigo-600 transition-all"
                        />
                      </div>
                      {editData.video && (
                        <video src={editData.video} controls className="mt-3 w-full max-w-md rounded-lg shadow-md" />
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading.edit}
                      className={`flex-1 p-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-all ${isLoading.edit ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLoading.edit ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        <>
                          <FiCheckSquare /> Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditData(null)}
                      className="flex-1 p-3 rounded-xl bg-gray-600/90 hover:bg-gray-700 text-white flex items-center justify-center gap-2 transition-all"
                    >
                      <FiXSquare /> Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60">
              <div className="p-6 border-b border-gray-200/60 flex items-center gap-4">
                <FiUser className="text-indigo-500 text-xl" />
                <h3 className="text-2xl font-semibold text-gray-900">Your Profile</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      value={agentFullName}
                      disabled
                      className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      value={agentEmail}
                      disabled
                      className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      value={agentPhone}
                      disabled
                      className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate</label>
                    {agentCertificate ? (
                      <img src={agentCertificate} alt="Certificate" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                    ) : (
                      <p className="text-gray-600">No certificate uploaded</p>
                    )}
                  </div>
                </div>
                <form onSubmit={handleProfileSubmit} className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                      <div className="relative">
                        <FiImage className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="w-full pl-10 p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-500 file:text-white file:hover:bg-indigo-600 transition-all"
                        />
                      </div>
                      {(profileData.passportPhoto || agentPassport) && (
                        <img
                          src={profileData.passportPhoto || agentPassport}
                          alt="Profile"
                          className="mt-3 w-24 h-24 object-cover rounded-full shadow-md"
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        name="currentPassword"
                        type="password"
                        value={profileData.currentPassword}
                        onChange={handleProfileChange}
                        placeholder="Enter current password"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading.profile}
                      className={`flex-1 p-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 transition-all ${isLoading.profile ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                        <>
                          <FiCheckSquare /> Update Profile
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      disabled={isLoading.profile}
                      className={`flex-1 p-3 rounded-xl bg-rose-600/90 hover:bg-rose-700 text-white flex items-center justify-center gap-2 transition-all ${isLoading.profile ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <FiTrash /> Delete Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Rented Apartments Tab */}
          {activeTab === 'rented' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60">
              <div className="p-6 border-b border-gray-200/60 flex items-center gap-4">
                <FiHome className="text-purple-500 text-xl" />
                <h3 className="text-2xl font-semibold text-gray-900">Rented Apartments</h3>
              </div>
              <div className="p-6">
                {apartments.filter(apt => apt.rentedBy).length === 0 ? (
                  <p className="text-gray-600">No apartments have been rented yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {apartments.filter(apt => apt.rentedBy).map((apt) => (
                      <div key={apt._id} className="bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-200/60">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{apt.title}</h4>
                        <p className="text-gray-600">Price: <span className="font-medium">₦{formatPrice(apt.pricePerDay)}/day</span></p>
                        <p className="text-gray-600">Rented By: <span className="font-medium">{apt.rentedBy?.email || 'Unknown User'}</span></p>
                        <p className="text-gray-600">Status: <span className="font-medium text-rose-800">Unavailable</span></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentDashboard;
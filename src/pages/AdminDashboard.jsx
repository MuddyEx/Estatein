import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiHome, FiUser, FiUsers, FiAlertCircle, FiBarChart, FiLogOut,
  FiCheckCircle, FiXCircle, FiTrash,  FiMapPin
} from 'react-icons/fi';
import { 
  getAllAgents, validateAgent, getApartments, 
  deleteAdminApartment, getAllUsers, deactivateUser, 
  getAllReports, resolveReport 
} from '../services/api.js';
import { logout } from '../slices/authSlice.js';

function AdminDashboard() {
  // Original state and logic - unchanged
  const [activeTab, setActiveTab] = useState('agents');
  const [agents, setAgents] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) navigate('/admin/login');
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [agentsRes, apartmentsRes, usersRes, reportsRes] = await Promise.all([
        getAllAgents(),
        getApartments(),
        getAllUsers(),
        getAllReports(),
      ]);
      setAgents(agentsRes.data);
      setApartments(apartmentsRes.data);
      setUsers(usersRes.data);
      setReports(reportsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // All handler functions remain exactly the same
  const handleValidate = async (agentId, status) => {
    try {
      await validateAgent({ agentId, status });
      fetchData();
    } catch (error) {
      alert(error.response?.data.message || 'Validation failed');
    }
  };

  const handleDeleteApartment = async (id) => {
    if (window.confirm('Are you sure you want to delete this apartment?')) {
      try {
        await deleteAdminApartment(id);
        fetchData();
      } catch (error) {
        alert(error.response?.data.message || 'Delete failed');
      }
    }
  };

  const handleDeactivateUser = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        await deactivateUser(id);
        fetchData();
      } catch (error) {
        alert(error.response?.data.message || 'Deactivation failed');
      }
    }
  };

  const handleResolveReport = async (id) => {
    try {
      await resolveReport(id);
      fetchData();
    } catch (error) {
      alert(error.response?.data.message || 'Resolve failed');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 h-screen p-6 fixed shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <FiHome className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
            AdminPanel
          </h2>
        </div>

        <nav className="space-y-2">
          {[
            { tab: 'agents', icon: <FiUser /> },
            { tab: 'apartments', icon: <FiMapPin /> },
            { tab: 'users', icon: <FiUsers /> },
            { tab: 'reports', icon: <FiAlertCircle /> },
            { tab: 'stats', icon: <FiBarChart /> }
          ].map(({ tab, icon }) => (
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
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
          {/* Agents Tab */}
          {activeTab === 'agents' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60">
              <div className="p-6 border-b border-gray-200/60 flex items-center gap-4">
                <FiUser className="text-indigo-500 text-xl" />
                <h3 className="text-2xl font-semibold text-gray-900">Agent Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/60">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/40">
                    {agents.map((agent) => (
                      <tr key={agent._id} className="hover:bg-gray-50/30">
                        <td className="px-6 py-4 font-medium text-gray-900">{agent.fullName}</td>
                        <td className="px-6 py-4 text-gray-600">{agent.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            agent.status === 'pending' ? 'bg-amber-100/80 text-amber-800' :
                            agent.status === 'approved' ? 'bg-emerald-100/80 text-emerald-800' : 'bg-rose-100/80 text-rose-800'
                          }`}>
                            {agent.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          {agent.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleValidate(agent._id, 'approved')}
                                className="px-4 py-2 bg-emerald-600/90 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2 text-sm"
                              >
                                <FiCheckCircle /> Approve
                              </button>
                              <button
                                onClick={() => handleValidate(agent._id, 'rejected')}
                                className="px-4 py-2 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2 text-sm"
                              >
                                <FiXCircle /> Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Apartments Tab */}
          {activeTab === 'apartments' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60">
              <div className="p-6 border-b border-gray-200/60 flex items-center gap-4">
                <FiMapPin className="text-emerald-500 text-xl" />
                <h3 className="text-2xl font-semibold text-gray-900">Apartment Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/60">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/40">
                    {apartments.map((apt) => (
                      <tr key={apt._id} className="hover:bg-gray-50/30">
                        <td className="px-6 py-4 font-medium text-gray-900">{apt.location}</td>
                        <td className="px-6 py-4 text-gray-600">${apt.price}</td>
                        <td className="px-6 py-4 text-gray-600">{apt.category}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100/80 text-blue-800">
                            {apt.availability}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteApartment(apt._id)}
                            className="px-4 py-2 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2 text-sm"
                          >
                            <FiTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60">
              <div className="p-6 border-b border-gray-200/60 flex items-center gap-4">
                <FiUsers className="text-purple-500 text-xl" />
                <h3 className="text-2xl font-semibold text-gray-900">User Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/60">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/40">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50/30">
                        <td className="px-6 py-4 font-medium text-gray-900">{user.fullName}</td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            user.active ? 'bg-green-100/80 text-green-800' : 'bg-rose-100/80 text-rose-800'
                          }`}>
                            {user.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {user.active && (
                            <button
                              onClick={() => handleDeactivateUser(user._id)}
                              className="px-4 py-2 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2 text-sm"
                            >
                              <FiXCircle /> Deactivate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60">
              <div className="p-6 border-b border-gray-200/60 flex items-center gap-4">
                <FiAlertCircle className="text-amber-500 text-xl" />
                <h3 className="text-2xl font-semibold text-gray-900">Report Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/60">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Apartment</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/40">
                    {reports.map((report) => (
                      <tr key={report._id} className="hover:bg-gray-50/30">
                        <td className="px-6 py-4 text-gray-700">{report.userId?.email || 'Unknown'}</td>
                        <td className="px-6 py-4 text-gray-700">{report.apartmentId?.location || 'Unknown'}</td>
                        <td className="px-6 py-4 text-gray-600 max-w-[300px] truncate">{report.description}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            report.status === 'pending' ? 'bg-amber-100/80 text-amber-800' : 'bg-emerald-100/80 text-emerald-800'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {report.status === 'pending' && (
                            <button
                              onClick={() => handleResolveReport(report._id)}
                              className="px-4 py-2 bg-emerald-600/90 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2 text-sm"
                            >
                              <FiCheckCircle /> Resolve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: 'Total Agents', value: agents.length, color: 'bg-indigo-500', icon: <FiUser /> },
                { title: 'Total Apartments', value: apartments.length, color: 'bg-emerald-500', icon: <FiMapPin /> },
                { title: 'Active Users', value: users.filter(u => u.active).length, color: 'bg-purple-500', icon: <FiUsers /> },
                { title: 'Pending Reports', value: reports.filter(r => r.status === 'pending').length, color: 'bg-amber-500', icon: <FiAlertCircle /> },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h4>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
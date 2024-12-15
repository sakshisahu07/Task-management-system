import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

  const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState({});
  const tasksPerPage = 5;
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate('/user/login');
      return;
    }
    fetchUserData();
    fetchUserTasks();
  }, [userId, navigate, currentPage]);

  useEffect(() => {
    if (tasks.length > 0) {
      sortTasks();
    }
  }, [tasks, sortOrder]);

  const fetchUserTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/user/${userId}?page=${currentPage}&limit=${tasksPerPage}`);
      
      if (response.data && response.data.tasks) {
        setTasks(response.data.tasks);
        setTotalPages(Math.ceil(response.data.total / tasksPerPage));
      } else {
        setTasks([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/auth/user/${userId}`);
      setUser(response.data);
      console.log('User data:', response.data); // Debug log
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleStatusChange = async (taskId, newStatus, currentStatus) => {
    if (newStatus === currentStatus) return;

    const isConfirmed = window.confirm(
      `Are you sure you want to change the status to ${newStatus}?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      setError('Failed to update task status');
      console.error('Error updating task:', err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'In-Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const sortTasks = () => {
    const priorityWeight = {
      'High': 3,
      'Medium': 2,
      'Low': 1
    };

    const sorted = [...tasks].sort((a, b) => {
      const weightA = priorityWeight[a.priority];
      const weightB = priorityWeight[b.priority];
      
      return sortOrder === 'desc' 
        ? weightB - weightA  // High to Low
        : weightA - weightB; // Low to High
    });

    setSortedTasks(sorted);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user.firstName ? `${user.firstName} ${user.lastName}` : user.username}Kunal !
              </h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Logged in as</p>
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
              </div>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium mb-3">Priority Legend</h3>
          <div className="flex space-x-4">
            {['High', 'Medium', 'Low'].map((priority) => (
              <div key={priority} className="flex items-center">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  priority === 'High' ? 'bg-red-500' :
                  priority === 'Medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></span>
                <span>{priority}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Task Priority Sort</h3>
            <button
              onClick={toggleSortOrder}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {sortOrder === 'desc' ? (
                <>
                  <span>High to Low</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Low to High</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {(!sortedTasks || sortedTasks.length === 0) ? (
            <div className="text-center py-4 text-gray-500">
              No tasks assigned to you yet
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                        <button 
                          onClick={toggleSortOrder}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          {sortOrder === 'desc' ? '↓' : '↑'}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedTasks.map((task) => (
                      <tr 
                        key={task._id}
                        className={`hover:bg-gray-50 ${
                          task.priority === 'High' ? 'bg-red-50' :
                          task.priority === 'Medium' ? 'bg-yellow-50' :
                          'bg-green-50'
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {task.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs truncate">{task.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            value={task.status} 
                            onChange={(e) => handleStatusChange(task._id, e.target.value, task.status)}
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                            currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          ←
                        </button>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300">
                          {currentPage}
                        </span>
                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                            currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          →
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {['High', 'Medium', 'Low'].map((priority) => {
            const count = sortedTasks.filter(task => task.priority === priority).length;
            return (
              <div 
                key={priority}
                className={`p-4 rounded-lg shadow ${
                  priority === 'High' ? 'bg-red-50 border-red-200' :
                  priority === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                } border`}
              >
                <h3 className="text-lg font-medium mb-2">{priority} Priority</h3>
                <p className="text-2xl font-bold">{count} tasks</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

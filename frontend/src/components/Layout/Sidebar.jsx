import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserGroupIcon, 
  ClipboardListIcon, 
  ViewListIcon,
  UsersIcon,
  LogoutIcon 
} from '@heroicons/react/outline';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-teal-700 to-teal-500 text-gray-100 min-h-screen shadow-lg flex flex-col justify-between">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-gray-50">Admin Panel</h2>
        <p className="text-sm text-teal-200">Manage your tasks and users efficiently</p>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul>
          <li>
            <Link 
              to="/admin/create-user" 
              className="flex items-center p-4 mb-2 hover:bg-teal-600 rounded-lg transition-all duration-300 group"
            >
              <UserGroupIcon className="h-6 w-6 mr-3 group-hover:text-yellow-400" />
              <span>Create User</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/create-task" 
              className="flex items-center p-4 mb-2 hover:bg-teal-600 rounded-lg transition-all duration-300 group"
            >
              <ClipboardListIcon className="h-6 w-6 mr-3 group-hover:text-yellow-400" />
              <span>Create Tasks</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/show-tasks" 
              className="flex items-center p-4 mb-2 hover:bg-teal-600 rounded-lg transition-all duration-300 group"
            >
              <ViewListIcon className="h-6 w-6 mr-3 group-hover:text-yellow-400" />
              <span>Show Tasks</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/show-users" 
              className="flex items-center p-4 mb-2 hover:bg-teal-600 rounded-lg transition-all duration-300 group"
            >
              <UsersIcon className="h-6 w-6 mr-3 group-hover:text-yellow-400" />
              <span>Show Users</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-teal-400">
        <button 
          onClick={handleLogout} 
          className="flex items-center w-full p-4 bg-teal-600 hover:bg-red-500 rounded-lg transition-all duration-300 group"
        >
          <LogoutIcon className="h-6 w-6 mr-3 group-hover:text-white" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

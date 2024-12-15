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
    <div className="w-64 bg-indigo-700 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Hi, Admin</h2>
      </div>
      
      <nav>
        <Link to="/admin/create-user" className="flex items-center p-3 mb-2 hover:bg-indigo-600 rounded-lg">
          <UserGroupIcon className="h-6 w-6 mr-2" />
          Create User
        </Link>
        
        <Link to="/admin/create-task" className="flex items-center p-3 mb-2 hover:bg-indigo-600 rounded-lg">
          <ClipboardListIcon className="h-6 w-6 mr-2" />
          Create Tasks
        </Link>
        
        <Link to="/admin/show-tasks" className="flex items-center p-3 mb-2 hover:bg-indigo-600 rounded-lg">
          <ViewListIcon className="h-6 w-6 mr-2" />
          Show Tasks
        </Link>
        
        <Link to="/admin/show-users" className="flex items-center p-3 mb-2 hover:bg-indigo-600 rounded-lg">
          <UsersIcon className="h-6 w-6 mr-2" />
          Show Users
        </Link>
        
        <button 
          onClick={handleLogout}
          className="flex items-center p-3 mb-2 hover:bg-indigo-600 rounded-lg w-full"
        >
          <LogoutIcon className="h-6 w-6 mr-2" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;


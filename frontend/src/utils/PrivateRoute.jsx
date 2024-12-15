import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/" />;
  }

  // For user routes
  if (userRole === 'user') {
    return children;
  }

  // For admin routes
  if (userRole === 'admin') {
    return children;
  }

  return <Navigate to="/" />;
};

export default PrivateRoute; 
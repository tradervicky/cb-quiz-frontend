import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


// Protected route for unauthenticated users only
const UnauthenticatedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  // Extract isAuthenticated and user from the auth slice
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Redirect authenticated users to their dashboard based on role
  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/dashboard" />;
    } else if (user?.role === 'user') {
      return <Navigate to="/user/test-dashboard" />;
    }
  }

  // If the user is not authenticated, render the child components (login/signup pages)
  return children;
};

export default UnauthenticatedRoute;


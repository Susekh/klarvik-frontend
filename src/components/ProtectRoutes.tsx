import IsAuthenticated from '@/auth/IsAuthenticated';
import { RootState } from '@/store/store';
import { login, logout } from '@/store/userSlice';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentShimmer from './loaders/shimmers/ContentShimmer';

type Props = {
  children: ReactNode;
  isProtected: boolean;
};

type UserType = {
  id: number;
  createdAt: Date;
  username: string;
  imgUrl?: string;
  email?: string;
};

type UserLoggedInResponse = {
  status: boolean;
  userData: UserType;
};

function ProtectRoutes({ children, isProtected }: Props) {
  const user: UserLoggedInResponse = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true); // Set loading to true before starting the check

      if (!user.status) {
        // User status is false, check with backend
        const res = await IsAuthenticated();

        if (res?.status === 'success') {
          // Update Redux state if authenticated
          dispatch(login(res?.user));
        } else {
          // If not authenticated, ensure status is set correctly
          dispatch(logout());
        }
      }

      // Handle redirection logic after authentication check
      if (isProtected) {
        if (user.status) {
          if (location.pathname === '/auth') {
            navigate('/dashboard'); // Redirect if already authenticated and on auth page
          } else {
            setLoading(false); // Set loading to false after authentication check is done
          }
        } else {
          if (location.pathname !== '/auth') {
            navigate('/auth'); // Redirect to auth page if not authenticated
          } else {
            setLoading(false); // Set loading to false after check
          }
        }
      } else {
        setLoading(false); // For non-protected routes, set loading to false immediately
      }
    };

    // Run the authentication check on component mount and whenever user status changes
    checkAuthentication();
  }, [user.status, isProtected, navigate, location.pathname, dispatch]);

  // Show a loading state while the authentication check is in progress
  if (isProtected && loading) {
    return <ContentShimmer />;
  }

  // Render the children only when authentication check is complete
  return <>{children}</>;
}

export default ProtectRoutes;

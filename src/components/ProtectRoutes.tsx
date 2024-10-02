import IsAuthenticated from '@/auth/IsAuthenticated';
import { RootState } from '@/store/store';
import { login, logout } from '@/store/userSlice';
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentShimmer from './loaders/shimmers/ContentShimmer';

type props = {
    children : ReactNode
}

function ProtectRoutes({children} : props) {

  /*
  - check if user is logged in by verifying jwt tokens then populate slices in store
  - if not logged in redirect to auth page
  */

  const user = useSelector((store : RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
        if (!user.status) {
            // User status is false, check with backend
            const res = await IsAuthenticated();

            if (res?.status === "success") {
                // Update Redux state if authenticated
                dispatch(login(res?.user));
            } else {
                // If not authenticated, ensure status is set correctly
                dispatch(logout());
            }
        } 

        // Handle redirection based on authentication status and current path
        if (user.status) {
            if (location.pathname === '/auth') {
                navigate('/');
            } else {
                setLoading(false);
            }
        } 
        if(!user.status) {
            if (location.pathname !== '/auth') {
                navigate('/auth');
            } else {
                setLoading(false);
            }
        }
    };

    checkAuthentication();
}, [user.status, navigate, location.pathname, dispatch]);

  return <>{loading ? <ContentShimmer/> : children}</>;
}

export default ProtectRoutes
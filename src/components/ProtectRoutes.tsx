import IsAuthenticated from '@/auth/IsAuthenticated';
import { RootState } from '@/store/store';
import { login, logout } from '@/store/userSlice';
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentShimmer from './loaders/shimmers/ContentShimmer';

type props = {
    children : ReactNode,
    isProtected : boolean
}
type userType = {
    id : number,
    createdAt : Date,
    username : string,
    imgUrl? : string,
    email? : string,
}

type UserLoggedInResponse = {
    status : boolean,
    userData : userType,
}

function ProtectRoutes( {children, isProtected} : props) {

  /*
  - check if user is logged in by verifying jwt tokens then populate slices in store
  - if not logged in redirect to auth page
  */

  const user : UserLoggedInResponse = useSelector((store : RootState) => store.user);
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

        console.log("userStatus ::", user.status);
        
        
        console.log('pathName ::', location.pathname);

        if(isProtected){
            // Handle redirection based on authentication status and current path
            if (user.status) {
                if (location.pathname === '/auth') {
                    navigate('/profile');
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
        }
    };

    if (isProtected) {
        checkAuthentication();
    } else {
        setLoading(false); 
    }
}, [user.status,isProtected, navigate, location.pathname, dispatch]);


    if (isProtected && loading) {
        return <ContentShimmer />;
    }

    return <>{children}</>;
}

export default ProtectRoutes
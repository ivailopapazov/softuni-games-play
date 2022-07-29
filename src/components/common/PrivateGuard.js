import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

const PrivateGuard = ({children}) => {
    const { isAuthenticated } = useAuthContext();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />  
};

export default PrivateGuard;

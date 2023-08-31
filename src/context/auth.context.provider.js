import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAccessToken, getUser, logout } from '../Redux/Reducers/authSlice';
import { createContext, useMemo } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export const AuthProvide = ({children}) => {
  const accessToken = useSelector(getAccessToken);
  console.log("Debugger", accessToken);

  const value = useMemo(() => ({}), []);
  if (!accessToken) {
    console.log(accessToken);
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
};
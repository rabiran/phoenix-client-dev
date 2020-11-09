import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/authSlice';

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const toRender = children;
  return (
    <Route
      {...rest}
      render={({ location }) => 
        isAuthenticated ? (toRender) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />)
      }
    />);
}

export default ProtectedRoute;
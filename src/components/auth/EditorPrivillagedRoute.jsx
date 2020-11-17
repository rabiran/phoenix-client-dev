import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUserCanEdit } from '../../features/auth/authSlice';

const EditorPrivillagedRoute = ({ children, ...rest }) => {
  const isPrivillaged = useSelector(selectIsUserCanEdit);
  return (
    <Route
      {...rest}
      render={({ location }) => 
        isPrivillaged ? (children) : (
          <Redirect
            to={{
              pathname: '/kermit',
              state: { from: location }
            }}
          />)
      }
    />);
}

export default EditorPrivillagedRoute;
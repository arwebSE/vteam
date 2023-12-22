
import React from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: true, // Mocked value for isLoggedIn
});

const withAuthMock = (Component) => {
  const WithAuthMock = (props) => {
    return <Component {...props} />;
  };

  return WithAuthMock;
};

export default withAuthMock;
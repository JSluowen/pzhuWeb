import React from 'react';
import { useSelector } from 'react-redux';
import { ADMIN } from 'src/consts';

const Auth: React.FC<{
  limitUser?: number[];
}> = ({ limitUser = ADMIN, children }) => {
  const user = useSelector(state => state.user);
  return <>{limitUser.includes(user.auth) && children}</>;
};
export default Auth;

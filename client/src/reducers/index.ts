// action types
const INIT_USER = 'initUser';
const LOGOUT = 'DELETE_COMMENT';

interface IUser {
  name: string;
  auth: number;
}

// reducer
const User = (state: { user: IUser }, action) => {
  if (!state) {
    state = {
      user: {
        name: '',
        auth: null,
      },
    };
  }
  switch (action.type) {
    case INIT_USER:
      return { user: action.payload };
    case LOGOUT:
      return {
        user: {},
      };
    default:
      return state;
  }
};

// action creators
export const initUser = user => {
  return { type: INIT_USER, user };
};

export const logout = () => {
  return { type: LOGOUT };
};

export default User;

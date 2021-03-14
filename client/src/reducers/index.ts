// action types
const INIT_USER = 'INIT_USER';
const LOGOUT = 'DELETE_COMMENT';

// reducer
export default function(state, action) {
  if (!state) {
    state = { user: {} };
  }
  switch (action.type) {
    case INIT_USER:
      // 初始化评论
      return { user: action.user };
    case LOGOUT:
      // 删除评论
      return {
        user: {},
      };
    default:
      return state;
  }
}

// action creators
export const initUser = user => {
  return { type: INIT_USER, user };
};

export const logout = () => {
  return { type: LOGOUT };
};

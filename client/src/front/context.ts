import React from 'react';
const state: IContext = {
  avatar: 'http://img.pzhuweb.cn/logo.ico',
};

const context = React.createContext(state);
export { state, context };

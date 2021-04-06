import React, { memo, FC } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, BrowserRouter, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Routes } from './router';
import User from 'src/reducers';
import 'front/reset.scss';

let store = createStore(User, applyMiddleware(thunk));
const Main: FC = memo(() => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {Routes.map((item, index) => (
            <Route key={index} exact={item.exact} path={item.path} component={item.component} />
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
});

ReactDOM.render(<Main />, document.getElementById('front'));

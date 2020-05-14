import { BrowserRouter as Router, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './reset.scss';
import ReactDOM from 'react-dom';
import React, { memo, FC } from 'react';
import { Routes } from './router';
const Main: FC = memo(() => {
  return (
    <BrowserRouter>
      <Switch>
        {Routes.map((item, index) => (
          <Route key={index} exact={item.exact} path={item.path} component={item.component} />
        ))}
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
});
ReactDOM.render(<Main />, document.getElementById('js_react_root'));

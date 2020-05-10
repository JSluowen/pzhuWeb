import React, { memo, FC } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Routes } from './router';
import 'front/reset.scss';
const Main: FC = memo(() => {
  return (
    <BrowserRouter>
      <Switch>
        {Routes.map((item, index) => (
          <Route key={index} exact={item.exact} path={item.path} component={item.component} />
        ))}
      </Switch>
    </BrowserRouter>
  );
});

ReactDOM.render(<Main />, document.getElementById('front'));

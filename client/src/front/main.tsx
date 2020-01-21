import React, { memo, FC } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Layout from 'src/front/layout';
import 'front/reset.scss';
import { state, context } from 'src/front/context';

const Main: FC = memo(() => {
  return (
    <context.Provider value={state}>
      <BrowserRouter>
        <Route path="/" component={Layout} />
        <Redirect to="/home" />
      </BrowserRouter>
    </context.Provider>
  );
});

ReactDOM.render(<Main />, document.getElementById('front'));

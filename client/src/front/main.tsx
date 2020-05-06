import React, { memo, FC } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Layout from 'src/front/layout';
import 'front/reset.scss';
const Main: FC = memo(() => {
  return (
    <BrowserRouter>
      <Route path="/" component={Layout} />
    </BrowserRouter>
  );
});

ReactDOM.render(<Main />, document.getElementById('front'));

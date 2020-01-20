import React, { memo, FC } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Layout from 'src/front/layout';
import { Home } from 'src/front/pages';
import 'src/front/reset.scss';
import { state, context } from 'src/front/context';

const Main: FC = memo(() => {
  return (
    <context.Provider value={state}>
      <BrowserRouter basename="/">
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/article"></Route>
        </Layout>
      </BrowserRouter>
    </context.Provider>
  );
});

ReactDOM.render(<Main />, document.getElementById('front'));

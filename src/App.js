import React, { useState } from 'react';
import Sidebar from './features/sidebar/Sidebar';
import Headerbar from './features/headerbar/Headerbar';
import routes from './routes';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="ui-right">
          <Headerbar 
            showBackButton={true}
          />
          <div className="content-area">
            <div className="content">
              <Switch>
                {routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default App;

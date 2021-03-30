import React from 'react';
import Sidebar from './features/sidebar/Sidebar';
import Headerbar from './features/headerbar/Headerbar';
import routes from './routes';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

/*******************************************************************************************************/
/* FOR TEST FEATURES ***********************************************************************************/
/*******************************************************************************************************/
import { useState } from 'react';
/*******************************************************************************************************/

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Router>
      <Switch>
        <Route exact path="/workspace/:id/lab">
          <WorkspaceApp />
        </Route>
        <Route exact path="*">
          <MainApp darkMode={darkMode} setDarkMode={setDarkMode} />
        </Route>
      </Switch>
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

function MainApp({darkMode, setDarkMode}) {
  return (
    <div id="app" data-dark={darkMode}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
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
              <Redirect from="/" to="/projects" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspaceApp() {
  return (
    <div className="app">
      ciao pippo!!
    </div>
  );
}

export default App;

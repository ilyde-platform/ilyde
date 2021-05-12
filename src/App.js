import React, { useEffect } from 'react';
import Sidebar from './features/sidebar/Sidebar';
import SidebarWorkspace from './features/sidebar/SidebarWorkspace';
import Headerbar from './features/headerbar/Headerbar';
import { WorkspaceDetail } from './WorkspaceDetail';
import routes from './routes';
import { useSelector, useDispatch } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import { selectPreferences } from './features/preferences/preferencesSlice';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { fetchUsers } from './features/users/usersSlice';
import { fetchCenvs } from './features/cenvs/cenvsSlice';
import { fetchHwtiers } from './features/hwtiers/hwtiersSlice';
import { fetchIdes } from './features/ides/idesSlice';
import { fetchModelapis } from './features/modelapis/modelapisSlice';
import { fetchDatasets } from './features/datasets/datasetsSlice';


function App() {
  const {keycloak, initialized} = useKeycloak();

  if (!keycloak.authenticated && initialized){
    keycloak.login();
  }

  if (keycloak.authenticated && initialized)
    return (
      <Router>
        <Switch>
          <Route exact path="/workspace/:workspaceId/lab">
            <WorkspaceApp />
          </Route>
          <Route exact path="*">
            <MainApp />
          </Route>
        </Switch>
      </Router>
    );
  else{
    return (<div>App is initializing.....</div>);
  }
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component  routes={route.routes} {...route.componentProps} />
      )}
    />
  );
}

function MainApp() {
  const preferences = useSelector(selectPreferences);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchIdes());
    dispatch(fetchCenvs());
    dispatch(fetchHwtiers());
    dispatch(fetchDatasets());
    dispatch(fetchModelapis());

    const intervalID = setInterval(() => {
      dispatch(fetchUsers());
      dispatch(fetchHwtiers());
      dispatch(fetchDatasets());
      dispatch(fetchModelapis());
    }, 300000);

    return () => {clearInterval(intervalID);}
  }, []);

  return (
    <div id="app" data-dark={preferences.darkMode}>
      <Sidebar/>
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
  const preferences = useSelector(selectPreferences);
  return (
    <div id="app" data-dark={preferences.darkMode}>
      <WorkspaceDetail />
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { retrieveProject } from './projectsSlice';
import {
  Redirect,
  useParams,
  Switch,
} from "react-router-dom";
import { RouteWithSubRoutes } from '../../App';


export function ProjectDetail(props) {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(retrieveProject(projectId));
  }, [projectId]);

  return (
    <Switch>
      {props.routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
      <Redirect from="/projects/:projectId" to="/projects/:projectId/files" />
    </Switch>
  );
}

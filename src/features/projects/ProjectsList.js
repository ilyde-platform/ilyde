import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import TableCozy from '../../components/TableCozy';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { fetchProjects, selectProjectsByState } from './projectsSlice';
import { selectAllUsers } from '../users/usersSlice';


export function ProjectsList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => selectProjectsByState(state, props.state));
  const users = useSelector(selectAllUsers)

  const options = {
    defaultSortCol: "create_at",
    defaultSortDir: "desc",
    onRowClick: (d) => {
      history.push(`/projects/${d.id}/files`);
    },
  };
  const columns = [
    {
      headerText: "Name",
      id: "name",
      sortable: true,
      style: "normal",
      type: "text",
    }, {
      headerText: "",
      id: "description",
      sortable: false,
      style: "small-grey",
      type: "text",
    }, {
      headerText: "Type",
      id: "template",
      sortable: true,
      style: "normal",
      type: "text",
    },
    {
      headerText: "Lead",
      id: "owner",
      sortable: true,
      style: "normal",
      type: "text",
    }
  ]

  let tableOptions = options;
  const tableColumns = columns;

  useEffect(() => {
    dispatch(setContentTitle({title: props.pageTitle, subtitle: projects.length + ' items'}));
  },[props, projects]);

  useEffect(() => {
    let body = { "query": {"state": props.state, "visibility": "PRIVATE"}};
    dispatch(fetchProjects(body));
    body.query.visibility = "PUBLIC";
    dispatch(fetchProjects(body));
  }, []);

  /* useEffect(() => {
    let mounted = true;
    if (isUsersLoad){
      const apiConfig = getIlydeApiConfiguration();
      const projectsApi = new ProjectsApi(apiConfig);
      let body = { "query": {"state": props.state, "visibility": "PRIVATE"}};

      projectsApi.listProjects(body).then((result) => {
        if (mounted){
          parseProjectsData(result.data.data, users);
          setPrivateProjects(result.data);
        }
      });

      body.query.visibility = "PUBLIC";
      projectsApi.listProjects(body).then((result) => {
        if (mounted){
          parseProjectsData(result.data.data, users);
          setPublicProjects(result.data);
        }
      });
    }

    return () => {
      mounted = false;
    }
  }, [props, isUsersLoad, users]); */

  return (
    <Fragment>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="#">Your Projects</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Public Projects</a>
        </li>
      </ul>
      <TableCozy
        columns={tableColumns}
        data={projects.filter((project) => project.visibility === "PRIVATE").map((project) => parseProjectData(project, users))}
        options={tableOptions}
      />
    </Fragment>
  );
}

function parseProjectData(p, users){
  let obj = Object.assign({}, p);
  obj.template = capitalize(p.template);
  for (let u of users){
    if (p.owner == u.id){
      let fullname;
      if (u.first_name && u.last_name){
        fullname = `${capitalize(u.first_name)} ${capitalize(u.last_name)}`;
      }
      else{
        fullname = capitalize(u.username);
      }
      obj.owner = fullname;
    }
  }
  return obj;
}

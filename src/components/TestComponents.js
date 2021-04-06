import React, { useEffect, useContext, useState } from 'react';
import {useDispatch} from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import TableCozy from './TableCozy';
import { contents } from '../testContents.js';
import {setContentTitle} from '../features/headerbar/headerbarSlice';
import { Configuration, ProjectsApi } from '../services/ilyde';
import { useKeycloak } from '@react-keycloak/web';


export function Archive() {
  const contentId = "archive";
  const contentData = contents.hasOwnProperty(contentId) ? contents[contentId] : null;
  const dispatch = useDispatch();

  const table = contentData.hasOwnProperty("table") ? contentData.table : null;
  if (!table) { throw "Remember to fix this"; }
  const tableOptions = table.options;
  const tableColumns = table.columns;
  const tableData = table.data;
  useEffect(() => {
    dispatch(setContentTitle({title: "Archive", subtitle: tableData.length + ' items'}));
  });

  return (
    <TableCozy
      columns={tableColumns}
      data={tableData}
      options={tableOptions}
    />
  );

}

export function Projects() {
  let content;
  const contentId = "projects";
  const contentData = contents.hasOwnProperty(contentId) ? contents[contentId] : null;
  const dispatch = useDispatch();
  const history = useHistory();
  const {keycloak} = useKeycloak();

  const table = contentData.hasOwnProperty("table") ? contentData.table : null;
  if (!table) { throw "Remember to fix this"; }
  let tableOptions = table.options;
  const tableColumns = table.columns;
  const tableData = table.data;
  tableOptions.onRowClick = (d) => {
      history.push(`/projects/${d.id}/workspaces`);
  }
  useEffect(() => {
    dispatch(setContentTitle({title: "Projects", subtitle: tableData.length + ' items'}));
  });
  useEffect(() => {
    const configuration = new Configuration({basePath: "http://kubernetes.docker.internal:30080/api/v1", baseOptions: {
      headers: {Authorization: `Bearer ${keycloak.token}`},
    }});
    const projectsApi = new ProjectsApi(configuration);
    const body = { "query": {"state": "OPEN", "visibility": "PRIVATE"}};
    console.log(projectsApi);
    projectsApi.listProjects(body).then((result) => {
      console.log(result.data);
    });
  }, []);
  return  (
    <TableCozy
      columns={tableColumns}
      data={tableData}
      options={tableOptions}
    />
  );
}

export function Workspaces() {
  const contentId = "workspaces";
  const contentData = contents.hasOwnProperty(contentId) ? contents[contentId] : null;
  const dispatch = useDispatch();

  const table = contentData.hasOwnProperty("table") ? contentData.table : null;
  if (!table) { throw "Remember to fix this"; }
  const tableOptions = table.options;
  const tableColumns = table.columns;
  const tableData = table.data;
  useEffect(() => {
    dispatch(setContentTitle({title: "Workspaces", subtitle: tableData.length + ' items'}));
  });

  return  (
    <TableCozy
      columns={tableColumns}
      data={tableData}
      options={tableOptions}
    />
  );

}

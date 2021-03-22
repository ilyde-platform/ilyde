import React, { useEffect, useContext, useState } from 'react';
import {useDispatch} from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import TableCozy from './TableCozy';
import { contents } from '../testContents.js';
import {setContentTitle} from '../features/headerbar/headerbarSlice';


export function Archive() {
  let content;
  const contentId = "archive";
  const contentData = contents.hasOwnProperty(contentId) ? contents[contentId] : null;
  const dispatch = useDispatch();
  
  if (!contentData) {
    return (
      <span className="font-m">
        {`No content available named '${contentId}'`}
      </span>
    );
  } else {
    const table = contentData.hasOwnProperty("table") ? contentData.table : null;
    if (!table) { throw "Remember to fix this"; }
    const tableOptions = table.options;
    const tableColumns = table.columns;
    const tableData = table.data;
    // dispatch changes 
    dispatch(setContentTitle({title: "Archive", subtitle: tableData.length + ' items'}));

    return (
      <TableCozy 
        columns={tableColumns}
        data={tableData}
        options={tableOptions}
      />
    );
  }
}

export function Projects() {
  let content;
  const contentId = "projects";
  const contentData = contents.hasOwnProperty(contentId) ? contents[contentId] : null;
  const dispatch = useDispatch();
  const history = useHistory();

  if (!contentData) {
    return (
      <span className="font-m">
        {`No content available named '${contentId}'`}
      </span>
    );
  } else {
    const table = contentData.hasOwnProperty("table") ? contentData.table : null;
    if (!table) { throw "Remember to fix this"; }
    let tableOptions = table.options;
    const tableColumns = table.columns;
    const tableData = table.data;
    tableOptions.onRowClick = (d) => {
       history.push(`/projects/${d.id}/workspaces`);
    }
    // dispatch changes 
    dispatch(setContentTitle({title: "Projects", subtitle: tableData.length + ' items'}));

    return  (
      <TableCozy 
        columns={tableColumns}
        data={tableData}
        options={tableOptions}
      />
    );
  }
}

export function Workspaces() {

  const contentId = "workspaces";
  const contentData = contents.hasOwnProperty(contentId) ? contents[contentId] : null;
  const dispatch = useDispatch();

  if (!contentData) {
    return (
      <span className="font-m">
        {`No content available named '${contentId}'`}
      </span>
    );
  } else {
    const table = contentData.hasOwnProperty("table") ? contentData.table : null;
    if (!table) { throw "Remember to fix this"; }
    const tableOptions = table.options;
    const tableColumns = table.columns;
    const tableData = table.data;
    // dispatch changes 
    dispatch(setContentTitle({title: "Workspaces", subtitle: tableData.length + ' items'}));

    return  (
      <TableCozy 
        columns={tableColumns}
        data={tableData}
        options={tableOptions}
      />
    );
  }
}





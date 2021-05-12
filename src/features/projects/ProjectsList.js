import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import TableCozy from '../../components/TableCozy';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from '../../services/utils';
import { ProjectsApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import { Paging } from '../../components/Pagination';
import { Tabs, Tab } from 'react-bootstrap';
import _ from 'lodash';


export function ProjectsList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(selectAllUsers);

  const [pageLimit, setPageLimit] = useState(25);
  const [publicProjects, setPublicProjects] = useState({data: [], total: 0, limit: pageLimit, page: 1});
  const [projects, setProjects] = useState({data: [], total: 0, limit: pageLimit, page: 1});

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
    dispatch(setContentTitle({title: props.pageTitle, subtitle: projects.total + publicProjects.total + ' items'}));
  },[props, projects, publicProjects]);

  useEffect(() => {
    let mounted = true;
    getProjects(props.state, "PRIVATE", 1, pageLimit).then((response) => {
      setProjects(response);
    });

    getProjects(props.state, "PUBLIC",  1, pageLimit).then((response) => {
      setPublicProjects(response);
    });

    return () => {
      mounted = false;
    }
  }, [props]);

  const handleProjectsPaginationItemClick = (page) => {
    getProjects(props.state, "PRIVATE", page, pageLimit).then((results) => {
      setProjects(results);
    })
  }

  const handlePublicProjectsPaginationItemClick = (page) => {
    getProjects(props.state, "PUBLIC", page, pageLimit).then((results) => {
      setPublicProjects(results);
    })
  }

  return (
    <Fragment>
      <Tabs defaultActiveKey="private" >
        <Tab eventKey="private" title="Your Projects">
          <TableCozy
            columns={tableColumns}
            data={projects.data.map((project) => parseProjectData(project, users))}
            options={tableOptions}
          />
          <Paging
            total={projects.total}
            page={projects.page}
            limit={pageLimit}
            handlePaginationItemClick={handleProjectsPaginationItemClick}
          />
        </Tab>
        <Tab eventKey="public" title="Public Projects">
          <TableCozy
            columns={tableColumns}
            data={publicProjects.data.map((project) => parseProjectData(project, users))}
            options={tableOptions}
          />
          <Paging
            total={publicProjects.total}
            page={publicProjects.page}
            limit={pageLimit}
            handlePaginationItemClick={handlePublicProjectsPaginationItemClick}
          />
        </Tab>
      </Tabs>
    </Fragment>
  );
}

function parseProjectData(p, users){
  let obj = Object.assign({}, p);
  obj.template = _.capitalize(p.template);
  const username = _.find(users, ["id", p.owner])?.username;
  obj.owner = _.capitalize(username);
  return obj;
}

function getProjects(state, visibility, page, limit){
  const apiConfig = getIlydeApiConfiguration();
  const projectsApi = new ProjectsApi(apiConfig);
  let body = { "query": {"state": state, "visibility": visibility}, "page": page, "limit": limit};

  return projectsApi.listProjects(body).then((response) => {
    return response.data;
  });
}

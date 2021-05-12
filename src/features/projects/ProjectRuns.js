import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import TableCozy2 from '../../components/TableCozy2';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from '../../services/utils';
import { ProjectsApi, RunsApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import { selectProjectById } from './projectsSlice';
import _ from "lodash";
import { ProjectRunForm } from './ProjectRunForm';
import { Paging } from '../../components/Pagination';


export function ProjectRuns(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(selectAllUsers);
  const { projectId } = useParams();
  const project = useSelector(state => selectProjectById(state, projectId));
  const [pageLimit, setPageLimit] = useState(10);
  const [runs, setRuns] = useState({data: [], total: 0, limit: pageLimit, page: 1});
  const title = "Runs";

  useEffect(() => {
    dispatch(setContentTitle({title: title, subtitle: runs?.total + " items"}));
  },[runs]);

  useEffect(()=>{
    let mounted = true;
    getRuns(projectId, pageLimit, 1).then((results) => {
      setRuns(results);
    });

    return () => {
      mounted = false;
    }
  }, [projectId]);

  useEffect(() => {
    const apiConfig = getIlydeApiConfiguration();
    const runsApi = new RunsApi(apiConfig);
    const intervalID = setInterval(() => {
      let updates = [];
      runs.data.
      filter((w) => ["STARTING", "RUNNING"].includes(w.state)).
      forEach((item, i, array) => {
        updates.push(runsApi.stateRun(item.id).then((response) => {
          if (item.state === response.data.state){
            return item;
          }else{
            return runsApi.retrieveRun(item.id).then((response) => {
              return response.data;
            });
          }
        }));
      });
      Promise.all(updates).then((values) => {
        setRuns({...runs, data: _.unionBy(values, runs.data, "id")});
      });
    }, 15000);

    return () => {clearInterval(intervalID);}

  }, [runs]);

  const tableOptions = {
    defaultSortCol: "created",
    defaultSortDir: "desc",
    onRowClick: (d) => {
      history.push(`/projects/${projectId}/runs/${d.id}`);
    }
  };
  const tableColumns = [
    {
      headerText: "Name",
      id: "name",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "User",
      id: "owner",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "State",
      id: "state",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "Start Time",
      id: "create_at",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "Execution Time(s)",
      id: "uptime",
      sortable: true,
      style: "normal",
      type: "text",
    },
  ]

  const getUsername = (userId) => {
    const user = _.find(users, ["id", userId]);
    return _.capitalize(user?.username);
  }

  const handleFormSubmitted = () => {
    getRuns(projectId, pageLimit, 1).then((results) => {
      setRuns(results);
    });
  }

  const handleRunsPaginationItemClick = (page) => {
    getRuns(projectId, pageLimit, page).then((results) => {
      setRuns(results);
    })
  }

  return (
    <Fragment>
      <ProjectRunForm projectId={projectId} handleSubmitted={handleFormSubmitted}></ProjectRunForm>
      <div className="mb-5"></div>
      <TableCozy2
        columns={tableColumns}
        data={runs.data.map((r) => {
          const d = new Date(r.create_at);
          return {
            id: r.id,
            create_at: d.toLocaleString(),
            created: r.create_at,
            uptime: r.uptime,
            name: r.metadata.name,
            state: _.capitalize(r.state),
            owner: getUsername(r.metadata.owner)}
        })}
        options={tableOptions}
      />
      <Paging
        total={runs.total}
        page={runs.page}
        limit={pageLimit}
        handlePaginationItemClick={handleRunsPaginationItemClick}
      />
    </Fragment>
  );
}

function getRuns(projectId, limit, page){
  const apiConfig = getIlydeApiConfiguration();
  const projectsApi = new ProjectsApi(apiConfig);
  return projectsApi.listProjectRuns(projectId, limit, page).then((response) => {
    return response.data;
  });
}

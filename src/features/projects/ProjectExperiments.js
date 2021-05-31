import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import TableCozy2 from '../../components/TableCozy2';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from '../../services/utils';
import { ProjectsApi, ExperimentsApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import { selectProjectById, retrieveProject } from './projectsSlice';
import _ from "lodash";
import { Paging } from '../../components/Pagination';
import { ProjectExperimentForm } from './ProjectExperimentForm';


export function ProjectExperiments(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(selectAllUsers);
  const { projectId } = useParams();
  const [pageLimit, setPageLimit] = useState(10);
  const project = useSelector(state => selectProjectById(state, projectId));
  const [experiments, setExperiments] = useState({data: [], total: 0, limit: pageLimit, page: 1});
  const title = "Experiments";

  useEffect(() => {
    dispatch(setContentTitle({title: title, subtitle: experiments.total + " items"}));
  },[experiments]);

  useEffect(()=>{
    let mounted = true;
    getExperiments(projectId, pageLimit, 1).then((results) => {
      setExperiments(results);
    });

    return () => {
      mounted = false;
    }
  }, [projectId]);

  useEffect(() => {
    const apiConfig = getIlydeApiConfiguration();
    const experimentsApi = new ExperimentsApi(apiConfig);
    const intervalID = setInterval(() => {
      let updates = [];
      experiments.data.
      filter((w) => ["STARTING", "RUNNING"].includes(w.state)).
      forEach((item, i, array) => {
        updates.push(experimentsApi.stateExperiment(item.id).then((response) => {
          if (item.state === response.data.state){
            return item;
          }else{
            return experimentsApi.retrieveExperiment(item.id).then((response) => {
              return response.data;
            });
          }
        }));
      });
      Promise.all(updates).then((values) => {
        setExperiments({...experiments, data: _.unionBy(values, experiments.data, "id")});
      });
    }, 15000);

    return () => {clearInterval(intervalID);}

  }, [experiments]);

  const tableOptions = {
    defaultSortCol: "created",
    defaultSortDir: "desc",
    onRowClick: (d) => {
      history.push(`/projects/${projectId}/experiments/${d.id}`);
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
      headerText: "Author",
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

  const handleExperimentsPaginationItemClick = (page) => {
    getExperiments(projectId, pageLimit, page).then((results) => {
      setExperiments(results);
    })
  }

  const handleFormSubmitted = () => {
    getExperiments(projectId, pageLimit, 1).then((results) => {
      setExperiments(results);
    });
  }

  return (
    <Fragment>
      <ProjectExperimentForm projectId={projectId} handleSubmitted={handleFormSubmitted}></ProjectExperimentForm>
      <div className="mb-5"></div>
      <TableCozy2
        columns={tableColumns}
        data={experiments.data.map((e) => {
          const d = new Date(e.create_at);
          return {
            id: e.id,
            create_at: d.toLocaleString(),
            created: e.create_at,
            uptime: e.uptime,
            name: e.metadata.name,
            state: _.capitalize(e.state),
            owner: getUsername(e.metadata.owner)}
        })}
        options={tableOptions}
      />
      <Paging
        total={experiments.total}
        page={experiments.page}
        limit={pageLimit}
        handlePaginationItemClick={handleExperimentsPaginationItemClick}
      />
    </Fragment>
  );
}

function getExperiments(projectId, limit, page){
  const apiConfig = getIlydeApiConfiguration();
  const projectsApi = new ProjectsApi(apiConfig);
  return projectsApi.listProjectExperiments(projectId, limit, page).then((response) => {
    return response.data;
  });
}

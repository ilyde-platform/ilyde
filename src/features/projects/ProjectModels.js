import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import TableCozy from '../../components/TableCozy';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from '../../services/utils';
import { ProjectsApi, ModelsApi } from '../../services/ilyde';
import { selectProjectById } from './projectsSlice';
import _ from "lodash";
import { ModelModalForm } from './ModelModalForm';


export function ProjectModels(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const project = useSelector(state => selectProjectById(state, projectId));
  const [models, setModels] = useState({data: []});
  const title = "Models";

  useEffect(() => {
    dispatch(setContentTitle({title: title, subtitle: models.data.length + " items"}));
  },[models]);

  useEffect(()=>{
    let mounted = true;
    getModels(projectId).then((results) => {
      setModels(results);
    })
    return () => {
      mounted = false;
    }
  }, [projectId]);


  const tableOptions = {
    defaultSortCol: "creation_timestamp",
    defaultSortDir: "desc",
    onRowClick: (d) => {
      history.push(`/projects/${projectId}/models/${d.name}`);
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
      headerText: "",
      id: "description",
      sortable: false,
      style: "small-grey",
      type: "text",
    },{
      headerText: "Latest Version",
      id: "version",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "Created At",
      id: "creation_timestamp",
      sortable: true,
      style: "normal",
      type: "text",
    },
  ]

  const refresh = () => {
    getModels(projectId).then((results) => {
      setModels(results);
      setModalOpen(false);
    })
  }

  const modelFormModal = (
    <ModelModalForm  projectId={projectId} handleModalCancel={() => setModalOpen(false)} handleFormSubmitted={refresh}>
    </ModelModalForm>);

  return (
    <Fragment>
      {modalOpen && modelFormModal}
      <div className="d-flex justify-content-between">
        <div className="ml-auto">
          <button type="button" className="primary" onClick={() => setModalOpen(true)}>New Model</button>
        </div>
      </div>
      <div className="mb-5"></div>
      <TableCozy
        columns={tableColumns}
        data={models.data.map((m) => {
          const d = new Date(m.creation_timestamp);
          return {
            creation_timestamp: d.toLocaleString(),
            description: m.description,
            name: m.name,
            version: _.last(m.latest_versions)?.version
        }})}
        options={tableOptions}
      />
    </Fragment>
  );
}

function getModels(projectId){
  const apiConfig = getIlydeApiConfiguration();
  const projectsApi = new ProjectsApi(apiConfig);
  return projectsApi.listProjectModels(projectId).then((response) => {
    return response.data;
  });
}

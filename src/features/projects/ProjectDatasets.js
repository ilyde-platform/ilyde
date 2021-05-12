import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import TableCozy from '../../components/TableCozy';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from '../../services/utils';
import { selectProjectById } from './projectsSlice';
import Icon  from '../../components/Icon';
import { DatasetModalForm } from '../datasets/DatasetModalForm';
import { ProjectsApi, DatasetsApi } from '../../services/ilyde';
import _ from "lodash";
import { Paging } from '../../components/Pagination';


export function ProjectDatasets(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId } = useParams();

  const project = useSelector(state => selectProjectById(state, projectId));
  const [pageLimit, setPageLimit] = useState(25);
  const [datasets, setDatasets] = useState({data: [], total: 0, limit: pageLimit, page: 1});
  const [modalOpen, setModalOpen] = useState(false);

  const title = "Datasets";
  const goToDataset = (d) => {
    history.push(`/projects/${projectId}/datasets/${d.id}`);
  }

  const options = {
    defaultSortCol: "create_at",
    defaultSortDir: "desc",
    onRowClick: goToDataset,
  };
  const columns = [
    {
      id: "name",
      headerText: "Name",
      sortable: true,
      type: "text",
      style: "normal",
    },{
      id: "description",
      headerText: "",
      sortable: false,
      type: "text",
      style: "small-grey",
    },{
      id: "version",
      headerText: "Version",
      type: "text",
      sortable: true,
      style: "normal",
    },{
      headerText: "Created At",
      id: "create_at",
      sortable: true,
      style: "normal",
      type: "text",
    }
  ]

  let tableOptions = options;
  const tableColumns = columns;

  useEffect(() => {
    dispatch(setContentTitle({title: title, subtitle: datasets.total + ' items'}));
  }, [datasets, title]);

  useEffect(()=>{
    let mounted = true;
    getDatasets(projectId, pageLimit, 1).then((results) => {
      setDatasets(results);
    });

    return () => {
      mounted = false;
    }
  }, [projectId]);

  const handlePaginationItemClick = (page) => {
    getDatasets(projectId, pageLimit, page).then((results) => {
      setDatasets(results);
    })
  }

  const datasetFormModal = (
    <DatasetModalForm handleModalCancel={() => setModalOpen(false)} handleFormSubmitted={() => setModalOpen(false)}>
    </DatasetModalForm>);

  return  (
    <Fragment>
      { modalOpen && datasetFormModal}
      <div className="d-flex justify-content-between">
        <div className="ml-auto">
          <button type="button" className="primary" onClick={() => setModalOpen(true)}>New Dataset</button>
        </div>
      </div>
      <div className="mb-5"></div>
      <TableCozy
        columns={tableColumns}
        data={datasets.data.map((dataset) => {
          return {...dataset, create_at: dateToString(dataset.create_at)}
        })}
        options={tableOptions}
      />
      <Paging
        total={datasets.total}
        page={datasets.page}
        limit={pageLimit}
        handlePaginationItemClick={handlePaginationItemClick}
      />
    </Fragment>
  );
}

function getDatasets(projectId, limit, page){
  const apiConfig = getIlydeApiConfiguration();
  const projectsApi = new ProjectsApi(apiConfig);
  return projectsApi.listProjectDatasets(projectId, limit, page).then((response) => {
    return response.data;
  });
}

function dateToString(date: string){
  const d = new Date(date);
  return d.toLocaleString();
}

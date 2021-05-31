import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams, useHistory
} from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit';
import { FileExplorer } from '../../components/FileExplorer';
import { ModalConfirm } from '../../components/ModalConfirm';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { DatasetsApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import { fetchDatasets, removeDataset } from './datasetsSlice';
import { VersionModalForm } from './VersionModalForm';
import _ from "lodash";


export function DatasetDetail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(selectAllUsers);
  const { projectId, datasetId } = useParams();
  const [dataset, setDataset] = useState({});
  const [versions, setVersions] = useState([]);
  const [currVersion, setCurrVersion] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState({});

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const datasetsApi = new DatasetsApi(apiConfig);

    datasetsApi.retrieveDataset(datasetId).then((response) => {
      setDataset(response.data);
    });

    const body = {page: 1, limit: 100};
    datasetsApi.listDatasetVersions(datasetId, body).then((response) => {
      setVersions(response.data.data);
      if (response.data.total){
        setCurrVersion(response.data.data[0]);
      }
    });

  }, [datasetId]);

  useEffect(() => {
    dispatch(setContentTitle({title: dataset?.name, subtitle: ""}));
  })

  const handleChange = (event) => {
    for(let version of versions){
      if (version.name == event.target.value ){
        setCurrVersion(version);
        break;
      }
    }
  }

  const handleDelete = () => {
    const apiConfig = getIlydeApiConfiguration();
    const datasetsApi = new DatasetsApi(apiConfig);
    datasetsApi.deleteDataset(datasetId).then((response) => {
      if (projectId){
        history.push(`/projects/${projectId}/datasets`);
      }
      else{
        dispatch(removeDataset(datasetId))
        history.push(`/datasets`);
      }
    });
  }

  const getUsername = (userId) => {
    const user = _.find(users, ["id", userId]);
    return _.capitalize(user?.username);
  }

  const handleClickNewVersion = () => {
    setModal({component:VersionModalForm, componentProps: {
      datasetId: datasetId,
      handleModalCancel: () => setModalOpen(false),
      handleFormSubmitted: (version) => {
          setVersions(versions.concat([version]));
          setModalOpen(false);
          setCurrVersion(version);
        }
    }});
    setModalOpen(true);
  }

  const handleClickMarkdelete = () => {
    setModal({component:ModalConfirm, componentProps: {
      title: "Mark Dataset as Deleted",
      action: "Delete",
      content: "Are you sure you want to delete this dataset?",
      handleCancel: () => setModalOpen(false),
      handleConfirm: () => handleDelete()
    }});
    setModalOpen(true);
  }

  return (
    <Fragment>
      {modalOpen && <modal.component  {...modal.componentProps} />}
      <div className="d-flex justify-content-between">
        <div className="ml-auto">
          <button type="button" className="primary" onClick={handleClickNewVersion}>New Version</button>
          <button type="button" className="btn-danger ml-2" onClick={handleClickMarkdelete}>Mark Delete</button>
        </div>
      </div>
      <div className="input-row">
        <label>
          Desciption
          <textarea
            readOnly
            value={dataset?.description}
            rows="15"
            cols="50"
          >
          </textarea>
        </label>
      </div>
      <div className="input-row">
        <label>
          Versions
          <select id="inputState" className="form-control" value={currVersion?.name} onChange={handleChange}>
           {versions.map((value, index) => {
             return <option key={value.name} value={value.name}>Version {value.name} </option>
           })}
          </select>
        </label>
      </div>
      {!_.isEmpty(currVersion) &&
        <div className="mt-3">
          <FileExplorer
            name={dataset?.name}
            columns={["name", "size"]}
            tree={currVersion.bucket_tree.map((t) => {
              return {...t, size: formatBytes(t.size, 2)};
            })}
            handleOpenFile={null}
          />
          <div className="container-fluid border-block">
            <div className="mb-3"></div>
            <div><span className="label">Author:</span> {getUsername(currVersion.author)}</div>
            <div className="mb-2"></div>
            <div><span className="label">Total size:</span> {formatBytes(currVersion.size, 2)}</div>
            <div className="mb-2"></div>
            <div><span className="label">Date:</span> {dateToString(currVersion.create_at)}</div>
          </div>
        </div>}
     </Fragment>
   );
}

export function formatBytes(bytes, decimals) {
  if(bytes == 0) return '0 Bytes';
  var k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function dateToString(date: string){
  const d = new Date(date);
  return d.toLocaleString();
}

import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams
} from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit';
import { FileExplorer } from '../../components/FileExplorer';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { DatasetsApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import { VersionModalForm } from './VersionModalForm';
import _ from "lodash";


export function DatasetDetail(props) {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const { datasetId } = useParams();
  const [dataset, setDataset] = useState({});
  const [versions, setVersions] = useState([]);
  const [currVersion, setCurrVersion] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

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

  const getUsername = (userId) => {
    const user = _.find(users, ["id", userId]);
    return _.capitalize(user?.username);
  }

  const versionFormModal = (
    <VersionModalForm datasetId={datasetId} handleModalCancel={() => setModalOpen(false)} handleFormSubmitted={(version) => {
      setVersions(versions.concat([version]));
      setModalOpen(false);
      setCurrVersion(version);
    }}>
    </VersionModalForm>);

  return (
    <Fragment>
      {modalOpen && versionFormModal}
      <div className="d-flex justify-content-between">
        <div className="ml-auto">
          <button type="button" className="primary" onClick={() => setModalOpen(true)}>New Version</button>
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
          <div className="mb-3"></div>
          <div>Author: {getUsername(currVersion.author)}</div>
          <div className="mb-2"></div>
          <div>Total size: {formatBytes(currVersion.size, 2)}</div>
          <div className="mb-2"></div>
          <div>Date: {dateToString(currVersion.create_at)}</div>
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

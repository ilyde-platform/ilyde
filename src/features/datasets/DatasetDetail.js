import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit';
import TableCozy from '../../components/TableCozy';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { DatasetsApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import { VersionModalForm } from './VersionModalForm';
import _ from "lodash";


export function DatasetDetail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
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
    for (let u of users){
      if (userId == u.id){
        let fullname;
        if (u.first_name && u.last_name){
          fullname = `${_.capitalize(u.first_name)} ${capitalize(u.last_name)}`;
        }
        else{
          fullname = _.capitalize(u.username);
        }
        return fullname;
      }
    }
  }

  const versionFormModal = (
    <VersionModalForm datasetId={datasetId} handleModalCancel={() => setModalOpen(false)} handleFormSubmitted={(version) => {
      setVersions(versions.concat([version]));
      setModalOpen(false);
      setCurrVersion(version);
    }}>
    </VersionModalForm>);

  return (
    <section className="content">
      {modalOpen && versionFormModal}
      <div class="d-flex justify-content-between">
        <div class="ml-auto">
          <button type="button" className="primary" onClick={() => setModalOpen(true)}>+Version</button>
        </div>
      </div>
      <div className="input-row">
        <label>
          Desciption
          <textarea
            readOnly="true"
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
          <ul className="list-group list-group-flush mt-3">
            {currVersion.bucket_tree.map((value, index) => {
              return (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={value.name} data-spy="scroll">
                  <span><i className="fa fa-file"></i>{value.name}</span>
                  <span>{formatBytes(value.size, 2)}</span>
                </li>)}
              )
            }
          </ul>
          <div>Author: {getUsername(currVersion.author)}</div>
          <div>Total size: {formatBytes(currVersion.size, 2)}</div>
          <div>Date: {currVersion.create_at}</div>
        </div>}
     </section>
   );
}

function formatBytes(bytes, decimals) {
  if(bytes == 0) return '0 Bytes';
  var k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

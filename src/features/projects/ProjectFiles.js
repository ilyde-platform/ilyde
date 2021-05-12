import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams
} from "react-router-dom";
import { FileExplorer } from '../../components/FileExplorer';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { ProjectsApi, FilesApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import { selectProjectById} from './projectsSlice';
import _ from 'lodash';


export function ProjectFiles(props) {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const { projectId } = useParams();

  const project = useSelector(state => selectProjectById(state, projectId));
  const [revisions, setRevisions] = useState([]);
  const [currRevision, setCurrRevision] = useState({});

  const tree = currRevision?.file_tree ? currRevision?.file_tree : [];

  useEffect(() => {
    dispatch(setContentTitle({title: project?.name, subtitle: ""}));
  },[project]);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const projectsApi = new ProjectsApi(apiConfig);
    projectsApi.listProjectRevisions(projectId, 25, 1).then((response) => {
      setRevisions(response.data.data);
      setCurrRevision(response.data.data[0]);
    });
  }, [projectId]);

  const handleRevisionChange = (event) => {
    for(let revision of revisions){
      if (revision.id == event.target.value ){
        setCurrRevision(revision);
        break;
      }
    }
  }

  const getUsername = (userId) => {
    const user = _.find(users, ["id", userId]);
    return _.capitalize(user?.username);
  }

  const handleOpenFile = (filename) => {
    const apiConfig = getIlydeApiConfiguration();
    const filesApi = new FilesApi(apiConfig);
    let version;
    for(let f of tree){
      if (f.name === filename){
        version = f.version;
      }
    }
    return filesApi.getProjectFile(projectId, filename, version).then((response) => {
      return response.data
    });
  }

  return (
    <Fragment>
      <div className="input-row">
        <label>
          Revisions
          <select id="inputState" className="form-control" value={currRevision?.id} onChange={handleRevisionChange}>
          {revisions?.map((value, index) => {
            return <option key={index} value={value.id}>{getUsername(value.author)} "{value.commit}" on {dateToString(value.create_at)}</option>
          })}
          </select>
        </label>
      </div>
      <div className="mb-5"></div>
      <FileExplorer
        name={project?.name}
        columns={["name"]}
        tree={tree}
        handleOpenFile={handleOpenFile}
      />
    </Fragment>
  );
}


function dateToString(date: string){
  const d = new Date(date);
  return d.toLocaleString();
}

import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import FileBrowser, {Icons} from 'react-keyed-file-browser'
import TableCozy from '../../components/TableCozy';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { ProjectsApi, FilesApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import { selectProjectById, retrieveProject } from './projectsSlice';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markup';


export function ProjectFiles(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(selectAllUsers);
  const { projectId } = useParams();

  const project = useSelector(state => selectProjectById(state, projectId));
  const [currPath, setCurrPath] = useState('');
  const [revisions, setRevisions] = useState([]);
  const [currRevision, setCurrRevision] = useState({});
  const [isFolderView, setIsFolderView] = useState(true);
  const [code, setCode] = useState({value: "", lang: "markup"});

  const files = currRevision?.file_tree ? getTree(currRevision?.file_tree, currPath) : [];

  useEffect(() => {
    dispatch(setContentTitle({title: project?.name, subtitle: ""}));
  },[project]);

  useEffect(()=>{
    dispatch(retrieveProject(projectId));
  }, [projectId]);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const projectsApi = new ProjectsApi(apiConfig);
    projectsApi.listProjectRevisions(projectId, 25, 1).then((response) => {
      setRevisions(response.data.data);
      setCurrRevision(response.data.data[0]);
    });
  }, [projectId]);

  const handleChange = (event) => {
    for(let revision of revisions){
      if (revision.id == event.target.value ){
        setCurrRevision(revision);
        break;
      }
    }
  }

  const handleClickPath = (event) => {
    event.preventDefault();
    setCurrPath(currPath.split('/').slice(0, +event.target.getAttribute("data-index") + 1).join("/"));
    setIsFolderView(true);
  }

  const getUsername = (userId) => {
    for (let u of users){
      if (userId == u.id){
        let fullname;
        if (u.first_name && u.last_name){
          fullname = `${capitalize(u.first_name)} ${capitalize(u.last_name)}`;
        }
        else{
          fullname = capitalize(u.username);
        }
        return fullname;
      }
    }
  }

  const openFolder = (event) => {
    const pathPrefix = currPath ? currPath + "/" + event.target.getAttribute("data-folder") : event.target.getAttribute("data-folder");
    setCurrPath(pathPrefix);
    setIsFolderView(true);
  }

  const openFile = (event) => {
    const filename = currPath ? currPath + "/" + event.target.getAttribute("data-file") : event.target.getAttribute("data-file");
    let fileversion = "";
    const apiConfig = getIlydeApiConfiguration();
    const filesApi = new FilesApi(apiConfig);
    for(let f of currRevision.file_tree){
      if (f.name === filename){
        fileversion = f.version;
      }
    }
    filesApi.getProjectFile(projectId, filename, fileversion).then((response) => {
      const lan = filename.endsWith(".py") ? "py" : "markup";
      console.log(lan, filename);
      setCode({value: response.data, lang: lan});
      setIsFolderView(false);
    });
  }

  return (
    <section className="content">
      <div className="d-flex justify-content-between">
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrPath(""); setIsFolderView(true);}}>{project?.name}</a>/{currPath.split('/').map((value, index) => {
          if (value){
            return <span key={index}><a href="#" data-index={index} onClick={handleClickPath}>{value}</a>/</span>
          }
          else{
            return ""
          }
        })}
        <div className="ml-auto">
          <button type="button" className="primary">+File</button>
        </div>
      </div>
      <div className="card-body">
        <div className="form-row">
          <select id="inputState" className="form-control" value={currRevision?.id} onChange={handleChange}>
          {revisions?.map((value, index) => {
            return <option key={value.id} value={value.id}>{getUsername(value.author)} "{value.commit}" on {value.create_at}</option>
          })}
          </select>
        </div>
      </div>
      <div className="card-body">
        {isFolderView ? <ul className="list-group list-group-flush mt-3">
          {files.map((value, index) => {
            if(value.is_dir){
              return (
                <li className="list-group-item d-flex justify-content-between align-items-center"
                 data-spy="scroll" key={index} data-folder={value.name} onClick={openFolder}>
                   <span><i className="fa fa-folder"></i>{value.name}</span>
                </li>
              );
            }else{
              return (
                <li className="list-group-item d-flex justify-content-between align-items-center"
                 data-spy="scroll" key={index} data-file={value.name} onClick={openFile}>
                  <span><i className="fa fa-file"></i>{value.name}</span>
                </li>
              );
            }
          })}
        </ul> : <Editor
          value={code.value}
          onValueChange={c => setCode({value: c, ...code})}
          highlight={c => highlight(c, languages[code.lang])}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}/>
        }
      </div>
    </section>
  );
}

function getTree(file_tree, pathPrefix){
  let tree = [];
  let names = [];
  let filenames = [];

  if (pathPrefix){
    filenames = file_tree.filter((file) => file.name.startsWith(pathPrefix))
                          .map((file) => file.name.slice(pathPrefix.length + 1));
  }
  else{
    filenames = file_tree.map((file) => file.name);
  }

  for (let filename of filenames){
    if (filename.split("/").length > 1){
      if (!names.includes(filename.split("/")[0]))
        tree.unshift({name: filename.split("/")[0], is_dir: true});

      names.push(filename.split("/")[0]);
    }
    else{
      if (!names.includes(filename))
        tree.push({name: filename, is_dir: false});

      names.push(filename);
    }
  }
  return tree;
}

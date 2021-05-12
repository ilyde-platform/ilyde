import React, { useEffect, useState, Fragment } from 'react';
import SidebarWorkspace from './features/sidebar/SidebarWorkspace';
import Headerbar from './features/headerbar/Headerbar';
import { WorkspacesApi } from './services/ilyde';
import { setContentTitle } from './features/headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from './services/utils';
import {
  useParams
} from "react-router-dom";
import { useDispatch } from 'react-redux';


export function WorkspaceDetail() {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    dispatch(setContentTitle({title:  workspace?.metadata?.name, subtitle: "" }));
  },[workspace]);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const workspacesApi = new WorkspacesApi(apiConfig);
    workspacesApi.retrieveWorkspace(workspaceId).then((response) => {
      setWorkspace(response.data);
    });
  }, [workspaceId]);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const workspacesApi = new WorkspacesApi(apiConfig);
    if (["CREATED", "STOPPED"].includes(workspace?.state)){
      workspacesApi.startWorkspace(workspaceId, false);
    }
    const intervalID = setInterval(() => {
      workspacesApi.statusWorkspace(workspaceId).then((response) => {
          if(response.data.state === 'RUNNING'){
            setIsLoad(true);
          }
      });
    }, 10000);
    return () => {clearInterval(intervalID);}
  }, [workspace]);

  const menu = [
    {
      "id": "sync",
      "icon": "new",
      "text": "Pull latest",
      "handleClick": () => {
        alert("Funziona");
      },
    }, {
      "id": "commit",
      "icon": "pages",
      "text": "Commit",
      "handleClick": null,
    }, {
      "id": "stop",
      "icon": "archive",
      "text": "Stop",
      "handleClick": null,
    }
  ];

  const workspaceUrl = "http://kubernetes.docker.internal:30080/workspacesession/" + workspaceId + "/";

  return (
    <Fragment>
      <SidebarWorkspace projectId={workspace?.metadata?.project} menu={menu} />
      <div className="ui-right">
        <Headerbar
          showBackButton={true}
        />
        <div className="content-area">
          <div className="content">
            {isLoad && <div className="embed-responsive embed-responsive-16by9 mt-3">
              <iframe id="iframe-workspace" className="embed-responsive-item" src={workspaceUrl} allowFullScreen></iframe>
            </div>}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

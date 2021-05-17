import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import TableCozy2 from '../../components/TableCozy2';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from '../../services/utils';
import { ProjectsApi, WorkspacesApi } from '../../services/ilyde';
import { ModalConfirm } from '../../components/ModalConfirm';
import { ModalInfo } from '../../components/ModalInfo';
import { ProjectWorkspaceForm } from './ProjectWorkspaceForm';
import { selectAllUsers } from '../users/usersSlice';
import { selectProjectById, retrieveProject } from './projectsSlice';
import _ from "lodash";
import { useFormik } from 'formik';
import * as Yup from 'yup';


export function ProjectWorkspaces(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(selectAllUsers);
  const { projectId } = useParams();

  const project = useSelector(state => selectProjectById(state, projectId));
  const [workspaces, setWorkspaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState({});
  const title = "Workspaces";

  useEffect(() => {
    dispatch(setContentTitle({title: title, subtitle: workspaces?.length + " items"}));
  },[workspaces]);

  useEffect(()=>{
    dispatch(retrieveProject(projectId));
  }, [projectId]);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const projectsApi = new ProjectsApi(apiConfig);
    projectsApi.listProjectWorkspaces(projectId, 25, 1).then((response) => {
      setWorkspaces(response.data.data);
    });
  }, [projectId]);

  useEffect(() => {
    const apiConfig = getIlydeApiConfiguration();
    const workspacesApi = new WorkspacesApi(apiConfig);
    const intervalID = setInterval(() => {
      let updates = [];
      workspaces.
      filter((w) => ["STARTING", "RUNNING"].includes(w.state)).
      forEach((item, i, array) => {
        updates.push(workspacesApi.statusWorkspace(item.id).then((response) => {
          return {state: response.data.state, ...item};
        }));
      });
      Promise.all(updates).then((values) => {
        setWorkspaces(_.unionBy(values, workspaces, "id"));
      });
    }, 10000);

    return () => {clearInterval(intervalID);}

  }, [workspaces]);

  const handleStopWorkspace = (workspaceId) => {
    setModalOpen(false);
    const index = _.findIndex(workspaces, function(w){
      return w.id === workspaceId;
    });
    if (["STARTING", "RUNNING"].includes(workspaces[index].state)){
      const apiConfig = getIlydeApiConfiguration();
      const workspacesApi = new WorkspacesApi(apiConfig);
      workspacesApi.stopWorkspace(workspaceId).then((response) => {
        workspaces[index].state = "STOPPED";
        setWorkspaces(workspaces);
      }).catch((errors) => {
        setModal({component: ModalInfo, componentProps: {
          title: "Stop Workspace",
          content: errors.response.data.details,
          handleCancel: () => setModalOpen(false),
        }});
        setModalOpen(true);
      });
    }
    else {
      setModal({component: ModalInfo, componentProps: {
        title: "Stop Workspace",
        content: "Cannot stop not running Workspace.",
        handleCancel: () => setModalOpen(false),
      }});
      setModalOpen(true);
    }
  }

  const handleDeleteWorkspace = (workspaceId) => {
    setModalOpen(false);
    const index = _.findIndex(workspaces, function(w){
      return w.id === workspaceId;
    });
    if (["STARTING", "RUNNING"].includes(workspaces[index].state)){
      setModal({component: ModalInfo, componentProps: {
        title: "Delete Workspace",
        content: "Cannot delete Running Workspace.",
        handleCancel: () => setModalOpen(false),
      }});
      setModalOpen(true);
    }
    else{
      const apiConfig = getIlydeApiConfiguration();
      const workspacesApi = new WorkspacesApi(apiConfig);
      workspacesApi.deleteWorkspace(workspaceId).then((response) => {
        workspaces.splice(index, 1);
        setWorkspaces(workspaces);
      }).catch((errors) => {
        setModal({component: ModalInfo, componentProps: {
          title: "Delete Workspace",
          content: errors.response.data.details,
          handleCancel: () => setModalOpen(false),
        }});
        setModalOpen(true);
      });
    }
  }

  const tableOptions = {
    defaultSortCol: "create_at",
    defaultSortDir: "desc",
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
      headerText: "Created At",
      id: "create_at",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "Last Started",
      id: "last_start",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      buttonText: "Open",
      headerText: "",
      id: "button_start",
      onButtonClick: (d) => {
        window.open(`/workspace/${d.id}/lab`, '_blank');
      },
      sortable: false,
      style: "primary",
      type: "button",
    },{
      buttonText: "Stop",
      headerText: "",
      id: "button_stop",
      onButtonClick: (d) => {
        setModal({component: ModalConfirm, componentProps: {
          title: "Stop Workspace",
          action: "Stop",
          content: "By stopping Your Workspace, you will potentially lose your work. Please make sure to commit your work before stopping.",
          handleCancel: () => setModalOpen(false),
          handleConfirm: () => handleStopWorkspace(d.id)
        }});
        setModalOpen(true);
      },
      sortable: false,
      style: "primary",
      type: "button",
    },{
      buttonText: "Delete",
      headerText: "",
      id: "button_delete",
      onButtonClick: (d) => {
        setModal({component: ModalConfirm, componentProps: {
          title: "Delete Workspace",
          action: "Delete",
          content: "We will clean and release all resources used by your workspace. Please make sure to commit your work before deleting.",
          handleCancel: () => setModalOpen(false),
          handleConfirm: () => handleDeleteWorkspace(d.id)
        }});
        setModalOpen(true);
      },
      sortable: false,
      style: "primary",
      type: "button",
    }
  ]

  const getUsername = (userId) => {
    for (let u of users){
      if (userId == u.id){
        let fullname;
        if (u.first_name && u.last_name){
          fullname = `${_.capitalize(u.first_name)} ${_.capitalize(u.last_name)}`;
        }
        else{
          fullname = _.capitalize(u.username);
        }
        return fullname;
      }
    }
  }


  return (
    <Fragment>
      {modalOpen && <modal.component  {...modal.componentProps} />}
      <ProjectWorkspaceForm projectId={projectId}></ProjectWorkspaceForm>
      <div className="mb-5"></div>
      <TableCozy2
        columns={tableColumns}
        data={workspaces.map((w) => {
          const d = new Date(w.last_start);
          const c = new Date(w.create_at);
          return {
            id: w.id,
            create_at: c.toLocaleString(),
            name: w.metadata.name,
            state: _.capitalize(w.state),
            owner: getUsername(w.metadata.owner),
            last_start: d.toLocaleString()
          }
        })}
        options={tableOptions}
      />
    </Fragment>
  );
}

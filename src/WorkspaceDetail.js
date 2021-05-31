import React, { useEffect, useState, Fragment } from 'react';
import SidebarWorkspace from './features/sidebar/SidebarWorkspace';
import Headerbar from './features/headerbar/Headerbar';
import { WorkspacesApi } from './services/ilyde';
import { ModalConfirm } from './components/ModalConfirm';
import { ModalInfo } from './components/ModalInfo';
import Modal  from './components/Modal';
import { setContentTitle } from './features/headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from './services/utils';
import {
  useParams, useHistory
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from './assets/images/logo-full.svg';


const SOCKET_READY_STATE_OPEN = 1;


export function WorkspaceDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState({});
  const [socketUrl, setSocketUrl] = useState(null);
  const [workspaceUrl, setWorkspaceUrl] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [workdirChangesHistory, setWorkdirChangesHistory] = useState({total: 0, changes: []});
  const [workdirDiffHistory, setWorkdirDiffHistory] = useState([]);
  const {
    sendMessage,
    lastMessage,
    readyState
  } = useWebSocket(socketUrl, {
    share: false,
    shouldReconnect: () => true,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState({});

  useEffect(() => {
    dispatch(setContentTitle({title:  workspace?.metadata?.name, subtitle: "" }));
  },[workspace, dispatch]);

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
  }, [workspace, workspaceId]);

  useEffect(() => {
    if (isLoad){
      const hostname = window.location.hostname;
      const protocol = window.location.protocol === 'https:' ? ['https', 'wss'] : ['http', 'ws'];
      const port = window.location.port === "80" ? '' : ':'+ window.location.port;

      setWorkspaceUrl(`${protocol[0]}://${hostname}${port}/workspacesession/${workspaceId}/`);
      setSocketUrl(`${protocol[1]}://${hostname}${port}/wssession/${workspaceId}`);
      // for testing
      /* setWorkspaceUrl(`https://demos.ilyde.it/workspacesession/${workspaceId}/lab/tree/ilyde`);
      setSocketUrl(`wss://demos.ilyde.it/wssession/${workspaceId}`); */
    }
  },[isLoad, workspaceId]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      switch(data.action){
        case "changes":
          setWorkdirChangesHistory(data.message);
          break;

        case "diff":
          setWorkdirDiffHistory(data.message);
          break;

        case "commit":
          setModalOpen(false);
          setModal({component: ModalInfo, componentProps: {
            title: "Commit changes",
            content: "Successfully commit your changes",
            handleCancel: () => setModalOpen(false),
          }});
          setModalOpen(true);
          break;

        case "sync":
          setModalOpen(false);
          setModal({component: ModalInfo, componentProps: {
            title: "Pull changes",
            content: "Successfully pull changes from central repository",
            handleCancel: () => setModalOpen(false),
          }});
          setModalOpen(true);
          break;

        case "persist":
          const apiConfig = getIlydeApiConfiguration();
          const workspacesApi = new WorkspacesApi(apiConfig);
          workspacesApi.stopWorkspace(workspaceId).then((response) => {
            history.push(`/projects/${workspace.metadata.project}/workspaces`);
          });
          break;
        default:
          break;
      }
    }
  }, [lastMessage, workspace, workspaceId, history]);

  useEffect(()=>{
    if(readyState === SOCKET_READY_STATE_OPEN){
      const intervalID = setInterval(() => {
        sendMessage(JSON.stringify({action: 'changes'}));
      }, 5000);

      return () => {clearInterval(intervalID);}
    }
  }, [readyState, sendMessage]);

  useEffect(()=>{
    if(readyState === SOCKET_READY_STATE_OPEN){
      const intervalID = setInterval(() => {
        sendMessage(JSON.stringify({action: 'diff'}));
      }, 60000);

      return () => {clearInterval(intervalID);}
    }
  }, [readyState, sendMessage]);

  const menu = [
    {
      "id": "sync",
      "icon": "new",
      "text": "Pull latest",
      "handleClick": () => {
        setModal({component: ModalPull, componentProps: {
          diff: workdirDiffHistory,
          handleCancel: () => setModalOpen(false),
          handleSubmit: () => {
            sendMessage(JSON.stringify({action: 'sync'}));
            setModalOpen(false);
          }
        }});
        setModalOpen(true);
      },
    }, {
      "id": "commit",
      "icon": "pages",
      "text": "Commit",
      "handleClick": () => {
        setModal({component: ModalCommit, componentProps: {
          changes: workdirChangesHistory,
          handleCancel: () => setModalOpen(false),
          handleSubmit: (values) => {
            sendMessage(JSON.stringify({action: 'commit', message: values.message}));
            setModalOpen(false);
          }
        }});
        setModalOpen(true);
      },
    }, {
      "id": "stop",
      "icon": "archive",
      "text": "Stop",
      "handleClick":() => {
        setModal({component: ModalConfirm, componentProps: {
          title: "Stop Workspace",
          action: "Stop",
          content: "All data in output datasets will be automatically saved as new dataset's version. If you want to update central repository, please commit your changes before stopping. Your work will be persisted until you delete this workspace.",
          handleCancel: () => setModalOpen(false),
          handleConfirm: () => {
            sendMessage(JSON.stringify({action: 'persist'}));
            setModalOpen(false);
          }
        }});
        setModalOpen(true);
      },
    }
  ];

  return (
    <Fragment>
      <SidebarWorkspace projectId={workspace?.metadata?.project} menu={menu} />
      <div className="ui-right">
        <Headerbar
          showBackButton={true}
        />
        <div className="content-area">
          {isLoad ?
            <div className="embed-responsive embed-responsive-16by9">
              <iframe id="iframe-workspace" className="embed-responsive-item" src={workspaceUrl} allowFullScreen title="Workspace Session"></iframe>
            </div> :
            <div className="h-100 d-flex align-items-center justify-content-center">
              <div>
                <img className="blink" src={logo} alt="loading" />
                <p className="blink"></p>
              </div>
            </div>
          }
          {modalOpen && <modal.component  {...modal.componentProps} />}
        </div>
      </div>
    </Fragment>
  );
}

function ModalCommit({handleCancel, changes, handleSubmit}) {
  const formik = useFormik({
    initialValues: {
     message: ''
   },
   validationSchema: Yup.object({
     message: Yup.string().required('Commit message is required'),
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     resetForm({});
     setSubmitting(false);
     handleSubmit(values);
   },
  });

  const canCommit = changes.total && !formik.isSubmitting ? true : false;

  return (
    <Modal closeModal={handleCancel}  title="Commit your changes">
      <section>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="mb-5">
            <h4 className="mb-3">{changes?.total} changes to commit</h4>
            {changes?.changes.map((val, index) => {
              return <div key={index}>{val}</div>
            })}
          </div>
          <div className="input-row">
            <label>
              Message
              <textarea
                id="message"
                name="message"
                placeholder="My updates"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                rows="15"
                cols="50"
              >
              </textarea>
            </label>
            {formik.touched.message && formik.errors.message ? (
              <div>{formik.errors.message}</div>) : null}
          </div>
          <hr />
          <div className="buttons-wrapper">
            <button className="secondary" onClick={handleCancel}>Cancel</button>
            <input type="submit" className="primary" value="Commit" disabled={!canCommit} />
          </div>
        </form>
      </section>
    </Modal>
  );
}

function ModalPull({handleCancel, diff, handleSubmit}) {
  const hasDiff = diff.length ? true : false;
  return (
    <Modal closeModal={handleCancel}  title="Pull latest changes">
      <section>
        {hasDiff ?
          <div className="mb-3">
            <h4 className="mb-3">{diff.length} changes in central repository.</h4>
            {diff.map((val, index) => {
              return <div key={index}>{val.name}</div>
            })}
          </div> :
          <h4 className="mb-3">No changes in central repository.</h4>
        }
        <div>Be aware, pulling  will override files in your working directory</div>
        <hr />
        <div className="buttons-wrapper">
          <button className="secondary" onClick={handleCancel}>Cancel</button>
          <button className="primary" onClick={handleSubmit} disabled={!hasDiff}>Pull</button>
        </div>
      </section>
    </Modal>
  );
}

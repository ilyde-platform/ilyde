import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { RunsApi } from '../../services/ilyde';
import { selectUserById } from '../users/usersSlice';
import { selectCenvById } from '../cenvs/cenvsSlice';
import { selectHwtierById } from '../hwtiers/hwtiersSlice';
import _ from "lodash";
import { LogViewer } from '../../components/FileExplorer';
import { Accordion, Card, Tabs, Tab, ListGroup } from 'react-bootstrap';


export function ProjectRunDetail(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const {projectId, runId} = useParams();
  const [run, setRun] = useState({});
  const user = useSelector(state => selectUserById(state, run?.metadata?.owner));
  const cenv = useSelector(state => selectCenvById(state, run?.spec?.environment));
  const hwtier = useSelector(state => selectHwtierById(state, run?.spec?.hardware));
  const [logs, setLogs] = useState([]);

  const isCompleted = !["RUNNING", "STARTING"].includes(run?.state);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const runsApi = new RunsApi(apiConfig);
    runsApi.retrieveRun(runId).then((response) => {
      setRun(response.data);
    });

    runsApi.fetchRunLogs(runId).then((response) => {
      setLogs(response.data.data);
    });
  }, [runId]);

  useEffect(() => {
    let title = "";
    if (run?.metadata?.name){
      title = _.capitalize(run?.metadata?.name);
    }
    dispatch(setContentTitle({title: title, subtitle: ""}));
  },[run]);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const runsApi = new RunsApi(apiConfig);
    if (!isCompleted){
      const intervalID = setInterval(() => {
        runsApi.fetchRunLogs(run?.id).then((response) => {
          setLogs(response.data.data);
        });
        runsApi.stateRun(run?.id).then((response) => {
          runsApi.retrieveRun(run?.id).then((response) => {
            setRun(response.data);
          });
        });

      }, 5000);
      return () => {clearInterval(intervalID);}
    }
  }, [run]);

  const runCommand = run?.spec?.command ? run?.spec?.command : "";

  const handleStopClick = () => {
    const apiConfig = getIlydeApiConfiguration();
    const runsApi = new RunsApi(apiConfig);
    runsApi.stopRun(runId).then((response) => {
      setRun({...run, state: "ABORTED"});
    });
  }

  const handleRerunClick = () => {
    const apiConfig = getIlydeApiConfiguration();
    const runsApi = new RunsApi(apiConfig);
    const payload = {metadata: {
      name: run.metadata.name,
      owner: run.metadata.owner,
      project: run.metadata.project},
      spec: run.spec};

    runsApi.submitRun(payload).then((response) => {
      history.push(`/projects/${projectId}/runs`);
    });
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <div className="ml-auto">
          <button type="button" className="primary ml-2" disabled={!isCompleted} onClick={handleRerunClick}>Rerun</button>
          <button type="button" className="primary ml-2" disabled={isCompleted} onClick={handleStopClick}>Stop</button>
        </div>
      </div>
      <div className="mb-5"></div>

      <div className="container-fluid border-block">
        <div className="row">
          <div className="col col-md-4">
            <div><span className="label">Start Time:</span> {new Date(run?.create_at).toLocaleString()}</div>
          </div>
          <div className="col col-md-4">
            <div><span className="label">Revision:</span> {run?.spec?.revision}</div>
          </div>
          <div className="col col-md-4">
            <div><span className="label">Execution Time (s):</span> {run?.uptime}</div>
          </div>
        </div>
        <div className="mb-3"></div>
        <div className="row">
          <div className="col col-md-4">
            <div><span className="label">State: </span>{_.capitalize(run?.state)}</div>
          </div>
          <div className="col col-md-4">
            <div><span className="label">User: </span>{_.capitalize(user?.username)}</div>
          </div>
          <div className="col col-md-4">
            <div><span className="label">Hardware Tier:</span> {hwtier?.name}</div>
          </div>
          <div className="col col-md-6 mt-3">
            <div><span className="label">Compute Environment:</span> {cenv?.name}</div>
          </div>
        </div>
      </div>

      <div className="mb-5"></div>
      <div className="input-row">
        <label>
          Command
          <input
            type="text"
            readOnly
            value={runCommand}
          />
        </label>
      </div>
      <Tabs defaultActiveKey="logs" className="mt-5">
        <Tab eventKey="results" title="Results">
          <Card.Body>
          </Card.Body>
        </Tab>
        <Tab eventKey="logs" title="Logs">
          <Card.Body>
            <LogViewer logs={logs.map((value) => value.message).join(" ")}/>
          </Card.Body>
        </Tab>
      </Tabs>
    </Fragment>
   );
}

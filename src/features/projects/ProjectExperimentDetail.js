import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { ExperimentsApi } from '../../services/ilyde';
import { selectUserById } from '../users/usersSlice';
import { selectCenvById } from '../cenvs/cenvsSlice';
import { selectHwtierById } from '../hwtiers/hwtiersSlice';
import _ from "lodash";
import { Accordion, Card, Tabs, Tab, Table} from 'react-bootstrap';


export function ProjectExperimentDetail(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const {projectId, experimentId} = useParams();
  const [experiment, setExperiment] = useState({});
  const user = useSelector(state => selectUserById(state, experiment?.metadata?.owner));
  const cenv = useSelector(state => selectCenvById(state, experiment?.spec?.environment));
  const hwtier = useSelector(state => selectHwtierById(state, experiment?.spec?.hardware));
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState({data: {}, info: {}});

  const isCompleted = !["RUNNING", "STARTING"].includes(experiment?.state);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const experimentsApi = new ExperimentsApi(apiConfig);
    experimentsApi.retrieveExperiment(experimentId).then((response) => {
      setExperiment(response.data);
    });

    experimentsApi.fetchExperimentLogs(experimentId).then((response) => {
      setLogs(response.data.data);
    });
  }, [experimentId]);

  useEffect(() => {
    let title = "";
    if (experiment?.metadata?.name){
      title = _.capitalize(experiment?.metadata?.name);
    }
    dispatch(setContentTitle({title: title, subtitle: ""}));
    if(experiment?.state === "SUCCEEDED"){
      const apiConfig = getIlydeApiConfiguration();
      const experimentsApi = new ExperimentsApi(apiConfig);
      experimentsApi.getExperimentResults(experimentId).then((response) => {
        setResults(response.data);
        console.log(response.data);
      });
    }
  },[experiment]);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const experimentsApi = new ExperimentsApi(apiConfig);
    if (!isCompleted){
      const intervalID = setInterval(() => {
        experimentsApi.fetchExperimentLogs(experiment?.id).then((response) => {
          setLogs(response.data.data);
        });
        experimentsApi.stateExperiment(experiment?.id).then((response) => {
          experimentsApi.retrieveExperiment(experiment?.id).then((response) => {
            setExperiment(response.data);
          });
        });

      }, 5000);
      return () => {clearInterval(intervalID);}
    }
  }, [experiment]);

  const handleStopClick = () => {
    const apiConfig = getIlydeApiConfiguration();
    const experimentsApi = new ExperimentsApi(apiConfig);
    experimentsApi.stopExperiment(experimentId).then((response) => {
      setExperiment({...experiment, state: "ABORTED"});
    });
  }

  const handleRerunClick = () => {
    const apiConfig = getIlydeApiConfiguration();
    const experimentsApi = new ExperimentsApi(apiConfig);
    const payload = {metadata: {
      name: experiment.metadata.name,
      owner: experiment.metadata.owner,
      project: experiment.metadata.project},
      spec: experiment.spec};

    experimentsApi.submitExperiment(payload).then((response) => {
      history.push(`/projects/${projectId}/experiments`);
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
      <div className="row">
        <div className="col col-md-4">
          <div>Start Time: {new Date(experiment?.create_at).toLocaleString()}</div>
        </div>
        <div className="col col-md-4">
          <div>Revision: {experiment?.spec?.revision}</div>
        </div>
        <div className="col col-md-4">
          <div>Execution Time(s): {experiment?.uptime}</div>
        </div>
      </div>
      <div className="mb-3"></div>
      <div className="row">
        <div className="col col-md-4">
          <div>State: {_.capitalize(experiment?.state)}</div>
        </div>
        <div className="col col-md-4">
          <div>User: {_.capitalize(user?.username)}</div>
        </div>
        <div className="col col-md-4">
          <div>Entrypoint: {experiment?.spec?.entrypoint}</div>
        </div>
      </div>
      <div className="mb-3"></div>
      <div className="row">
        <div className="col col-md-4">
          <div>Hardware Tier: {hwtier?.name}</div>
        </div>
        <div className="col col-md-6">
          <div>Compute Environment: {cenv?.name}</div>
        </div>
      </div>
      <div className="mb-5"></div>
      <Tabs defaultActiveKey="results">
        <Tab eventKey="results" title="Results">
          <Card.Body>
            <Accordion defaultActiveKey="0">
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Metrics
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {_.keysIn(results.data).includes("metrics") && _.keysIn(results.data.metrics).map((value, index) => {
                      return <div key={index}>{value}: {results.data.metrics[value]}</div>
                    })
                  }
                </Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Params
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {_.keysIn(results.data).includes("params") && _.keysIn(results.data.params).map((value, index) => {
                      return <div key={index}>{value}: {results.data.params[value]}</div>
                    })
                  }
                </Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                Tags
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  {_.keysIn(results.data).includes("tags") && _.keysIn(results.data.tags).map((value, index) => {
                      if(value.includes("mlflow") || value.includes("ilyde")){
                        return ""
                      }else{
                        return <div key={index}>{value}: {results.data.tags[value]}</div>
                      }
                    })
                  }
                </Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                Artifacts
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>

                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          </Card.Body>
        </Tab>
        <Tab eventKey="logs" title="Logs">
          <Card.Body>
              {logs.map((value, index) => {
                return <div key={index}>{value.message}</div>
              })}
          </Card.Body>
        </Tab>
      </Tabs>
    </Fragment>
   );
}

import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import TableCozy2 from '../../components/TableCozy2';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from '../../services/utils';
import { ProjectsApi, ModelsApi } from '../../services/ilyde';
import _ from "lodash";
import { Tabs, Tab } from 'react-bootstrap';
import { ModelPublishModalForm } from './ModelPublishModalForm';
import { ModelTransitionModalForm } from './ModelTransitionModalForm';


export function ProjectModelDetail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId, modelName } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [model, setModel] = useState({});
  const [modelVersions, setModelVersions] = useState([]);
  const [modal, setModal] = useState({});

  useEffect(() => {
    dispatch(setContentTitle({title: model?.name, subtitle: modelVersions.length + " versions"}));
  },[model, modelVersions]);

  useEffect(()=>{
    let mounted = true;
    const apiConfig = getIlydeApiConfiguration();
    const modelsApi = new ModelsApi(apiConfig);
    modelsApi.retrieveModel(modelName).then((response) => {
      setModel(response.data);
    });
    modelsApi.listModelVersions(modelName).then((response) => {
      setModelVersions(response.data.data);
    });

    return () => {
      mounted = false;
    }
  }, [modelName]);

  const handleModelVersionTransitionStage = (modelName, version, currentStage) => {
    setModalOpen(false);
    setModal({component: ModelTransitionModalForm, componentProps: {
      modelName: modelName,
      version: version,
      currentStage: currentStage,
      handleModalCancel: () => setModalOpen(false),
      handleFormSubmitted: (modelVersion) => {
        setModelVersions(_.unionBy([modelVersion], modelVersions, "version"));
        setModalOpen(false);
      },
    }});
    setModalOpen(true);
  }

  const handleModelVersionPublish = (modelName, version, currentStage) => {
    setModalOpen(false);
    setModal({component: ModelPublishModalForm, componentProps: {
      modelName: modelName,
      version: version,
      stage: currentStage,
      projectId: projectId,
      handleModalCancel: () => setModalOpen(false),
      handleFormSubmitted: () => {
        setModalOpen(false);
        history.push(`/projects/${projectId}/modelapis`);
      },
    }});
    setModalOpen(true);
  }

  const tableOptions = {
    defaultSortCol: "creation_timestamp",
    defaultSortDir: "desc",
    onRowClick: (d) => {
      console.log(d);
    }
  };
  const tableColumns = [
    {
      headerText: "Version",
      id: "version",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "",
      id: "description",
      sortable: false,
      style: "small-grey",
      type: "text",
    },{
      headerText: "Stage",
      id: "stage",
      sortable: false,
      style: "normal",
      type: "text",
    },{
      headerText: "Registered At",
      id: "creation_timestamp",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      buttonText: "Source",
      headerText: "",
      id: "button_source",
      onButtonClick: (d) => {
        if(d.source){
          history.push(`/projects/${projectId}/experiments/${d.source}`);
        }
      },
      sortable: false,
      style: "primary",
      type: "button",
    },{
      buttonText: "Transition stage",
      headerText: "",
      id: "button_stage",
      onButtonClick: (d) => {
        handleModelVersionTransitionStage(model.name, d.version, d.stage);
      },
      sortable: false,
      style: "primary",
      type: "button",
    },{
      buttonText: "Publish",
      headerText: "",
      id: "button_publish",
      onButtonClick: (d) => {
        handleModelVersionPublish(model.name, d.version, d.stage);
      },
      sortable: false,
      style: "primary",
      type: "button",
    }
  ]

  return (
    <Fragment>
      {modalOpen && <modal.component  {...modal.componentProps} />}
      <div className="container-fluid border-block">
        <div className="row">
          <div className="col col-md-4">
            <div><span className="label">Created At:</span> {new Date(model?.creation_timestamp).toLocaleString()}</div>
          </div>
          <div className="col col-md-4">
            <div><span className="label">Last Modified:</span> {new Date(model?.last_updated_timestamp).toLocaleString()}</div>
          </div>
          <div className="col col-md-4">
          </div>
        </div>
      </div>
      <div className="mb-5"></div>
      <div className="input-row">
        <label>
          Desciption
          <textarea
            readOnly
            value={model?.description}
            rows="15"
            cols="50"
          >
          </textarea>
        </label>
      </div>
      <div className="mb-5"></div>
      <Tabs defaultActiveKey="versions" className="mt-5">
        <Tab eventKey="versions" title="Versions">
          <TableCozy2
            columns={tableColumns}
            data={modelVersions.map((m) => {
              const d = new Date(m.creation_timestamp);
              return {
                creation_timestamp: d.toLocaleString(),
                description: m.description,
                stage: m.current_stage,
                version: m.version,
                source: m.tags['ilyde.job']
            }})}
            options={tableOptions}
          />
        </Tab>
      </Tabs>
    </Fragment>
  );
}

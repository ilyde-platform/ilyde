import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams
} from "react-router-dom";
import TableCozy2 from '../../components/TableCozy2';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from '../../services/utils';
import { ProjectsApi, ModelsApi, ModelapisApi } from '../../services/ilyde';
import { ModalConfirm } from '../../components/ModalConfirm';
import { ModalInfo } from '../../components/ModalInfo';
import { selectAllUsers } from '../users/usersSlice';
import { selectProjectById } from './projectsSlice';
import _ from "lodash";
import { Paging } from '../../components/Pagination';


export function ProjectModelApis(props) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [pageLimit, setPageLimit] = useState(25);
  const project = useSelector(state => selectProjectById(state, projectId));
  const [modelapis, setModelapis] = useState({total: 0, limit: pageLimit, page: 1, data: []});
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState({});
  const title = "Model Apis";

  useEffect(() => {
    dispatch(setContentTitle({title: title, subtitle: modelapis.total + " items"}));
  },[modelapis]);

  useEffect(()=>{
    let mounted = true;
    getModelapis(projectId, pageLimit, 1).then((results) => {
      setModelapis(results);
    })
    return () => {
      mounted = false;
    }
  }, [projectId]);

  useEffect(() => {
    const apiConfig = getIlydeApiConfiguration();
    const modelapisApi = new ModelapisApi(apiConfig);
    const intervalID = setInterval(() => {
      let updates = [];
      modelapis.data.filter((w) => ["STARTING", "RUNNING"].includes(w.state)).
      forEach((item, i, array) => {
        updates.push(modelapisApi.statusModelapi(item.id).then((response) => {
          if (item.state === response.data.state){
            return item;
          }else{
            return modelapisApi.retrieveModelapi(item.id).then((response) => {
              return response.data;
            });
          }
        }));
      });
      Promise.all(updates).then((values) => {
        setModelapis({...modelapis, data: _.unionBy(values, modelapis.data, "id")});
      });
    }, 10000);

    return () => {clearInterval(intervalID);}

  }, [modelapis]);

  const parseDate = modelapis.data.map((mdl) => {
    const d = new Date(mdl.last_start);
    const c = new Date(mdl.create_at);
    return {
      id: mdl.id,
      name: mdl.metadata.name,
      model: mdl.spec.model,
      stage: mdl.spec.stage,
      version: mdl.spec.version,
      state: _.capitalize(mdl.state),
      create_at: c.toLocaleString(),
      last_start: d.toLocaleString()
    };
  })

  const handlePaginationItemClick = (page) => {
    getModelapis(projectId, pageLimit, page).then((results) => {
      setModelapis(results);
    })
  }
  const refresh = () => {
    getModelapis(projectId, modelapis.limit, modelapis.page).then((results) => {
      setModelapis(results);
    })
  }
  const handleStopModelapis = (modelapiId, currentState) => {
    setModalOpen(false);
    if (["STARTING", "RUNNING"].includes(currentState)){
      const apiConfig = getIlydeApiConfiguration();
      const modelapisApi = new ModelapisApi(apiConfig);
      modelapisApi.stopModelapi(modelapiId).then((response) => {
        refresh();
      }).catch((errors) => {
        setModal({component: ModalInfo, componentProps: {
          title: "Stop Model Api",
          content: errors.response.details,
          handleCancel: () => setModalOpen(false),
        }});
        setModalOpen(true);
      });
    }
    else {
      setModal({component: ModalInfo, componentProps: {
        title: "Stop Model Api",
        content: "Cannot stop not running Model Api",
        handleCancel: () => setModalOpen(false),
      }});
      setModalOpen(true);
    }
  }

  const handleDeleteModelapis = (modelapiId, currentState) => {
    setModalOpen(false);
    if (["STARTING", "RUNNING"].includes(currentState)){
      setModal({component: ModalInfo, componentProps: {
        title: "Delete Model Api",
        content: "Cannot delete Running Model Api",
        handleCancel: () => setModalOpen(false),
      }});
      setModalOpen(true);
    }
    else{
      const apiConfig = getIlydeApiConfiguration();
      const modelapisApi = new ModelapisApi(apiConfig);
      modelapisApi.deleteModelapi(modelapiId).then((response) => {
        refresh();
      }).catch((errors) => {
        setModal({component: ModalInfo, componentProps: {
          title: "Delete Model Api",
          content: errors.response.details,
          handleCancel: () => setModalOpen(false),
        }});
        setModalOpen(true);
      });
    }
  }

  const handleStartModelapis = (modelapiId, currentState) => {
    setModalOpen(false);
    if (["STARTING", "RUNNING"].includes(currentState)){
      setModal({component: ModalInfo, componentProps: {
        title: "Start Model Api",
        content: "Cannot start Running Model Api",
        handleCancel: () => setModalOpen(false),
      }});
      setModalOpen(true);
    }
    else{
      const apiConfig = getIlydeApiConfiguration();
      const modelapisApi = new ModelapisApi(apiConfig);
      modelapisApi.startModelapi(modelapiId).then((response) => {
        refresh();
      }).catch((errors) => {
        setModal({component: ModalInfo, componentProps: {
          title: "Start Model Api",
          content: errors.response.details,
          handleCancel: () => setModalOpen(false),
        }});
        setModalOpen(true);
      });
    }
  }

  const tableOptions = {
    defaultSortCol: "create_at",
    defaultSortDir: "desc",
    onRowClick: null,
  };

  const tableColumns = [
    {
      id: "name",
      headerText: "Name",
      sortable: true,
      type: "text",
      style: "normal",
    },
    {
      id: "stage",
      headerText: "Stage",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "version",
      headerText: "Version",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "state",
      headerText: "State",
      type: "text",
      sortable: true,
      style: "normal",
    },{
      headerText: "Created At",
      id: "create_at",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      buttonText: "Start",
      headerText: "",
      id: "button_start",
      onButtonClick: (d) => {
        handleStartModelapis(d.id, _.toUpper(d.state));
      },
      sortable: false,
      style: "primary",
      type: "button",
    },{
      buttonText: "Stop",
      headerText: "",
      id: "button_stop",
      onButtonClick: (d) => {
        handleStopModelapis(d.id, _.toUpper(d.state));
      },
      sortable: false,
      style: "primary",
      type: "button",
    },{
      buttonText: "Delete",
      headerText: "",
      id: "button_delete",
      onButtonClick: (d) => {
        handleDeleteModelapis(d.id, _.toUpper(d.state));
      },
      sortable: false,
      style: "primary",
      type: "button",
    }
  ];

  return (
    <Fragment>
      {modalOpen && <modal.component  {...modal.componentProps} />}
      <TableCozy2
        columns={tableColumns}
        data={parseDate}
        options={tableOptions}
      />
      <Paging
        total={modelapis.total}
        page={modelapis.page}
        limit={pageLimit}
        handlePaginationItemClick={handlePaginationItemClick}
      />
    </Fragment>
  );
}

function getModelapis(projectId, limit, page){
  const apiConfig = getIlydeApiConfiguration();
  const modelapisApi = new ModelapisApi(apiConfig);
  const body = {"limit": limit, "page": page, "query":{
      "project": projectId
    }
  }
  return modelapisApi.listModelapis(body).then((response) => {
    return response.data;
  });
}

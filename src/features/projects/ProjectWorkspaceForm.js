import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { WorkspacesApi, ProjectsApi } from '../../services/ilyde';
import { DatasetSelector } from '../../components/DatasetSelector';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import TableCozy2 from '../../components/TableCozy2';
import Modal  from '../../components/Modal';
import { selectAllIdes } from '../ides/idesSlice';
import { selectHwtierByDeployment } from '../hwtiers/hwtiersSlice';
import { selectCenvsByDeployment } from '../cenvs/cenvsSlice';
import { selectAllDatasets } from '../datasets/datasetsSlice';
import _ from 'lodash';


export function ProjectWorkspaceForm({projectId}) {
  const history = useHistory();
  const {keycloak, initialized} = useKeycloak();
  const ides = useSelector(selectAllIdes);
  const cenvs = useSelector((state) => selectCenvsByDeployment(state, false));
  const hwtiers = useSelector((state) => selectHwtierByDeployment(state, false));
  const sdatasets = useSelector(selectAllDatasets);
  const [pdatasets, setPDatasets] = useState([]);
  const [revisions, setRevisions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const datasets = pdatasets.concat(sdatasets);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const projectsApi = new ProjectsApi(apiConfig);
    projectsApi.listProjectDatasets(projectId, 25, 1).then((response) => {
      setPDatasets(response.data.data);
    });
    projectsApi.listProjectRevisions(projectId, 25, 1).then((response) => {
      setRevisions(response.data.data);
    });
  }, [projectId]);


  const formik = useFormik({
    initialValues: {
     name: '',
     ide: 0,
     hardware: 0,
     environment: 0,
     datasets: []
   },
   validationSchema: Yup.object({
     name: Yup.string().required('Required field'),
     ide: Yup.number().required('Required field'),
     hardware: Yup.number().required('Required field'),
     environment: Yup.number().required('Required field'),
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     const payload = {
       metadata: {
         owner: keycloak.tokenParsed.sub,
         name: values.name,
         project: projectId
       },
       spec:{
         ide: ides[values.ide].id,
         revision: revisions[0].id,
         environment: cenvs[values.environment].id,
         hardware: hwtiers[values.hardware].id,
         datasets: values.datasets.map(d => { return {id: d.id, version: d.version, mount_output: d.mount_output}})
       }
     }

     const apiConfig = getIlydeApiConfiguration();
     const workspacesApi = new WorkspacesApi(apiConfig);
     workspacesApi.createWorkspace(payload).then((response) => {
       setSubmitting(false);
       resetForm({
        name: '',
        ide: 0,
        hardware: 0,
        environment: 0,
        datasets: []
      });
      window.open(`/workspace/${response.data.id}/lab`, '_blank');
     }).catch(e => {
       setSubmitting(false);
       setErrors({submit: e.response.data.detail});
     });
   },
  });

  const handleDatasetAttach = (values) => {
    let fvalues = JSON.parse(JSON.stringify(formik.values));
    const index = _.findIndex(fvalues.datasets, function(n) {
      return n.id === values.id;
    });
    if (index < 0){
      fvalues.datasets.push(values);
      formik.setValues(fvalues);
    }
    setModalOpen(false);
  }

  const datasetSelector = (
      <Modal closeModal={() => setModalOpen(false)} title="Choose a Dataset">
        <section>
          <DatasetSelector datasets={datasets} handleSubmit={handleDatasetAttach}></DatasetSelector>
        </section>
      </Modal>
  )

  const handleDatasetDetach  = (d) => {
    let values = JSON.parse(JSON.stringify(formik.values));
    const index = _.findIndex(values.datasets, function(n) {
      return n.id === d.id;
    });
    values.datasets.splice(index, 1);
    formik.setValues(values);
  }

  const tableColumns = [
    {
      headerText: "Name",
      id: "name",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "version",
      id: "version",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "Mount Output",
      id: "mount_output",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      buttonText: "Detach",
      headerText: "",
      id: "button_detach",
      onButtonClick: (d) => {
        handleDatasetDetach(d);
      },
      type: "button",
      sortable: false,
      style: "secondary",
    }
  ];

  return (
    <Fragment>
      {modalOpen && datasetSelector}
      { formik.errors.submit && <div>{formik.errors.submit}</div>}
      <div className="mb-3"></div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="input-row">
          <label>
            Name
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jupyter Notebook"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
             />
          </label>
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Ide
            <select
              id="ide"
              name="ide"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ide}
            >
              {ides.map((val, index) => {
                return <option key={index} value={index}>{val.title}</option>
              })}
            </select>
          </label>
          {formik.touched.ide && formik.errors.ide ? (
            <div className="error">{formik.errors.ide}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Compute Environment
            <select
              id="environment"
              name="environment"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.environment}
            >
              {cenvs.map((val, index) => {
                return <option key={index} value={index}>{val.name}</option>
              })}
            </select>
          </label>
          {formik.touched.environment && formik.errors.environment ? (
            <div className="error">{formik.errors.environment}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Hardware Tier
            <select
              id="hardware"
              name="hardware"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hardware}
            >
              {hwtiers.map((val, index) => {
                return <option key={index} value={index}>{val.name}</option>
              })}
            </select>
          </label>
          {formik.touched.hardware && formik.errors.hardware ? (
            <div className="error">{formik.errors.hardware}</div>) : null}
        </div>
        <br/>
        <div className="buttons-wrapper">
          <button type="button" className="secondary" onClick={() => {setModalOpen(true)}}>+Attach Datasets</button>
        </div>
        <div className="mb-3"></div>
        <TableCozy2
          columns={tableColumns}
          data={formik.values.datasets.map((d) => {
            return {
              id: d.id,
              name: d.name,
              version: d.version,
              mount_output: d.mount_output ? "Yes" : "No"
            }
          })}
        ></TableCozy2>
        <hr />
        <div className="buttons-wrapper">
          <input type="submit" className="primary" value="Launch" disabled={formik.isSubmitting} />
        </div>
      </form>
    </Fragment>
  );
}

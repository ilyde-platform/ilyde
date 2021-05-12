import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import { useFormik } from 'formik';
import { useKeycloak } from '@react-keycloak/web';
import * as Yup from 'yup';
import { ExperimentsApi, ProjectsApi, FilesApi } from '../../services/ilyde';
import { DatasetSelector } from '../../components/DatasetSelector';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import TableCozy2 from '../../components/TableCozy2';
import Modal  from '../../components/Modal';
import { selectHwtierByDeployment } from '../hwtiers/hwtiersSlice';
import { selectCenvsByDeployment } from '../cenvs/cenvsSlice';
import { selectAllDatasets } from '../datasets/datasetsSlice';
import _ from 'lodash';
import { parse } from 'yaml'


export function ProjectExperimentForm({projectId, handleSubmitted}) {
  const history = useHistory();
  const {keycloak, initialized} = useKeycloak();
  const cenvs = useSelector((state) => selectCenvsByDeployment(state, false));
  const hwtiers = useSelector((state) => selectHwtierByDeployment(state, false));
  const sdatasets = useSelector(selectAllDatasets);
  const [pdatasets, setPDatasets] = useState([]);
  const [revisions, setRevisions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasMLproject, setHasMLproject] = useState(false);
  const [expConf, setExpConf] = useState({entry_points:{}});

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

  useEffect(()=>{
    if(revisions.length){
      for(let f of revisions[0].file_tree){
        if (f.name === 'MLproject'){
          setHasMLproject(true);
          const apiConfig = getIlydeApiConfiguration();
          const filesApi = new FilesApi(apiConfig);
          filesApi.getProjectFile(projectId, 'MLproject', f.version).then((response) => {
            const conf = parse(response.data);
            setExpConf(conf);
          });
        }
      }
    }
  }, [revisions]);

  const formik = useFormik({
    initialValues: {
     name: '',
     hardware: 0,
     environment: 0,
     entrypoint: '',
     params: '',
     datasets: []
   },
   validationSchema: Yup.object({
     name: Yup.string().required('Required field'),
     entrypoint: Yup.string().required('Required field'),
     hardware: Yup.number().required('Required field'),
     environment: Yup.number().required('Required field'),
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     if(!hasMLproject){
       resetForm({
        name: '',
        entrypoint: '',
        params: '',
        hardware: 0,
        environment: 0,
        datasets: []
      });
       setSubmitting(false);
       setErrors({submit: "This doesn't have an MLproject's file, please define an MLproject's file."});
       return;
     }
     let params;
     if (!values.params){
       params = [];
     }
     else{
       params = JSON.parse(values.params);
       if (!Array.isArray(params)){
         setSubmitting(false);
         setErrors({params: "Type mismatch: expecting a Json Array."});
         return;
       }
     }
     const entrypoints = _.keysIn(expConf.entry_points);
     if(!entrypoints.includes(values.entrypoint)){
       setSubmitting(false);
       setErrors({entrypoint: "Incorrect value: expecting " + entrypoints.join(', ')});
       return;
     }
     const payload = {
       metadata: {
         owner: keycloak.tokenParsed.sub,
         name: values.name,
         project: projectId
       },
       spec:{
         entrypoint: values.entrypoint,
         params: params,
         revision: revisions[0].id,
         environment: cenvs[values.environment].id,
         hardware: hwtiers[values.hardware].id,
         datasets: values.datasets.map(d => { return {id: d.id, version: d.version, mount_output: d.mount_output}})
       }
     }

     const apiConfig = getIlydeApiConfiguration();
     const experimentsApi = new ExperimentsApi(apiConfig);
     experimentsApi.submitExperiment(payload).then((response) => {
       handleSubmitted();
       setSubmitting(false);
       resetForm({
        name: '',
        entrypoint: '',
        params: '',
        hardware: 0,
        environment: 0,
        datasets: []
      });
     }).catch(e => {
       setSubmitting(false);
       setErrors({submit: e.response.data.detail});
     });;
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
        <DatasetSelector datasets={datasets} handleSubmit={handleDatasetAttach}></DatasetSelector>
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
              placeholder="My experiment"
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
            Entrypoint
            <input
              id="entrypoint"
              name="entrypoint"
              type="text"
              placeholder="main"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.entrypoint}
            />
          </label>
          {formik.touched.ide && formik.errors.entrypoint ? (
            <div className="error">{formik.errors.entrypoint}</div>) : null}
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
        <div className="input-row">
          <label>
            Params
            <textarea
              id="params"
              name="params"
              placeholder={JSON.stringify([{name: 'param1', value: 'value1'}, {name: 'param2', value: 'value2'}])}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.params}
              rows="15"
              cols="50"
            >
            </textarea>
          </label>
          {formik.touched.params && formik.errors.params ? (
            <div className="error">{formik.errors.params}</div>) : null}
        </div>
        <br/>
        <div className="buttons-wrapper">
          <button type="button" className="secondary" onClick={() => {setModalOpen(true)}}>+Attach Datasets</button>
        </div>
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
          <input type="submit" className="primary" value="Start Experiment" disabled={formik.isSubmitting} />
        </div>
      </form>
    </Fragment>
  );
}

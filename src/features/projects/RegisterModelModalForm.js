import React, { Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  useHistory
} from "react-router-dom";
import * as Yup from 'yup';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { ModelsApi, ProjectsApi } from '../../services/ilyde';
import Modal  from '../../components/Modal';


export function RegisterModelModalForm({source, run_id, projectId, experimentId, handleModalCancel}) {
  const history = useHistory();
  const [models, setModels] = useState([]);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const projectsApi = new ProjectsApi(apiConfig);
    return projectsApi.listProjectModels(projectId).then((response) => {
      setModels(response.data.data);
    });
  }, [projectId]);

  const formik = useFormik({
    initialValues: {
     name: '',
     description: ''
   },
   validationSchema: Yup.object({
     name: Yup.string().required('Required'),
     description: Yup.string().required('Required')
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     const payload = {
       name: values.name,
       description: values.description,
       run_id: run_id,
       source: source,
       tags: {
         'ilyde.job': experimentId
       }
     }
     const apiConfig = getIlydeApiConfiguration();
     const modelsApi = new ModelsApi(apiConfig);
     modelsApi.createModelVersion(payload, values.name)
     .then(modelVersion => {
       resetForm({});
       setSubmitting(false);
       history.push(`/projects/${projectId}/models/${values.name}`);
     })
     .catch(e => {
       setSubmitting(false);
       const message = e.response.data.detail;
       setErrors({submit: message});
     });
   },
  });

  return (
    <Modal closeModal={handleModalCancel} title="Register Model">
      { formik.errors.submit && <div>{formik.errors.submit}</div>}
      <div className="mb-3"></div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="input-row">
          <label>
            Model
            <select
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            >
               <option key='-1' value=''>Select Model</option>
              {models.map((val, index) => {
                return <option key={index} value={val.name}>{val.name}</option>
              })}
            </select>
          </label>
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Model version train with params ...."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              rows="15"
              cols="50"
            >
            </textarea>
          </label>
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>) : null}
        </div>
        <hr />
        <div className="buttons-wrapper">
          <button className="secondary" onClick={handleModalCancel}>Cancel</button>
          <input type="submit" className="primary" value="Register" disabled={formik.isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}

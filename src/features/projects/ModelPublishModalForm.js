import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { ModelapisApi } from '../../services/ilyde';
import Modal  from '../../components/Modal';
import { useKeycloak } from '@react-keycloak/web';
import { selectHwtierByDeployment } from '../hwtiers/hwtiersSlice';
import { selectCenvsByDeployment } from '../cenvs/cenvsSlice';
import _ from 'lodash';

export function ModelPublishModalForm({projectId, modelName, version, stage, handleFormSubmitted, handleModalCancel}) {
  const {keycloak, initialized} = useKeycloak();
  const cenvs = useSelector((state) => selectCenvsByDeployment(state, true));
  const hwtiers = useSelector((state) => selectHwtierByDeployment(state, true));

  const formik = useFormik({
    initialValues: {
      name: modelName.split('-').map((w) => _.capitalize(w)).join(' ') + " Api",
      hardware: 0,
      environment: 0,
   },
   validationSchema: Yup.object({
     name: Yup.string().required('Required field'),
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
         environment: cenvs[values.environment].id,
         hardware: hwtiers[values.hardware].id,
         model: modelName,
         stage: stage,
         version: +version
       }
     }
     const apiConfig = getIlydeApiConfiguration();
     const modelapisApi = new ModelapisApi(apiConfig);

     modelapisApi.createModelapi(payload)
     .then(response => {
       modelapisApi.startModelapi(response.data.id).then((response) => {
         resetForm({});
         setSubmitting(false);
         handleFormSubmitted();
       }).catch(e => {
         setSubmitting(false);
         const message = e.response.data.message;
         setErrors({submit: message});
       });
     }).catch(e => {
       setSubmitting(false);
       const message = e.response.data.detail;
       setErrors({submit: message});
     });
   },
  });

  return (
    <Modal closeModal={handleModalCancel} title="Configure Model Api">
      <section>
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
                onBlur={formik.handleBlur}
                value={formik.values.name}
               />
            </label>
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>) : null}
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
          <hr />
          <div className="buttons-wrapper">
            <button className="secondary" onClick={handleModalCancel}>Cancel</button>
            <input type="submit" className="primary" value="Publish" disabled={formik.isSubmitting} />
          </div>
        </form>
      </section>
    </Modal>
  );
}

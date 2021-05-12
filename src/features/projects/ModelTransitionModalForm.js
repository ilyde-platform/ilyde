import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { ModelsApi } from '../../services/ilyde';
import Modal  from '../../components/Modal';


export function ModelTransitionModalForm({modelName, version, currentStage, handleFormSubmitted, handleModalCancel}) {
  const defaultStages = ["None", "Staging", "Production", "Archived"];
  const formik = useFormik({
    initialValues: {
     stage: '',
   },
   validationSchema: Yup.object({
     stage: Yup.string().required('Required').oneOf(defaultStages.filter((s) => s !== currentStage)),
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     const apiConfig = getIlydeApiConfiguration();
     const modelsApi = new ModelsApi(apiConfig);
     modelsApi.transitionModelVersionStage(values, modelName, version)
     .then(modelVersion => {
       resetForm({});
       setSubmitting(false);
       handleFormSubmitted(modelVersion);
     })
     .catch(e => {
       setSubmitting(false);
       const message = e.response.data.detail;
       setErrors({submit: message});
     });
   },
  });

  return (
    <Modal closeModal={handleModalCancel} title="Transition Stage">
      { formik.errors.submit && <div>{formik.errors.submit}</div>}
      <div className="mb-3"></div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="input-row">
          <label>
            Stage
            <select
              id="stage"
              name="stage"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stage}
            >
               <option key='-1' value=''>Select new Stage</option>
              {defaultStages.filter((s) => s !== currentStage).map((val, index) => {
                return <option key={index} value={val}>{val}</option>
              })}
            </select>
          </label>
          {formik.touched.stage && formik.errors.stage ? (
            <div>{formik.errors.stage}</div>) : null}
        </div>
        <hr />
        <div className="buttons-wrapper">
          <button className="secondary" onClick={handleModalCancel}>Cancel</button>
          <input type="submit" className="primary" value="Transition" disabled={formik.isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}

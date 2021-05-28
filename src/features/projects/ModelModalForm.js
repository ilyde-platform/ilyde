import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { ModelsApi } from '../../services/ilyde';
import Modal  from '../../components/Modal';


export function ModelModalForm({projectId, handleModalCancel, handleFormSubmitted}) {
  const formik = useFormik({
    initialValues: {
     name: '',
     description: '',
     tags: {
       'ilyde.project': projectId
     }
   },
   validationSchema: Yup.object({
     name: Yup.string().required('Required'),
     description: Yup.string().required('Required'),
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     const apiConfig = getIlydeApiConfiguration();
     const modelsApi = new ModelsApi(apiConfig);
     modelsApi.createModel(values)
     .then(model => {
       resetForm({});
       setSubmitting(false);
       handleFormSubmitted();
     })
     .catch(e => {
       setSubmitting(false);
       const message = e.response.data.detail.includes("RESOURCE_ALREADY_EXISTS") ? "A model with the given name already exists" : "Ops, an unexpected error occured";
       setErrors({submit: message});
     });
   },
  });

  return (
    <Modal closeModal={handleModalCancel} title="Create a Model">
      { formik.errors.submit && 
        <section>
          <div>{formik.errors.submit}</div>
          <div className="mb-3"></div>
        </section>
      }
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <section>
          <div className="input-row">
            <label>
              Name
              <input
                id="name"
                name="name"
                type="text"
                placeholder="my-model"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
               />
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
                placeholder="My pawerfull model"
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
        </section>
        <hr />
        <section>
          <div className="buttons-wrapper">
            <button className="secondary" onClick={handleModalCancel}>Cancel</button>
            <input type="submit" className="primary" value="Create" disabled={formik.isSubmitting} />
          </div>
        </section>
      </form>
    </Modal>
  );
}

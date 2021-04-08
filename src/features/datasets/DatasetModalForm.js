import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { unwrapResult } from '@reduxjs/toolkit';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { addNewDataset } from './datasetsSlice';
import Modal  from '../../components/Modal';


export function DatasetModalForm({handleModalCancel, handleFormSubmitted}) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
     name: '',
     description: ''
   },
   validationSchema: Yup.object({
     name: Yup.string().required('Required'),
     description: Yup.string().required('Required'),
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     dispatch(addNewDataset({scope: "Global", project: "", ...values}))
     .then(unwrapResult)
     .then(dataset => {
       resetForm({});
       setSubmitting(false);
       handleFormSubmitted();
     })
     .catch(e => {
       setSubmitting(false);
       setErrors({submit: "Ops! An error occur."});
     });
   },
  });

  return (
    <Modal closeModal={handleModalCancel} title="Create a Dataset">
      <section className="content">
        { formik.errors.submit && <div>{formik.errors.submit}</div>}
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="input-row">
            <label>
              Name
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Mnist-data"
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
                placeholder="Small 28x28 grayscale images"
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
            <input type="submit" className="primary" value="Create" disabled={formik.isSubmitting} />
          </div>
        </form>
      </section>
    </Modal>
  );
}

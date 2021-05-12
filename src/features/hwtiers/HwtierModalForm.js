import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { unwrapResult } from '@reduxjs/toolkit';
import { getIlydeApiConfiguration } from '../../services/utils';
import { addNewHwtier } from './hwtiersSlice';
import Modal  from '../../components/Modal';


export function HwtierModalForm({handleModalCancel, handleFormSubmitted}) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
     name: '',
     cores: 250,
     memory: 1536,
     gpu: 0,
     instancegroup: '',
     is_default: false,
     deployment: false
   },
   validationSchema: Yup.object({
     name: Yup.string().required('Required'),
     cores: Yup.number().min(250, "Cpus have to be minimun 250m (in millishares)"),
     memory: Yup.number().min(1500, "Ram have to be minimun 1500Mb."),
     instancegroup: Yup.string().required('Required: instance group name for node selection is not defined.'),
     deployment: Yup.boolean().required('Required')
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     dispatch(addNewHwtier(values))
     .then(unwrapResult)
     .then(hwtier => {
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
    <Modal closeModal={handleModalCancel} title="New Hardware Tier">
      { formik.errors.submit && <div>{formik.errors.submit}</div>}
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="input-row">
          <label>
            Name
            <input
              id="name"
              name="name"
              type="text"
              placeholder="M4large"
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
            CPUs
            <input
              id="cores"
              name="cores"
              type="number"
              placeholder="250"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cores}
            />
          </label>
          {formik.touched.cores && formik.errors.cores ? (
            <div>{formik.errors.cores}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            RAM
            <input
              id="memory"
              name="memory"
              type="number"
              placeholder="1500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.memory}
            />
          </label>
          {formik.touched.memory && formik.errors.memory ? (
            <div>{formik.errors.memory}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            InstanceGroup
            <input
              id="instancegroup"
              name="instancegroup"
              type="text"
              placeholder="executors"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.instancegroup}
            />
          </label>
          {formik.touched.instancegroup && formik.errors.instancegroup ? (
            <div>{formik.errors.instancegroup}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Deployment Tier
            <input
              id="deployment"
              name="deployment"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deployment}
            />
          </label>
          {formik.touched.deployment && formik.errors.deployment ? (
            <div>{formik.errors.deployment}</div>) : null}
        </div>
        <hr />
        <div className="buttons-wrapper">
          <button className="secondary" onClick={handleModalCancel}>Cancel</button>
          <input type="submit" className="primary" value="Add" disabled={formik.isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}

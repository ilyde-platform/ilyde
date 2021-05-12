import React, { Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

export function DatasetSelector({datasets, handleSubmit}) {

  const formik = useFormik({
    initialValues: {
     id: '',
     version: 'latest',
     mount_output: false,
   },
   validationSchema: Yup.object({
     id: Yup.string().required('Required field'),
     version: Yup.string().required('Required field'),
     mount_output: Yup.boolean().required('Required field'),
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     // verified version
     let versions = ["latest"];
     let dname = '';

     for (let dataset of datasets){
       if (dataset.id === values.id){
         versions = versions.concat(_.range(1, +dataset.version + 1).map((v) => v.toString()));
         dname = dataset.name;
         break;
       }
     }
     if (versions.includes(values.version)) {
       handleSubmit({name: dname, ...values});
       resetForm({});
     }
     else {
       setErrors({version: "version is not valid."});
     }
     setSubmitting(false);
   },
  });

  return (
    <Fragment>
      {formik.errors.submit && <div>{formik.errors.submit}</div>}
      <div className="mb-3"></div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="input-row">
          <label>
            Dataset
            <select
              id="name"
              name="id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
             >
             <option key="-1" value="">Select a Dataset</option>
             {datasets.map((val, index) => {
               return <option key={index} value={val.id}>{val.name}</option>
             })}
             </select>
          </label>
          {formik.touched.id && formik.errors.id ? (
            <div className="error">{formik.errors.id}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Version
            <input
              id="version"
              name="version"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.version}
            />
          </label>
          {formik.touched.version && formik.errors.version ? (
            <div className="error">{formik.errors.version}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Mount Output
            <input
              id="mount"
              name="mount_output"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mount_output}
            />
          </label>
          {formik.touched.template && formik.errors.mount_output ? (
            <div className="error">{formik.errors.mount_output}</div>) : null}
        </div>
        <hr />
        <div className="buttons-wrapper">
          <input type="submit" className="primary" value="Add Dataset" disabled={formik.isSubmitting} />
        </div>
      </form>
    </Fragment>
  );
}

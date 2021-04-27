import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { setContentTitle } from '../headerbar/headerbarSlice';
import { ProjectsApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { addNewProject } from './projectsSlice';


export function ProjectForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setContentTitle({title: "New Project", subtitle: ''}));
  }, []);

  const formik = useFormik({
    initialValues: {
     name: '',
     visibility: 'PRIVATE',
     template: 'GENERIC',
     description: ''
   },
   validationSchema: Yup.object({
     name: Yup.string().required('Required field'),
     visibility: Yup.string().required('Required').oneOf(['PRIVATE', 'PUBLIC']),
     template: Yup.string().required('Required').oneOf(['GENERIC']),
     description: Yup.string().required('Required'),
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     dispatch(addNewProject(values))
     .then(unwrapResult)
     .then(project => {
       // resetForm({});
       // setSubmitting(false);
       history.push(`/projects/${project.id}`);
     })
     .catch(e => {
       setSubmitting(false);
       setErrors({submit: "Ops! An error occurred."});
     });
   },
  });

  return (
    <section>
      { formik.errors.submit && <div>{formik.errors.submit}</div>}
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="input-row">
          <label>
            Name
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Mnist"
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
            Visibility
            <select
              id="visibility"
              name="visibility"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.visibility}
            >
              <option value="PRIVATE">Private</option>
              <option value="PUBLIC">Public</option>
            </select>
          </label>
          {formik.touched.visibility && formik.errors.visibility ? (
            <div className="error">{formik.errors.visibility}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Template
            <select
              id="template"
              name="template"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.template}
            >
              <option value="GENERIC">Generic</option>
            </select>
          </label>
          {formik.touched.template && formik.errors.template ? (
            <div className="error">{formik.errors.template}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Introduction to machine learning"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              rows="15"
              cols="50"
            >
            </textarea>
          </label>
          {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>) : null}
        </div>
        <hr />
        <div className="buttons-wrapper">
          <input type="submit" className="primary" value="Create new project" disabled={formik.isSubmitting} />
        </div>
      </form>
    </section>
  );
}

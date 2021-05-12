import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { unwrapResult } from '@reduxjs/toolkit';
import { addNewUser } from './usersSlice';
import Modal  from '../../components/Modal';


export function UserModalForm({handleModalCancel, handleFormSubmitted}) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
     first_name: '',
     last_name: '',
     email: '',
     username: '',
     password: '',
     manager: false,
   },
   validationSchema: Yup.object({
     first_name: Yup.string().required('Required'),
     last_name: Yup.string().required('Required'),
     email: Yup.string().required('Required').email("This is not an email"),
     password: Yup.string().required('Required'),
     manager: Yup.boolean().required('Required')
   }),
   onSubmit: (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
     const {manager, ...payload} = values;
     let groups = [];
     if (manager){
       groups.push("manager");
     }
     dispatch(addNewUser({groups: groups, ...payload}))
     .then(unwrapResult)
     .then(user => {
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
    <Modal closeModal={handleModalCancel} title="New User">
      { formik.errors.submit && <div>{formik.errors.submit}</div>}
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="input-row">
          <label>
            First Name
            <input
              id="first_name"
              name="first_name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
             />
          </label>
          {formik.touched.first_name && formik.errors.first_name ? (
            <div>{formik.errors.first_name}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Last Name
            <input
              id="last_name"
              name="last_name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
          </label>
          {formik.touched.last_name && formik.errors.last_name ? (
            <div>{formik.errors.last_name}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Email
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Username
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </label>
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Password
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>) : null}
        </div>
        <div className="input-row">
          <label>
            Is Admin
            <input
              id="manager"
              name="manager"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.manager}
            />
          </label>
          {formik.touched.manager && formik.errors.manager ? (
            <div>{formik.errors.manager}</div>) : null}
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

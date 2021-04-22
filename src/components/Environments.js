import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import { setContentTitle } from '../features/headerbar/headerbarSlice';
import { IdeList } from '../features/ides/IdeList';
import { CenvsList } from '../features/cenvs/CenvsList';
import { HwtiersList } from '../features/hwtiers/HwtiersList';

export function Environments(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(setContentTitle({title: "Environments", subtitle: ""}));
  },[])

  return (
    <section className="content">
      <div className="row">
        <div className="col col-md-8">
          <div className="card">
            <div className="card-header">
              Hardware Tiers
            </div>
            <div className="card-body">
              <HwtiersList/>
            </div>
          </div>
        </div>
        <div className="col col-md-4">
          <div className="card">
            <div className="card-header">
              IDEs
            </div>
            <div className="card-body">
              <IdeList/>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-header">
              Compute Environments
            </div>
            <div className="card-body">
              <CenvsList/>
            </div>
          </div>
        </div>
      </div>

     </section>
   );
}

import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import { setContentTitle } from '../features/headerbar/headerbarSlice';
import { IdeList } from '../features/ides/IdeList';
import { CenvsList } from '../features/cenvs/CenvsList';
import { HwtiersList } from '../features/hwtiers/HwtiersList';

export function Environments(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setContentTitle({title: "Environments", subtitle: ""}));
  },[dispatch])

  return (
    <Fragment>
      <div className="row">
        <div className="col col-md-7">
          <Card.Header>Hardware Tiers</Card.Header>
          <div className="mb-3"></div>
          <HwtiersList/>
        </div>
        <div className="col col-md-5">
          <Card.Header>Workspace IDEs</Card.Header>
          <div className="mb-3"></div>
          <IdeList/>
          <div className="mb-5"></div>
          <Card.Header>Compute Environments</Card.Header>
          <div className="mb-3"></div>
          <CenvsList/>
        </div>
      </div>
    </Fragment>
   );
}

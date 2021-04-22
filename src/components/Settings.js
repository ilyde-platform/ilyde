import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, useParams
} from "react-router-dom";
import { setContentTitle } from '../features/headerbar/headerbarSlice';
import { HwtiersListExtended } from '../features/hwtiers/HwtiersList';
import { HwtierModalForm } from '../features/hwtiers/HwtierModalForm';
import { UsersList } from '../features/users/UsersList';
import { UserModalForm } from '../features/users/UserModalForm';


export function Settings(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hwtierModalOpen, setHwtierModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  useEffect(() => {
    dispatch(setContentTitle({title: "Settings", subtitle: ""}));
  },[])

  const handleAddHwtierClick = () => {
    setHwtierModalOpen(true);
  }

  const handleAddUserClick = () => {
    setUserModalOpen(true);
  }

  return (
     <Fragment>
      {hwtierModalOpen && <HwtierModalForm handleModalCancel={() => setHwtierModalOpen(false)} handleFormSubmitted={() => setHwtierModalOpen(false)}>
      </HwtierModalForm>}
      {userModalOpen && <UserModalForm handleModalCancel={() => setUserModalOpen(false)} handleFormSubmitted={() => setUserModalOpen(false)}>
      </UserModalForm>}
      <section className="content">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              Hardware Tiers
              <div className="ml-auto">
                <button type="button" className="primary" onClick={handleAddHwtierClick}>+Add</button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <HwtiersListExtended />
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              Users
              <div className="ml-auto">
                <button type="button" className="primary" onClick={handleAddUserClick}>+Add</button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <UsersList />
          </div>
        </div>
       </section>
      </Fragment>
   );
}

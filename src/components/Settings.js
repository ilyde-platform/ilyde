import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import { setContentTitle } from '../features/headerbar/headerbarSlice';
import { HwtiersListExtended } from '../features/hwtiers/HwtiersList';
import { HwtierModalForm } from '../features/hwtiers/HwtierModalForm';
import { UsersList } from '../features/users/UsersList';
import { UserModalForm } from '../features/users/UserModalForm';
import { useKeycloak } from '@react-keycloak/web';
import { Card } from 'react-bootstrap';


export function Settings(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {keycloak, initialized} = useKeycloak();
  const [hwtierModalOpen, setHwtierModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  if (!keycloak.tokenParsed.groups.includes("manager")){
    history.push("/projects");
  }

  useEffect(() => {
    dispatch(setContentTitle({title: "Settings", subtitle: ""}));
  },[dispatch])

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
        <Card.Header>
          <div className="d-flex justify-content-between">
            Hardware Tiers
            <div className="ml-auto">
              <button type="button" className="primary" onClick={handleAddHwtierClick}>New</button>
            </div>
          </div>
        </Card.Header>
        <div className="mb-3"></div>
        <HwtiersListExtended />
        <div className="mb-5"></div>
        <Card.Header>
          <div className="d-flex justify-content-between">
            Users
            <div className="ml-auto">
              <button type="button" className="primary" onClick={handleAddUserClick}>New</button>
            </div>
          </div>
        </Card.Header>
        <div className="mb-3"></div>
        <UsersList />
      </Fragment>
   );
}

import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams
} from "react-router-dom";
import TableCozy2 from '../../components/TableCozy2';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration } from '../../services/utils';
import { ProjectsApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import { useKeycloak } from '@react-keycloak/web';
import { selectProjectById, updateProject, removeMember, addMember, closeProject } from './projectsSlice';
import _ from "lodash";
import { Tabs, Tab, InputGroup, FormControl } from 'react-bootstrap';


export function ProjectSettings(props) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const users = useSelector(selectAllUsers);
  const {keycloak, initialized} = useKeycloak();
  const project = useSelector(state => selectProjectById(state, projectId));
  const [description, setDescription] = useState("");
  const [memberSelected, setMemberSelected] = useState("");
  const isClosed = project?.state === 'OPEN' ? false : true;
  const isOwner = keycloak.tokenParsed.sub === project?.owner ? true : false;

  useEffect(() => {
    dispatch(setContentTitle({title: project?.name, subtitle: ""}));
    setDescription(project?.description);
  },[project]);

  useEffect(() => {
    const excludeMembers = users.filter((u) => !project?.members.includes(u.id));
    if (excludeMembers.length){
      setMemberSelected(excludeMembers[0].id);
    }else{
      setMemberSelected("");
    }
  },[users, project]);

  const handleMemberSelectedChange = (event) => {
    setMemberSelected(event.target.value);
  }

  const handleSaveDescriptionClick = () => {
    dispatch(updateProject({projectId: projectId, payload:{description: description}}));
  }

  const handleAddMemberClick = () => {
    dispatch(addMember({projectId: projectId, payload:{user: memberSelected}}));
  }

  const handleRemoveMemberClick = (member) => {
    if(project.owner !== member){
      dispatch(removeMember({projectId: projectId, payload:{user: member}}));
    }
  }

  const handleArchiveClick = () => {
    dispatch(closeProject(projectId));
  }

  const getUsername = (userId) => {
    const user = _.find(users, ["id", userId]);
    return _.capitalize(user?.username);
  }

  const tableOptions = {
    defaultSortCol: "username",
    defaultSortDir: "asc",
    onRowClick: null
  };
  const tableColumns = [
    {
      headerText: "User",
      id: "username",
      sortable: true,
      style: "normal",
      type: "text",
    }
  ];

  if (isOwner){
    tableColumns.push(
      {
        buttonText: "Remove",
        headerText: "",
        id: "button_remove",
        onButtonClick: (d) => {
          handleRemoveMemberClick(d.id);
        },
        sortable: false,
        style: "primary",
        type: "button",
      }
    )
  }

  return (
    <Fragment>
      {isOwner && <div className="d-flex justify-content-between">
        <div className="ml-auto">
          <button type="button" className="primary ml-2" disabled={isClosed} onClick={handleArchiveClick}>Archive Project</button>
        </div>
      </div>}
      <div className="mb-5"></div>
      <div className="container-fluid border-block">
        <div className="row">
          <div className="col col-md-3">
            <div><span className="label">Lead:</span> {getUsername(project?.owner)}</div>
          </div>
          <div className="col col-md-3">
            <div><span className="label">State:</span> {_.capitalize(project?.state)}</div>
          </div>
          <div className="col col-md-3">
            <div><span className="label">Template:</span> {_.capitalize(project?.template)}</div>
          </div>
          <div className="col col-md-3">
            <div><span className="label">Created At:</span> {new Date(project?.create_at).toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="mb-5"></div>
      <div className="row">
        <div className="col col-md-6">
          <Tabs defaultActiveKey="description">
            <Tab eventKey="description" title="Description">
              <div className="input-row">
                <label>
                  <textarea
                    value={description}
                    rows="15"
                    cols="50"
                    onChange={(event) => setDescription(event.target.value)}
                  >
                  </textarea>
                </label>
              </div>
              <div className="mb-2"></div>
              {isOwner && <div className="buttons-wrapper">
                <button className="primary" onClick={handleSaveDescriptionClick}>Save</button>
              </div>}
            </Tab>
          </Tabs>
        </div>
        <div className="col col-md-6">
          <Tabs defaultActiveKey="members">
            <Tab eventKey="members" title="Members">
              {isOwner && <div className="input-row">
                <label>
                  Choose User
                  <div className="row">
                    <div className="col col-9">
                      <select
                        id="member"
                        name="member"
                        value={memberSelected}
                        onChange={handleMemberSelectedChange}
                      >
                        {users.filter((u) => !project?.members.includes(u.id)).map((val, index) => {
                          return <option key={index} value={val.id}>{_.capitalize(val.username)}</option>
                        })}
                      </select>
                    </div>
                    <div className="col col-3">
                      <button type="button" className="primary ml-2" onClick={handleAddMemberClick}>Add</button>
                    </div>
                  </div>
                </label>
                <div className="mb-3"></div>
              </div>}
              <TableCozy2
                columns={tableColumns}
                data={project?.members.map((m) => {
                  return {username: getUsername(m), id: m}
                })}
                options={tableOptions}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Fragment>
  );
}

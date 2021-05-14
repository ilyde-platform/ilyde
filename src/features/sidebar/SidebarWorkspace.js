import React, { useState, useEffect, Fragment } from 'react';
import logo from '../../assets/images/logo.svg';
import hb from '../../assets/images/hb.svg';
import MenuItem2 from './MenuItem2';
import Hamburger from './Hamburger';
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";
import { ProjectsApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';


export function SidebarWorkspace ({projectId, menu}) {
  const className = "sidebar";
  const [project, setProject] = useState({});

  useEffect(()=>{
    if(projectId){
      const apiConfig = getIlydeApiConfiguration();
      const projectsApi = new ProjectsApi(apiConfig);
      const project = projectsApi.retrieveProject(projectId).then((response) => {
        setProject(response.data);
      });
    }
  },[projectId])

  return (
    <Fragment>
      <div className={className}>
        <header>
          <div className="flex-grow-1 text-center">
            <img src={logo} className="logo" alt="logo" />
          </div>
        </header>
        <div className="submenu-label">{project?.name}</div>
        <br/>
        <div className="level-1">
          <ul className="menu-items">
            { menu.map((item, i) => {
              return (
                <MenuItem2 key={i}
                  icon={item.icon}
                  text={item.text}
                  state="normal"
                  handleClick={item.handleClick}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default SidebarWorkspace;

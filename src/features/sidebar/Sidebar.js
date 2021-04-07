import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.svg';
import hb from '../../assets/images/hb.svg';
import MenuItem from './MenuItem';
import Hamburger from './Hamburger';
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";

/*******************************************************************************************************/
/* FOR TEST FEATURES ***********************************************************************************/
/*******************************************************************************************************/
import Icon from '../../components/Icon';
import {Fragment} from 'react';
import Modal from '../../components/Modal';
/*******************************************************************************************************/


export function Sidebar ({darkMode, setDarkMode}) {

  const initialState = {
    "level1": "projects",
    "project": null,
    "level2": null,
  };
  let location = useLocation();
  const [sidebarSelection, setSidebarSelection] = useState(initialState);
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const sidebarIsDouble = (sidebarSelection.level2 !== null);
  const className = "sidebar" + (sidebarIsDouble ? " double" : "") + (hamburgerIsOpen ? " open" : "");

  const menuLevel1 = [
    {
      "id": "new_project",
      "icon": "new",
      "text": "New project",
      "path":  "/new-project",
    }, {
      "id": "projects",
      "icon": "pages",
      "text": "Projects",
      "path": "/projects" ,
    }, {
      "id": "archive",
      "icon": "archive",
      "text": "Archive",
      "path": "/archive",
    }, {
      "id": "environment",
      "icon": "cube",
      "text": "Environment",
      "path": "/environment",
    }, {
      "id": "model_apis",
      "icon": "diamond",
      "text": "Model Apis",
      "path": "/modelapis" ,
    }, {
      "id": "datasets",
      "icon": "dbs",
      "text": "Datasets",
      "path": "/datasets",
    }
  ];
  const menuLevel1Bottom = [
    {
      "id": "settings",
      "icon": "gear",
      "text": "Settings",
      "path":  "/test",
    }
  ];
  const menuLevel2 = [
    {
      "id": "workspaces",
      "icon": "ws",
      "text": "Workspaces",
      "path": `/projects/${sidebarSelection.project}/workspaces`,
    }, {
      "id": "files",
      "icon": "list",
      "text": "Files",
      "path": `/projects/${sidebarSelection.project}/files`,
    }, {
      "id": "jobs",
      "icon": "speed",
      "text": "Jobs",
      "path": `/projects/${sidebarSelection.project}/jobs`,
    }, {
      "id": "experiments",
      "icon": "tool",
      "text": "Experiments",
      "path":`/projects/${sidebarSelection.project}/experiments`,
    }, {
      "id": "models",
      "icon": "chart",
      "text": "Models",
      "path": `/projects/${sidebarSelection.project}/models`,
    }, {
      "id": "datasets",
      "icon": "db",
      "text": "Datasets",
      "path": `/projects/${sidebarSelection.project}/datasets`,
    }, {
      "id": "deployments",
      "icon": "rocket",
      "text": "Deployments",
      "path": `/projects/${sidebarSelection.project}/deployments`,
    }, {
      "id": "project_settings",
      "icon": "gear",
      "text": "Project details",
      "path": `/projects/${sidebarSelection.project}/settings`,
    },
  ];

  const handleHamburgerClick = () => {
    const newState = !hamburgerIsOpen;
    setHamburgerIsOpen(newState);
  }

  useEffect(() => {
    const sublevelregex = '\/projects\/(?<id>[a-zA-Z0-9]+)\/(?<subpath>[a-zA-Z0-9]+)(.*)';
    let level = null;
    for (let item of menuLevel1){
      if (item.path === location.pathname){
        level = item.id;
        break;
      }
    }
    if (level)
    {
      setSidebarSelection({
        "level1": level,
        "project": null,
        "level2": null,
      });
      setHamburgerIsOpen(false);
    }
    else
    {
      const found = location.pathname.match(sublevelregex);
      if (found){
        setSidebarSelection({
          "level1": "projects",
          "project": found.groups.id,
          "level2": found.groups.subpath,
        });
      }
    }
  }, [location]);

  return (
    <Fragment>
      <div className={className}>
        <header>
          <div className="flex-grow-1 text-center">
            <img src={logo} className="logo" alt="logo" />
          </div>
        </header>
        <div className="hamburger-col">
          {/*<img src={hb} className="hamburger" alt="open menu" onClick={handleHamburgerClick} />*/}
          <Hamburger isOpen={hamburgerIsOpen} callback={handleHamburgerClick} />
        </div>
        <div className="level-1">
          <ul className="menu-items">
            { menuLevel1.map((item, i) => {
              const state = (sidebarSelection.level1 === item.id) ? "selected" : "normal";
              return (
                <MenuItem key={i}
                  icon={item.icon}
                  text={item.text}
                  state={state}
                  path={item.path}
                />
              );
            })}
          </ul>
          <ul className="menu-items">
            { menuLevel1Bottom.map((item, i) => {
              const state = (sidebarSelection.level1 === item.id) ? "selected" : "normal";
              return (
                <MenuItem key={i}
                  icon={item.icon}
                  text={item.text}
                  state={state}
                  path={item.path}
                />
              );
            })}
          </ul>
        </div>
        { sidebarSelection.level2 && (
        <div className="level-2">
          <div className="submenu-label">Project name</div>
          <ul className="menu-items">
            { menuLevel2.map((item, i) => {
              const state = (sidebarSelection.level2 === item.id) ? "selected" : "normal";
              return (
                <MenuItem key={i}
                  icon={item.icon}
                  text={item.text}
                  state={state}
                  path={item.path}
                />
              );}
            )}
          </ul>
        </div>)}
      </div>
    </Fragment>
  );
}

export default Sidebar;

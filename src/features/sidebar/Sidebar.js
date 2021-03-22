import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.svg';
import hb from '../../assets/images/hb.svg';
import MenuItem from './MenuItem';

import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";


export function Sidebar () {

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
      "id": "model_apis",
      "icon": "diamond",
      "text": "Model Apis",
      "path": "/modelapis" ,
    }, {
      "id": "datasets",
      "icon": "dbs",
      "text": "Datasets",
      "path": "/datasets",
    },
  ];
  const menuLevel2 = [
    {
      "id": "workspaces",
      "icon": "pages",
      "text": "Workspaces",
      "path": `/projects/${sidebarSelection.project}/workspaces`,
    }, {
      "id": "files",
      "icon": "pages",
      "text": "Files",
      "path": `/projects/${sidebarSelection.project}/files`,
    }, {
      "id": "jobs",
      "icon": "pages",
      "text": "Jobs",
      "path": `/projects/${sidebarSelection.project}/jobs`,
    }, {
      "id": "experiments",
      "icon": "pages",
      "text": "Experiments",
      "path":`/projects/${sidebarSelection.project}/experiments`,
    }, {
      "id": "models",
      "icon": "pages",
      "text": "Models",
      "path": `/projects/${sidebarSelection.project}/models`,
    }, {
      "id": "datasets",
      "icon": "pages",
      "text": "Datasets",
      "path": `/projects/${sidebarSelection.project}/datasets`,
    }, {
      "id": "deployments",
      "icon": "pages",
      "text": "Deployments",
      "path": `/projects/${sidebarSelection.project}/deployments`,
    },
  ];

  // --- Functions
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
      <div className={className}>
        <header>
          <div className="flex-grow-1 text-center">
            <img src={logo} className="logo" alt="logo" />
          </div>
        </header>
        <div className="hamburger-col">
          <img src={hb} className="hamburger" alt="open menu" onClick={handleHamburgerClick} />
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
              );}
            )}
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
  );
}

export default Sidebar;

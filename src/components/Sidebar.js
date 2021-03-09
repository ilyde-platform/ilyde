import React, { useEffect, useContext, useState } from 'react';
import {Context} from '../Store';
import logo from '../assets/images/logo.svg';
import hb from '../assets/images/hb.svg';
import MenuItem from './MenuItem';

function Sidebar () {

  // --- Variables

  const [state, dispatch] = useContext(Context);
  const sidebarSelection = state.sidebarSelection;
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const sidebarIsDouble = (sidebarSelection.level2 !== null);
  const className = "sidebar" + (sidebarIsDouble ? " double" : "") + (hamburgerIsOpen ? " open" : "");
  const menuLevel1 = [
    {
      "id": "new_project",
      "icon": "new",
      "text": "New project",
      "action": () => { setContentId("new_project"); },
    }, {
      "id": "projects",
      "icon": "pages",
      "text": "Projects",
      "action": () => { setContentId("projects"); },
    }, {
      "id": "archive",
      "icon": "archive",
      "text": "Archive",
      "action": () => { setContentId("archive"); },
    }, {
      "id": "model_apis",
      "icon": "diamond",
      "text": "Model Apis",
      "action": () => { setContentId("model_apis"); alert("Do whatever here."); },
    }, {
      "id": "datasets",
      "icon": "dbs",
      "text": "Datasets",
      "action": () => { setContentId("datasets"); alert("Clicked: 'datasets'"); },
    },
  ];
  const menuLevel2 = [
    {
      "id": "workspaces",
      "icon": "pages",
      "text": "Workspaces",
      "action": () => { setContentId("workspaces"); },
    }, {
      "id": "files",
      "icon": "pages",
      "text": "Files",
      "action": () => { setContentId("files"); },
    }, {
      "id": "jobs",
      "icon": "pages",
      "text": "Jobs",
      "action": () => { setContentId("jobs"); },
    }, {
      "id": "experiments",
      "icon": "pages",
      "text": "Experiments",
      "action": () => { setContentId("experiments"); },
    }, {
      "id": "models",
      "icon": "pages",
      "text": "Models",
      "action": () => { setContentId("models-content-id"); },
    }, {
      "id": "datasets",
      "icon": "pages",
      "text": "Datasets",
      "action": () => { setContentId("datasets"); },
    }, {
      "id": "deployments",
      "icon": "pages",
      "text": "Deployments",
      "action": () => { setContentId("deployments"); },
    },
  ];

  // --- Functions

  const setSidebarSelection = (id, level) => {
    if (level === 1) {
      setHamburgerIsOpen(false);
    }
    dispatch({type: 'SET_SIDEBAR_SELECTION', payload: {id, level}});
  }
  const setContentId = (contentId) => { 
    dispatch({type: 'SET_CONTENT_ID', payload: contentId});
  }
  const handleHamburgerClick = () => {
    const newState = !hamburgerIsOpen;
    setHamburgerIsOpen(newState);
  }
  const handleMenuItemClick = (itemData, level) => {
    itemData.action();
    setSidebarSelection(itemData.id, level);
  }

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
                action={() => { handleMenuItemClick(item, 1); }}
              />
            );}
          )}
        </ul>
      </div>
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
                action={() => { handleMenuItemClick(item, 2); }}
              />
            );}
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

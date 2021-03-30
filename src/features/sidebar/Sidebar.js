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

    // test new features
    {
      "id": "test1",
      "icon": "test",
      "text": "Test modal",
      "onClickFunction": "openTestModal",
    },
    {
      "id": "test2",
      "icon": "test",
      "text": "Test dark mode",
      "onClickFunction": "toggleDarkMode",
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

  /*******************************************************************************************************/
  /* FOR TEST FEATURES ***********************************************************************************/
  /*******************************************************************************************************/

  const [modalOpen, setModalOpen] = useState(false);

  const MenuItemTest = ({icon, text, onClick, darkMode}) => {
    return (
      <li className="menu-item">
        <Icon iconName={icon} state="normal" darkMode={darkMode} />
        <a onClick={onClick}>
          <span className="text font-m">{text}</span>
        </a>
      </li>
    );
  }
  
  const testModal = (
    <Modal closeModal={() => setModalOpen(false)} title="Test modal">
      <section>
        <p>
          Description of lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Mauris sed turpis sed ipsum vehicula bibendum imperdiet in orci. 
          In vel vestibulum nisi. Donec sagittis nunc id erat aliquam blandit.
        </p>
      </section>
      <section>
        <form>
          <div className="input-row">
            <label>
              Label
              <input type="text" name="name-a" id="name-a" />
            </label>
          </div>
          <div className="input-row">
            <label>
              Label
              <input type="text" name="name-b" id="name-b" />
            </label>
          </div>
          <hr />
          <div className="buttons-wrapper">
            <button className="secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <input type="submit" className="primary" value="Submit" />
          </div>
        </form>
      </section>
    </Modal>
  );

  const testFunctions = {
    openTestModal: () => setModalOpen(true),
    toggleDarkMode: () => {setDarkMode(!darkMode)},
  };
  /*******************************************************************************************************/

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

  console.log(hamburgerIsOpen, className)

  return (
    <Fragment>

      {/*******************************************************************************************************/}
      {/* FOR TEST FEATURES ***********************************************************************************/}
      {/*******************************************************************************************************/}
      {modalOpen && testModal}
      {/*******************************************************************************************************/}

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

              if (item.hasOwnProperty("path")) {
                const state = (sidebarSelection.level1 === item.id) ? "selected" : "normal";
                return (
                  <MenuItem key={i}
                    darkMode={darkMode}
                    icon={item.icon}
                    text={item.text}
                    state={state}
                    path={item.path}
                  />
                );
              } else if (item.hasOwnProperty("onClickFunction")) {
                return (
                  <MenuItemTest key={i}
                    darkMode={darkMode}
                    icon={item.icon}
                    text={item.text}
                    onClick={testFunctions[item.onClickFunction]}
                  />
                );
              }}

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
                  darkMode={darkMode}
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

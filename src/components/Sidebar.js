import logo from '../assets/images/logo.svg';
import hb from '../assets/images/hb.svg';
import MenuItem from './MenuItem';

function Sidebar () {
  const handleHamburgerClick = () => {
    document.querySelector(".sidebar").classList.toggle("open");
  }
  const menuLevel1 = [
    {"icon": "new", "text": "New project", "action": () => { alert("Clicked: 'New project'"); }},
    {"icon": "pages", "text": "Projects", "action": () => { alert("Clicked: 'Projects'"); }},
    {"icon": "archive", "text": "Archive", "action": () => { alert("Clicked: 'Archive'"); }},
    {"icon": "diamond", "text": "Model Apis", "action": () => { alert("Clicked: 'Model Apis'"); }},
    {"icon": "dbs", "text": "Datasets", "action": () => { alert("Clicked: 'Datasets'"); }},
  ];
  const menuLevel2 = [
    {"icon": "pages", "text": "Workspaces", "action": () => { alert("Clicked: 'Workspaces'"); }},
    {"icon": "pages", "text": "Files", "action": () => { alert("Clicked: 'Files'"); }},
    {"icon": "pages", "text": "Jobs", "action": () => { alert("Clicked: 'Jobs'"); }},
    {"icon": "pages", "text": "Experiments", "action": () => { alert("Clicked: 'Experiments'"); }},
    {"icon": "pages", "text": "Models", "action": () => { alert("Clicked: 'Models'"); }},
    {"icon": "pages", "text": "Datasets", "action": () => { alert("Clicked: 'Datasets'"); }},
    {"icon": "pages", "text": "Deployments", "action": () => { alert("Clicked: 'Deployments'"); }},
  ];
  return (
    <div className="sidebar">
  
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
          { menuLevel1.map((item, i) => (
            <MenuItem key={i} icon={item.icon} text={item.text} action={item.action} />
          ))}
        </ul>
      </div>

      <div className="level-2">
        <div className="submenu-label">Project name</div>
        <ul className="menu-items">
          { menuLevel2.map((item, i) => (
            <MenuItem key={i} icon={item.icon} text={item.text} action={item.action} />
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Sidebar;

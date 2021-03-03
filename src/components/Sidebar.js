import logo from '../assets/images/logo.svg';
import hb from '../assets/images/hb.svg';
import MenuItem from './MenuItem';

function Sidebar () {
  return (
    <div className="sidebar">
      <header>
        <img src={hb} className="hamburger" alt="open menu" />
        <div className="flex-grow-1 text-center">
          <img src={logo} className="logo" alt="logo" />
        </div>
      </header>
      <main>
        <ul>
          <MenuItem icon="new" text="New project" />
          <MenuItem icon="pages" text="Projects" />
          <MenuItem icon="archive" text="Archive" />
          <MenuItem icon="diamond" text="Model Apis" />
          <MenuItem icon="dbs" text="Datasets" />
        </ul>
      </main>
    </div>
  );
}

export default Sidebar;

import Icon from './Icon';

function MenuItem ({ icon, text, action }) {

  const callback = (typeof action === "function") ? action : null;

  return(
    <li className="menu-item" onClick={callback}>
      <Icon iconName={icon} />
      <span className="text font-m">{text}</span>
    </li>
  )
}

export default MenuItem;

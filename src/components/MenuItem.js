import Icon from './Icon';

function MenuItem ({ icon, text, state, action }) {

  const callback = (typeof action === "function") ? action : null;
  const className = `menu-item ${state}`;

  return(
    <li className={className} onClick={callback}>
      <Icon iconName={icon} state={state} />
      <span className="text font-m">{text}</span>
    </li>
  )
}

export default MenuItem;

import Icon from '../../components/Icon';


function MenuItem2 ({ icon, text, state, handleClick }) {

  const className = `menu-item ${state}`;

  return(
    <li className={className} onClick={handleClick}>
      <Icon iconName={icon} state={state} />
      <a href="#">
        <span className="text font-m" >{text}</span>
      </a>
    </li>
  )
}

export default MenuItem2;

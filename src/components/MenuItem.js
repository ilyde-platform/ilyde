import icon1 from '../assets/images/icons/icon-archive.svg';
import icon2 from '../assets/images/icons/icon-dbs.svg';
import icon3 from '../assets/images/icons/icon-diamond.svg';
import icon4 from '../assets/images/icons/icon-new.svg';
import icon5 from '../assets/images/icons/icon-pages.svg';

function MenuItem ({ icon, text }) {

  const renderIcon = (icon) => {
    switch(icon) {
      case 'archive':
        return <img src={icon1} alt={'icon '+ icon} />
      case 'dbs':
        return <img src={icon2} alt={'icon '+ icon} />
      case 'diamond':
        return <img src={icon3} alt={'icon '+ icon} />
      case 'new':
        return <img src={icon4} alt={'icon '+ icon} />
      case 'pages':
        return <img src={icon5} alt={'icon '+ icon} />
    }
  }

  const iconImg = renderIcon(icon);

  return(
    <li className="menu-item">
      {iconImg}
      <span className="font-m">{text}</span>
    </li>
  )
}

export default MenuItem;

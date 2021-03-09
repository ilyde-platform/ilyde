import icon1 from '../assets/images/icons/icon-archive.svg';
import icon2 from '../assets/images/icons/icon-dbs.svg';
import icon3 from '../assets/images/icons/icon-diamond.svg';
import icon4 from '../assets/images/icons/icon-new.svg';
import icon5 from '../assets/images/icons/icon-pages.svg';

function Icon ({ iconName }) {

  const icons = {
    "archive":  icon1,
    "dbs":      icon2,
    "diamond":  icon3,
    "new":      icon4,
    "pages":    icon5,
  };

  return (
    <img src={icons[iconName]} alt={'icon '+ iconName} />
  )
}

export default Icon;

import icon1 from '../assets/images/icons/icon-archive.svg';
import icon1Selected from '../assets/images/icons/icon-archive-s.svg';
import icon2 from '../assets/images/icons/icon-dbs.svg';
import icon2Selected from '../assets/images/icons/icon-dbs-s.svg';
import icon3 from '../assets/images/icons/icon-diamond.svg';
import icon3Selected from '../assets/images/icons/icon-diamond-s.svg';
import icon4 from '../assets/images/icons/icon-new.svg';
import icon4Selected from '../assets/images/icons/icon-new-s.svg';
import icon5 from '../assets/images/icons/icon-pages.svg';
import icon5Selected from '../assets/images/icons/icon-pages-s.svg';

function Icon ({ iconName, state }) {

  console.log(`icon: ${iconName} – state: ${state}`);

  const icons = {
    "archive": {
      "normal": icon1,
      "selected": icon1Selected,
    },
    "dbs": {
      "normal": icon2,
      "selected": icon2Selected,
    },
    "diamond": {
      "normal": icon3,
      "selected": icon3Selected,
    },
    "new": {
      "normal": icon4,
      "selected": icon4Selected,
    },
    "pages": {
      "normal": icon5,
      "selected": icon5Selected,
    },
  };

  return (
    <img className="icon" src={icons[iconName][state]} alt={'icon '+ iconName} />
  )
}

export default Icon;

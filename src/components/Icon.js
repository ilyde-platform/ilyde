import icon1n from '../assets/images/icons/icon-archive-n.svg';
import icon1s from '../assets/images/icons/icon-archive-s.svg';
import icon1i from '../assets/images/icons/icon-archive-i.svg';
import icon2n from '../assets/images/icons/icon-dbs-n.svg';
import icon2s from '../assets/images/icons/icon-dbs-s.svg';
import icon2i from '../assets/images/icons/icon-dbs-i.svg';
import icon3n from '../assets/images/icons/icon-diamond-n.svg';
import icon3s from '../assets/images/icons/icon-diamond-s.svg';
import icon3i from '../assets/images/icons/icon-diamond-i.svg';
import icon4n from '../assets/images/icons/icon-new-n.svg';
import icon4s from '../assets/images/icons/icon-new-s.svg';
import icon4i from '../assets/images/icons/icon-new-i.svg';
import icon5n from '../assets/images/icons/icon-pages-n.svg';
import icon5s from '../assets/images/icons/icon-pages-s.svg';
import icon5i from '../assets/images/icons/icon-pages-i.svg';
import iconTn from '../assets/images/icons/icon-test-n.svg';
import iconTs from '../assets/images/icons/icon-test-s.svg';
import iconTi from '../assets/images/icons/icon-test-i.svg';
import { useSelector } from 'react-redux';
import { selectPreferences } from '../features/preferences/preferencesSlice';

function Icon ({ iconName, state }) {
  const preferences = useSelector(selectPreferences);
  const mode = preferences.darkMode ? "dark" : "light";
  const icons = {
    "archive": {
      "normal":   {light: icon1n, dark: icon1i},
      "selected": {light: icon1s, dark: icon1s},
    },
    "dbs": {
      "normal":   {light: icon2n, dark: icon2i},
      "selected": {light: icon2s, dark: icon2s},
    },
    "diamond": {
      "normal":   {light: icon3n, dark: icon3i},
      "selected": {light: icon3s, dark: icon3s},
    },
    "new": {
      "normal":   {light: icon4n, dark: icon4i},
      "selected": {light: icon4s, dark: icon4s},
    },
    "pages": {
      "normal":   {light: icon5n, dark: icon5i},
      "selected": {light: icon5s, dark: icon5s},
    },
    "test": {
      "normal":   {light: iconTn, dark: iconTi},
      "selected": {light: iconTs, dark: iconTs},
    },
  };

  return (
    <img className="icon" src={icons[iconName][state][mode]} alt={'icon '+ iconName} />
  )
}

export default Icon;

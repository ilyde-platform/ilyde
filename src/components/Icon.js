/*
archive
dbs
diamond
new
pages
ws
list
speed
tool
chart
db
up
gear
rocket
dark
*/

import icon_archive_n from '../assets/images/icons/icon-archive-n.svg';
import icon_archive_s from '../assets/images/icons/icon-archive-s.svg';
import icon_archive_i from '../assets/images/icons/icon-archive-i.svg';
import icon_dbs_n from '../assets/images/icons/icon-dbs-n.svg';
import icon_dbs_s from '../assets/images/icons/icon-dbs-s.svg';
import icon_dbs_i from '../assets/images/icons/icon-dbs-i.svg';
import icon_diamond_n from '../assets/images/icons/icon-diamond-n.svg';
import icon_diamond_s from '../assets/images/icons/icon-diamond-s.svg';
import icon_diamond_i from '../assets/images/icons/icon-diamond-i.svg';
import icon_new_n from '../assets/images/icons/icon-new-n.svg';
import icon_new_s from '../assets/images/icons/icon-new-s.svg';
import icon_new_i from '../assets/images/icons/icon-new-i.svg';
import icon_pages_n from '../assets/images/icons/icon-pages-n.svg';
import icon_pages_s from '../assets/images/icons/icon-pages-s.svg';
import icon_pages_i from '../assets/images/icons/icon-pages-i.svg';
import icon_ws_n from '../assets/images/icons/icon-ws-n.svg';
import icon_ws_s from '../assets/images/icons/icon-ws-s.svg';
import icon_ws_i from '../assets/images/icons/icon-ws-i.svg';
import icon_list_n from '../assets/images/icons/icon-list-n.svg';
import icon_list_s from '../assets/images/icons/icon-list-s.svg';
import icon_list_i from '../assets/images/icons/icon-list-i.svg';
import icon_speed_n from '../assets/images/icons/icon-speed-n.svg';
import icon_speed_s from '../assets/images/icons/icon-speed-s.svg';
import icon_speed_i from '../assets/images/icons/icon-speed-i.svg';
import icon_tool_n from '../assets/images/icons/icon-tool-n.svg';
import icon_tool_s from '../assets/images/icons/icon-tool-s.svg';
import icon_tool_i from '../assets/images/icons/icon-tool-i.svg';
import icon_chart_n from '../assets/images/icons/icon-chart-n.svg';
import icon_chart_s from '../assets/images/icons/icon-chart-s.svg';
import icon_chart_i from '../assets/images/icons/icon-chart-i.svg';
import icon_db_n from '../assets/images/icons/icon-db-n.svg';
import icon_db_s from '../assets/images/icons/icon-db-s.svg';
import icon_db_i from '../assets/images/icons/icon-db-i.svg';
import icon_up_n from '../assets/images/icons/icon-up-n.svg';
import icon_up_s from '../assets/images/icons/icon-up-s.svg';
import icon_up_i from '../assets/images/icons/icon-up-i.svg';
import icon_gear_n from '../assets/images/icons/icon-gear-n.svg';
import icon_gear_s from '../assets/images/icons/icon-gear-s.svg';
import icon_gear_i from '../assets/images/icons/icon-gear-i.svg';
import icon_rocket_n from '../assets/images/icons/icon-rocket-n.svg';
import icon_rocket_s from '../assets/images/icons/icon-rocket-s.svg';
import icon_rocket_i from '../assets/images/icons/icon-rocket-i.svg';
import icon_dark_n from '../assets/images/icons/icon-dark-n.svg';
import icon_dark_s from '../assets/images/icons/icon-dark-s.svg';
import icon_dark_i from '../assets/images/icons/icon-dark-i.svg';
import icon_darkalt_n from '../assets/images/icons/icon-darkalt-n.svg';
import icon_darkalt_s from '../assets/images/icons/icon-darkalt-s.svg';
import icon_darkalt_i from '../assets/images/icons/icon-darkalt-i.svg';
import icon_cube_n from '../assets/images/icons/icon-cube-n.svg';
import icon_cube_s from '../assets/images/icons/icon-cube-s.svg';
import icon_cube_i from '../assets/images/icons/icon-cube-i.svg';

import icon_test_n from '../assets/images/icons/icon-test-n.svg';
import icon_test_s from '../assets/images/icons/icon-test-s.svg';
import icon_test_i from '../assets/images/icons/icon-test-i.svg';

import { useSelector } from 'react-redux';
import { selectPreferences } from '../features/preferences/preferencesSlice';

function Icon ({ iconName, state }) {
  const preferences = useSelector(selectPreferences);
  const mode = preferences.darkMode ? "dark" : "light";
  const icons = {
    "archive": {
      "normal":   {light: icon_archive_n, dark: icon_archive_i},
      "selected": {light: icon_archive_s, dark: icon_archive_s},
    },
    "dbs": {
      "normal":   {light: icon_dbs_n, dark: icon_dbs_i},
      "selected": {light: icon_dbs_s, dark: icon_dbs_s},
    },
    "diamond": {
      "normal":   {light: icon_diamond_n, dark: icon_diamond_i},
      "selected": {light: icon_diamond_s, dark: icon_diamond_s},
    },
    "new": {
      "normal":   {light: icon_new_n, dark: icon_new_i},
      "selected": {light: icon_new_s, dark: icon_new_s},
    },
    "pages": {
      "normal":   {light: icon_pages_n, dark: icon_pages_i},
      "selected": {light: icon_pages_s, dark: icon_pages_s},
    },
    "ws": {
      "normal":   {light: icon_ws_n, dark: icon_ws_i},
      "selected": {light: icon_ws_s, dark: icon_ws_s},
    },
    "list": {
      "normal":   {light: icon_list_n, dark: icon_list_i},
      "selected": {light: icon_list_s, dark: icon_list_s},
    },
    "speed": {
      "normal":   {light: icon_speed_n, dark: icon_speed_i},
      "selected": {light: icon_speed_s, dark: icon_speed_s},
    },
    "tool": {
      "normal":   {light: icon_tool_n, dark: icon_tool_i},
      "selected": {light: icon_tool_s, dark: icon_tool_s},
    },
    "chart": {
      "normal":   {light: icon_chart_n, dark: icon_chart_i},
      "selected": {light: icon_chart_s, dark: icon_chart_s},
    },
    "db": {
      "normal":   {light: icon_db_n, dark: icon_db_i},
      "selected": {light: icon_db_s, dark: icon_db_s},
    },
    "up": {
      "normal":   {light: icon_up_n, dark: icon_up_i},
      "selected": {light: icon_up_s, dark: icon_up_s},
    },
    "gear": {
      "normal":   {light: icon_gear_n, dark: icon_gear_i},
      "selected": {light: icon_gear_s, dark: icon_gear_s},
    },
    "rocket": {
      "normal":   {light: icon_rocket_n, dark: icon_rocket_i},
      "selected": {light: icon_rocket_s, dark: icon_rocket_s},
    },
    "dark": {
      "normal":   {light: icon_dark_i, dark: icon_dark_i},
      "selected": {light: icon_dark_s, dark: icon_dark_s},
    },
    "darkalt": {
      "normal":   {light: icon_darkalt_i, dark: icon_darkalt_i},
      "selected": {light: icon_darkalt_s, dark: icon_darkalt_s},
    },
    "cube": {
      "normal":   {light: icon_cube_n, dark: icon_cube_i},
      "selected": {light: icon_cube_s, dark: icon_cube_s},
    },

    "test": {
      "normal":   {light: icon_test_n, dark: icon_test_i},
      "selected": {light: icon_test_s, dark: icon_test_s},
    },
  };

  return (
    <img className="icon" src={icons[iconName][state][mode]} alt={'icon '+ iconName} />
  )
}

export default Icon;

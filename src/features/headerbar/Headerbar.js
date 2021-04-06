import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import larr from '../../assets/images/larr.svg';
import { selectHeaderbar } from './headerbarSlice'
import Icon from '../../components/Icon';
import { useKeycloak } from '@react-keycloak/web';
import { switchDarkMode } from '../preferences/preferencesSlice';
import { capitalize } from '../../services/utils';
import {
  useHistory
} from "react-router-dom";


function Headerbar ({ showBackButton }) {
	const headerinfo = useSelector(selectHeaderbar);
  const dispatch = useDispatch();
	const history = useHistory();
  const { keycloak } = useKeycloak();

	const goBack = () => { history.goBack()};

	return (
		<div className="headerbar">
			{ showBackButton &&
				<div className="back" onClick={goBack}>
					<img src={larr} />
				</div>
			}
			<div className="texts">
				<div className="title">
				  <h2>{ headerinfo.title }</h2>
					<div className="title-comment">
					  { headerinfo.subtitle }
				  </div>
			  </div>
  			<div className="font-m">
  				{ keycloak.idTokenParsed.given_name ?
						capitalize(keycloak.idTokenParsed.given_name) :
						capitalize(keycloak.idTokenParsed.preferred_username) }
  			</div>
			</div>
			<div className="user-icon"></div>
      <a className="button round secondary ml-2" onClick={() => { dispatch(switchDarkMode()); }}>
        <Icon iconName="darkalt" state="normal"/>
      </a>
		</div>
	);
}

export default Headerbar;

import React from 'react';
import { useSelector } from 'react-redux';
import larr from '../../assets/images/larr.svg';
import { selectHeaderbar } from './headerbarSlice'


function Headerbar ({ showBackButton }) {
  
	const headerinfo = useSelector(selectHeaderbar);
	return (
		<div className="headerbar">
			{ showBackButton &&
				<div className="back">
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
					Username
				</div>
			</div>
			<div className="user-icon"></div>
		</div>
	);
}

export default Headerbar;

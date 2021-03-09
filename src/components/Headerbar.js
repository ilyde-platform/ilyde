import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../Store';
import { contents } from '../testContents.js';
import larr from '../assets/images/larr.svg';

function Headerbar ({ showBackButton }) {
  
  const [state, dispatch] = useContext(Context);
  const contentId = state.contentId;
  const contentData = contents[contentId];
  const title = contentData ? contents[contentId].title : null;
	const displayTitle = title ? title : "Page without title";
	const titleComment = "9 items";

  return (
    <div className="headerbar">
    	{ showBackButton &&
	    	<div className="back">
	    		<img src={larr} />
		  	</div>
    	}
	  	<div className="texts">
	    	<div className="title">
  	  		<h2>{displayTitle}</h2>
		    	<div className="title-comment">
	  	  		{titleComment}
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

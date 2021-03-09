import larr from '../assets/images/larr.svg';

const displayBackBtn = true;

function Headerbar () {
  return (
    <div className="headerbar">
    	{ displayBackBtn &&
	    	<div className="back">
	    		<img src={larr} />
		  	</div>
    	}
	  	<div className="texts">
	    	<div className="title">
  	  		<h2>Title here</h2>
		    	<div className="title-comment">
	  	  		6 items
	  	  	</div>
  	  	</div>
	    	<div className="">
	    		Username
	    	</div>
  		</div>
  		<div className="user-icon"></div>
    </div>
  );
}

export default Headerbar;

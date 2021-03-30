import React from "react";

const Hamburger = ({isOpen, callback}) => {
  
  // const handleClick = () => {
  // 	const newVal = !isOpen;
  // 	callback();
  // }

  return (
	  <nav id="hamburger">
	    <input type="checkbox" checked={isOpen} onClick={callback} readOnly />
	    <span></span>
	    <span></span>
	    <span></span>
		</nav>
	);
}

export default Hamburger;



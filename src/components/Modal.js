import React, {Fragment} from "react";
import x from '../assets/images/x.svg';

function Modal ({closeModal, title, children}) {
  return(
    <Fragment>
	    <div className="modal-bg" onClick={closeModal} />
	  	<div className="modal">
	  		<header>
	  			<h2>{title}</h2>
	  			<a className="close" onClick={closeModal}><img src={x} alt=""/></a>
  			</header>
	  		<div className="content">
	  			{children}
	  		</div>
	  	</div>
    </Fragment>
  )
}

export default Modal;

import React, {Fragment} from "react";
import x from '../assets/images/x.svg';

/**
 * Possible children structure. 
 * Choose the version with the markup that semantically makes more sense.
 * 
 * Version A — single section

<section>
	{...}
	{...}
	<hr />
  <div className="buttons-wrapper">
     <button className="secondary" onClick={handleCancel}>Cancel</button>
     <button className="primary" onClick={handleConfirm}>{action}</button>
  </div>
</section>

 * 
 * Version B — Multiple sections

<Fragment>
	<section>{...}</section>
	<section>{...}</section>
	<section>{...}</section>
	<hr />
  <div className="buttons-wrapper">
     <button className="secondary" onClick={handleCancel}>Cancel</button>
     <button className="primary" onClick={handleConfirm}>{action}</button>
  </div>
</Fragment>

 *
 * */

function Modal ({closeModal, title, children}) {
  return(
    <Fragment>
	    <div className="modal-bg" onClick={closeModal}>
		  	<div className="mod-scrollable">
			  	<div className="modal">
			  		<header>
			  			<h2>{title}</h2>
			  			<a className="close" onClick={closeModal}><img src={x} alt=""/></a>
		  			</header>
			  		<div className="mod-content">
			  			{children}
			  		</div>
			  	</div>
		  	</div>
	  	</div>
    </Fragment>
  )
}

export default Modal;

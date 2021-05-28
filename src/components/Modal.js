import React, {Fragment} from "react";
import x from '../assets/images/x.svg';

/**
 * children structure

<Fragment>
	<section>{...}</section>
	<section>{...}</section>
	<section>{...}</section>
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
	    <div className="modal-bg" onClick={closeModal} />
	  	<div className="modal">
	  		<header>
	  			<h2>{title}</h2>
	  			<a className="close" onClick={closeModal}><img src={x} alt=""/></a>
  			</header>
	  		<div className="mod-content">
	  			{children}
	  		</div>
	  	</div>
    </Fragment>
  )
}

export default Modal;

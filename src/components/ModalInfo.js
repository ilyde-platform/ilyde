import React from 'react';
import Modal  from './Modal';


export function ModalInfo({handleCancel, title, content}) {
  return (
    <Modal closeModal={handleCancel} title={title}>
      <div>{content}</div>
      <hr />
      <div className="buttons-wrapper">
        <button className="primary" onClick={handleCancel}>Close</button>
      </div>
    </Modal>
  );
}

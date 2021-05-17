import React from 'react';
import Modal  from './Modal';


export function ModalConfirm({handleCancel, title, content, action, handleConfirm}) {
  return (
    <Modal closeModal={handleCancel} title={title}>
      <div>{content}</div>
      <hr />
      <div className="buttons-wrapper">
        <button className="secondary" onClick={handleCancel}>Cancel</button>
        <button className="primary" onClick={handleConfirm}>{action}</button>
      </div>
    </Modal>
  );
}

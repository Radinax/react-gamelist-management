import React, { useState, useEffect } from 'react'
import { bool, func } from 'prop-types'
import ReactModal from 'react-modal'

const Modal = ({ showModal, modalClosed, children }) => {
  const [openModal, setOpenModal] = useState(false)
  
  const closeModal = () => setOpenModal(false)
  
  useEffect(() => setOpenModal(showModal), [showModal])
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => modalClosed(openModal), [openModal])
  
  return (
    <ReactModal
      isOpen={openModal}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={ {content: { display: 'flex', flexDirection: 'column' }}}
    >
      {children}
      <button style={{ width: 'fit-content' }} onClick={() => closeModal()}>CLOSE MODAL</button>
    </ReactModal>
  )
}

Modal.propTypes = {
  showModal: bool,
  modalClosed: func
}

Modal.defaultPropTypes = {
  showModal: false
}

export default Modal

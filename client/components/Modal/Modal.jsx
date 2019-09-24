import React from 'react'
import './Modal.css'

const Modal = ({children, onClose}) => {
  return (
    <div className="modalOuter glbFullAbsolute">
      <div className="modalBg glbFullAbsolute" onClick={onClose}></div>
      <div className="modalContent">
        {children}
      </div>
    </div>
  )
}

export default Modal

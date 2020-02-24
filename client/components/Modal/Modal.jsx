import React from 'react'
import PropTypes from 'prop-types'
import './Modal.css'

const Modal = ({ children, onClose }) => {
  return (
    <div className='modalOuter glbFullAbsolute'>
      <div className='modalBg glbFullAbsolute' onClick={onClose} />
      <div className='modalContent'>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.object,
  onClose: PropTypes.func
}

export default Modal

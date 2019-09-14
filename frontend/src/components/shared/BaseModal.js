import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

ReactModal.setAppElement('#root')

const CustomStyles = {
    content: {
        position: null,
        top: null,
        left: null,
        right: null,
        bottom: null,
        border: null,
        background: null,
        overflow: null,
        WebkitOverflowScrolling: null,
        borderRadius: null,
        padding: null,
    },
}

const ModalCardFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`

const BaseModal = ({
    isOpen,
    onCloseModal,
    size = 'md',
    title,
    actions,
    showClose,
    children,
    footer,
    className = '',
}) => {
    return (
        <ReactModal
            style={CustomStyles}
            className={`Modal__Bootstrap modal-dialog-centered modal-dialog modal-${size} ${className}`}
            closeTimeoutMS={150}
            isOpen={isOpen}
            onRequestClose={onCloseModal}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{title || ''}</h4>
                    {actions}
                    {showClose && (
                        <button type="button" className="close" onClick={onCloseModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                    )}
                </div>
                <div className="modal-body">{children}</div>
                {footer && (
                    <div className="modal-footer">
                        <ModalCardFooter>{footer}</ModalCardFooter>
                    </div>
                )}
            </div>
        </ReactModal>
    )
}

export default BaseModal

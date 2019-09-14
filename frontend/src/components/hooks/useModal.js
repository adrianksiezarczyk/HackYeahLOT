import { useCallback, useState } from 'react'

const useModal = initialModalProps => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [_modalProps, setModalProps] = useState(initialModalProps)

    const toggleModal = useCallback(() => {
        setModalOpen(modalOpen => !modalOpen)
    }, [])

    const openModal = modalProps => {
        toggleModal()
        if (modalProps) setModalProps(modalProps)
    }
    const closeModal = () => {
        toggleModal()
        if (_modalProps) setModalProps(initialModalProps || null)
    }

    return {
        isOpen: isModalOpen,
        open: openModal,
        close: closeModal,
        modalProps: _modalProps,
    }
}

export default useModal

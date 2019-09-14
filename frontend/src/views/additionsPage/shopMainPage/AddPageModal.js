import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Icon, Form, Dimmer } from 'tabler-react'
import BaseModal from '../../../components/shared/BaseModal'
import Button from '../../../components/shared/Button'
import { useDropzone } from 'react-dropzone'
import ShopPageApi from '../../../services/shopPage/api'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'

const getColor = props => {
    if (props.isDragAccept) {
        return '#00e676'
    }
    if (props.isDragReject) {
        return '#ff1744'
    }
    if (props.isDragActive) {
        return '#2196f3'
    }
    return '#eeeeee'
}

const DropZoneContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
    cursor: pointer;
`

const AddPageModal = ({ isOpen, onCloseModal, t }) => {
    const [isLoading, setLoading] = useState(false)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [newPage, setNewPage] = useState({ name: '', content: '', fileExtension: '' })

    const onDrop = useCallback(
        acceptedFiles => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const arrayBuffer = reader.result
                const bytesArrayTyped = new Uint8Array(arrayBuffer)
                const bytesArray = Array.prototype.slice.call(bytesArrayTyped)

                setNewPage({
                    ...newPage,
                    content: bytesArray,
                    fileExtension: acceptedFiles[0].name
                        .split('.')
                        .pop()
                        .toLowerCase(),
                })
            }

            acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))
        },
        [newPage],
    )
    const onDropRejected = useCallback(rejectedFiles => {
        console.warn('rejected files', rejectedFiles)
    }, [])

    const {
        acceptedFiles,
        rejectedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        onDropRejected,
        accept: '.zip, .rar,',
    })

    const addPage = async () => {
        setLoading(true)
        try {
            await ShopPageApi.addPage({
                name: newPage.name,
                fileContent: newPage.content,
                fileExtension: newPage.fileExtension,
            })
            setSuccessStatus()
        } catch (e) {
            console.error(e)
            setFailureStatus()
        }
        setLoading(false)
    }

    if (!isOpen) return null
    return (
        <BaseModal
            isOpen={isOpen}
            onCloseModal={onCloseModal}
            title={t('new main page')}
            actions={<Icon link name="x" onClick={onCloseModal} />}
            footer={
                <>
                    <Button className="mr-2" color="primary" size="sm" onClick={addPage}>
                        {t('add')}
                    </Button>
                    <Button color="secondary" size="sm" onClick={onCloseModal}>
                        {t('cancel')}
                    </Button>
                </>
            }>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Dimmer loader active={isLoading}>
                <Form.Group>
                    <Form.Label>{t('name')}</Form.Label>
                    <Form.Input
                        value={newPage.name}
                        onChange={e => {
                            setNewPage({ ...newPage, name: e.target.value })
                        }}
                    />
                </Form.Group>

                <div>
                    <DropZoneContainer {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
                        <input {...getInputProps()} />
                        <p>{t('drag and drop')}</p>
                    </DropZoneContainer>
                    <aside>
                        <h4>{t('Accepted files')}</h4>
                        <ul>
                            {acceptedFiles.map(file => (
                                <li key={file.path}>
                                    {file.path} - {file.size} bytes
                                </li>
                            ))}
                        </ul>
                        <h4>{t('Rejected files')}</h4>
                        <ul>
                            {rejectedFiles.map(file => (
                                <li key={file.path}>
                                    {file.path} - {file.size} bytes
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </Dimmer>
        </BaseModal>
    )
}

export default AddPageModal

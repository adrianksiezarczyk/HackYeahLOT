import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Dimmer, Grid, Form } from 'tabler-react'
import { PrimaryButton, SecondaryButton } from '../../../components/shared/Button'
import LanguageSelect from '../../../components/shared/LanguageSelect'
import WysiwygEditor from '../../../components/WysiwygEditor'
import useImmerState from '../../../hooks/useImmerState'
import { LANGUAGE_IDS } from '../../../constants'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'
import DocumentsApi from '../../../services/documents/api'

const DocumentDetails = ({ match }) => {
    const [isLoading, setLoading] = useState(null)
    const [isEditing, setEditing] = useState(false)
    const [languageId, setLanguageId] = useState(LANGUAGE_IDS.PL)
    const [documentDetails, setDocumentDetails] = useImmerState(null)
    const [selectedDocument, setSelectedDocument] = useState({})
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const wysiwygEditorRef = useRef()
    const [t] = useTranslation('settings-page')

    useEffect(() => {
        const getDocumentDetails = async () => {
            try {
                const _documentDetails = await DocumentsApi.getDetails(match.params.documentId)
                setDocumentDetails(() => _documentDetails)
                setInitialSelectedDocument(LANGUAGE_IDS.PL, _documentDetails)
            } catch (e) {}
        }
        getDocumentDetails()
    }, [match.params.documentId, setDocumentDetails])

    const setInitialSelectedDocument = (languageIdStr, documentDetails) => {
        const selectedDocumentContent = documentDetails.find(
            document => document.language.id === parseInt(languageIdStr),
        )
        const selectedDocument = documentDetails[0]

        setSelectedDocument({
            documentContentId: selectedDocumentContent ? selectedDocumentContent.documentContentId : '',
            content: selectedDocumentContent ? selectedDocumentContent.content : '',
            documentId: selectedDocument ? selectedDocument.documentId : '',
            name: selectedDocument ? selectedDocument.name : '',
        })
    }
    const onLanguageChange = e => {
        setLanguageId(e.target.value)
        setInitialSelectedDocument(e.target.value, documentDetails)
    }

    const updateContent = content => {
        setSelectedDocument({ ...selectedDocument, content })
        setEditing(true)
    }

    const saveDocumentDetails = async () => {
        setLoading(true)
        try {
            let documentId = match.params.templateId
            if (selectedDocument.documentContentId) {
                await DocumentsApi.updateContent(selectedDocument)
            } else {
                const response = await DocumentsApi.createContent({
                    content: selectedDocument.content,
                    documentId: selectedDocument.documentId,
                    languageId,
                })
                documentId = response.documentId
            }
            const _selectedDocumentDetails = await DocumentsApi.getDetails(documentId)
            setDocumentDetails(() => _selectedDocumentDetails)
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setEditing(false)
        setLoading(false)
    }
    const cancel = () => {
        setInitialSelectedDocument(languageId, documentDetails)
        setEditing(false)
    }

    if (!documentDetails) return null
    return (
        <Card>
            <Card.Header>
                <Card.Title>{selectedDocument.name}</Card.Title>
                <Card.Options>
                    {isEditing && (
                        <>
                            <PrimaryButton text={t('save')} onClick={saveDocumentDetails} />
                            <SecondaryButton text={t('cancel')} onClick={cancel} />
                        </>
                    )}
                </Card.Options>
            </Card.Header>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <Form.Group label={t('Choose language')}>
                        <LanguageSelect onChange={onLanguageChange} defaultValue={LANGUAGE_IDS.PL} />
                    </Form.Group>
                    <Grid.Row>
                        <Grid.Col>
                            <Form.Group label={t('Email content')}>
                                <WysiwygEditor
                                    ref={wysiwygEditorRef}
                                    htmlContent={selectedDocument.content}
                                    onChange={updateContent}
                                />
                            </Form.Group>
                        </Grid.Col>
                    </Grid.Row>
                </Dimmer>
            </Card.Body>
        </Card>
    )
}

export default DocumentDetails

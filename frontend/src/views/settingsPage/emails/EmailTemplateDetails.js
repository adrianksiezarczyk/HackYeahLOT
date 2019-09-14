import React, { useState, useEffect, Fragment, useRef } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Card, Dimmer, Grid, Form } from 'tabler-react'
import { PrimaryButton, SecondaryButton } from '../../../components/shared/Button'
import EmailTemplateApi from '../../../services/emailTemplate/api'
import LanguageSelect from '../../../components/shared/LanguageSelect'
import WysiwygEditor from '../../../components/WysiwygEditor'
import useImmerState from '../../../hooks/useImmerState'
import { tagsList } from './tagsList'
import { LANGUAGE_IDS } from '../../../constants'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'

const TagsList = styled.div`
    margin-top: 8px;
    background-color: rgba(48, 126, 204, 0.05);
    border: 1px solid #a9a9a9;
    border-radius: 1px;
    padding: 10px;
    color: #5d5d5d;
`
const TagsHeader = styled.span``
const TagTitle = styled.p`
    font-weight: bold;
    margin-top: 15px;
    border-top: 1px solid #a9a9a9;
    border-bottom: 1px solid #a9a9a9;
`

const Tag = styled.button`
    display: block;
    margin-bottom: 2px !important;
    cursor: pointer;
    margin-top: 8px;
    background-color: rgba(48, 126, 204, 0) !important;
    border: none !important;
    border-radius: 0 !important;
    padding: 0 !important;
`
const Description = styled.span`
    font-size: 14px;
    color: #919191;
`

const EmailTemplateDetails = ({ match }) => {
    const [isLoading, setLoading] = useState(null)
    const [isEditing, setEditing] = useState(false)
    const [languageId, setLanguageId] = useState(LANGUAGE_IDS.PL)
    const [emailTemplateDetails, setEmailTemplateDetails] = useImmerState(null)
    const [selectedTemplate, setSelectedTemplate] = useState({})
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const wysiwygEditorRef = useRef()
    const [t] = useTranslation('settings-page')

    useEffect(() => {
        const getEmailTemplateDetails = async () => {
            try {
                const emailTemplateDetails = await EmailTemplateApi.getDetails(match.params.templateId)
                setEmailTemplateDetails(() => emailTemplateDetails)
                setInitialSelectedTemplate(LANGUAGE_IDS.PL, emailTemplateDetails)
            } catch (e) {}
        }
        getEmailTemplateDetails()
    }, [match.params.templateId, setEmailTemplateDetails])

    const setInitialSelectedTemplate = (languageIdStr, emailTemplateDetails) => {
        const emailTemplateContent = emailTemplateDetails.contentList.find(
            contentEl => contentEl.language.id === parseInt(languageIdStr),
        )

        setSelectedTemplate({
            emailTemplateContentId: emailTemplateContent ? emailTemplateContent.id : '',
            content: emailTemplateContent ? emailTemplateContent.content : '',
            title: emailTemplateContent ? emailTemplateContent.title : '',
        })
    }
    const onLanguageChange = e => {
        setLanguageId(e.target.value)
        setInitialSelectedTemplate(e.target.value, emailTemplateDetails)
    }
    const updateTitle = title => {
        setSelectedTemplate({ ...selectedTemplate, title })
        setEditing(true)
    }
    const updateContent = content => {
        setSelectedTemplate({ ...selectedTemplate, content })
        setEditing(true)
    }

    const saveEmailtemplate = async () => {
        setLoading(true)
        try {
            if (selectedTemplate.emailTemplateContentId) await EmailTemplateApi.updateContent(selectedTemplate)
            else
                await EmailTemplateApi.createContent({
                    ...selectedTemplate,
                    emailTemplateId: emailTemplateDetails.id,
                    languageId,
                })
            const _emailTemplateDetails = await EmailTemplateApi.getDetails(match.params.templateId)
            setEmailTemplateDetails(() => _emailTemplateDetails)
            setEditing(false)
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }
    const cancel = () => {
        setInitialSelectedTemplate(languageId, emailTemplateDetails)
        setEditing(false)
    }

    const insertTag = tag => wysiwygEditorRef.current.insertText(tag)

    if (!emailTemplateDetails) return null
    return (
        <Card>
            <Card.Header>
                <Card.Title>{emailTemplateDetails.name}</Card.Title>
                <Card.Options>
                    {isEditing && (
                        <>
                            <PrimaryButton text={t('save')} onClick={saveEmailtemplate} />
                            <SecondaryButton text={t('cancel')} onClick={cancel} />
                        </>
                    )}
                </Card.Options>
            </Card.Header>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <Form.Group label={t('Email title')}>
                        <Form.Input value={selectedTemplate.title} onChange={e => updateTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group label={t('Choose language')}>
                        <LanguageSelect onChange={onLanguageChange} defaultValue={LANGUAGE_IDS.PL} />
                    </Form.Group>
                    <Grid.Row>
                        <Grid.Col md={4}>
                            <TagsList>
                                <TagsHeader>
                                    <b>{t('Tags list')}</b> ({t('click to paste to content')})
                                </TagsHeader>
                                {Object.entries(tagsList).map(([title, tags]) => {
                                    return (
                                        <Fragment key={title}>
                                            <TagTitle>{t(title)}</TagTitle>
                                            {title === 'Products' && (
                                                <Description>
                                                    Tagi z produktami należy obudować za pomocą [product_wrapper] na
                                                    początku oraz [/product_wrapper] na końcu
                                                </Description>
                                            )}
                                            {tags.map(tag => (
                                                <Tag
                                                    key={tag}
                                                    onClick={() => {
                                                        insertTag(`[${tag}]`)
                                                    }}>
                                                    [{tag}]
                                                </Tag>
                                            ))}
                                        </Fragment>
                                    )
                                })}
                            </TagsList>
                        </Grid.Col>
                        <Grid.Col md={8}>
                            <Form.Group label={t('Email content')}>
                                <WysiwygEditor
                                    ref={wysiwygEditorRef}
                                    htmlContent={selectedTemplate.content}
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

export default EmailTemplateDetails

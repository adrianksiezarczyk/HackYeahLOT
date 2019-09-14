import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Dimmer, Table, Form } from 'tabler-react'
import Button, { PrimaryButton, SecondaryButton, RemoveButton } from '../../../components/shared/Button'
import { Link } from 'react-router-dom'
import EmailTemplateApi from '../../../services/emailTemplate/api'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'
import { warningTakeAlert } from '../../../components/shared/TakeAlert'

const SmallButton = styled(Button)`
    font-size: 87.5% !important;
    font-weight: 400 !important;
    padding: 5px 10px !important;
`

const EmailTemplates = ({ emailTemplates, t, refresh }) => {
    const [isLoading, setLoading] = useState(null)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [newTemplate, setNewTemplate] = useState(null)

    const createTemplate = async () => {
        try {
            await EmailTemplateApi.create(newTemplate)
            setNewTemplate(null)
            refresh()
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
    }

    const onRemoveTemplate = async id => {
        try {
            setLoading(true)
            await EmailTemplateApi.delete(id)
            await refresh()
            setSuccessStatus()
            setLoading(false)
        } catch (e) {
            setFailureStatus()
        }
    }

    const removeTemplate = id =>
        warningTakeAlert(t('are you sure?'), t('remove email template'), t('remove'), () => onRemoveTemplate(id))

    return (
        <Card>
            <Card.Header>
                <Card.Title>{t('Email templates')}</Card.Title>
                <Card.Options>
                    {newTemplate ? (
                        <>
                            <PrimaryButton text={t('save')} onClick={createTemplate} />
                            <SecondaryButton
                                text={t('cancel')}
                                onClick={() => {
                                    setNewTemplate(null)
                                }}
                            />
                        </>
                    ) : (
                        <Button
                            size="sm"
                            color="success"
                            onClick={() => {
                                setNewTemplate({})
                            }}>
                            {t('add')}
                        </Button>
                    )}
                </Card.Options>
            </Card.Header>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <Table highlightRowOnHover>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColHeader>{t('name')}</Table.ColHeader>
                                <Table.ColHeader />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {newTemplate && (
                                <Table.Row>
                                    <Table.Col>
                                        <Form.Input
                                            value={newTemplate.name}
                                            onChange={e => {
                                                setNewTemplate({ ...newTemplate, name: e.target.value })
                                            }}
                                        />
                                    </Table.Col>
                                    <Table.Col />
                                </Table.Row>
                            )}
                            {emailTemplates.map(template => {
                                return (
                                    <Table.Row>
                                        <Table.Col>{template.name}</Table.Col>
                                        <Table.Col alignContent="right">
                                            <Link to={`emails/${template.id}`}>
                                                <SmallButton className="ml-2" color="secondary" size="sm">
                                                    {t('edit')}
                                                </SmallButton>
                                            </Link>
                                            {!template.isReadonly && (
                                                <RemoveButton
                                                    onClick={() => {
                                                        removeTemplate(template.id)
                                                    }}
                                                />
                                            )}
                                        </Table.Col>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </Dimmer>
            </Card.Body>
        </Card>
    )
}

export default EmailTemplates

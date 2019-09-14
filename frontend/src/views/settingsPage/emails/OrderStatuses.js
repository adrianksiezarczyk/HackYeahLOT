import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Dimmer, Table, Form } from 'tabler-react'
import Button, { PrimaryButton, SecondaryButton, RemoveButton } from '../../../components/shared/Button'
import useImmerState from '../../../hooks/useImmerState'
import OrderApi from '../../../services/order/api'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'
import TakeAlert from '../../../utils/takeAlert'
import { Tooltip } from 'react-tippy'

const InlineFormGroup = styled(Form.Group)`
    display: flex !important;
    align-items: center;
    .form-help {
        margin-left: 5px;
    }
`
const StyledTable = styled(Table)`
    td {
        vertical-align: middle !important;
    }
    .form-group {
        margin-bottom: 0 !important;
    }
`

const OrderStatuses = ({ initialOrderStatuses, emailTemplates, t }) => {
    const [isLoading, setLoading] = useState(null)
    const [newStatus, setNewStatus] = useState(null)
    const [isEditing, setEditing] = useState(null)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [orderStatuses, setOrderStatuses] = useImmerState(initialOrderStatuses)

    const updateName = (statusId, name) => {
        setEditing(true)
        setOrderStatuses(draft => {
            const orderStatus = draft.find(status => status.id === statusId)
            if (orderStatus) orderStatus.name = name
        })
    }
    const updateTemplate = (statusId, templateId) => {
        setEditing(true)
        setOrderStatuses(draft => {
            const orderStatus = draft.find(status => status.id === statusId)
            if (orderStatus) orderStatus.emailTemplateId = templateId
        })
    }

    const cancel = () => {
        setOrderStatuses(() => initialOrderStatuses)
        setNewStatus(null)
        setEditing(false)
    }

    const removeStatus = async orderStatusId => {
        const result = await TakeAlert.fire({
            title: t('are you sure?'),
            text: t('remove email template'),
            showCancelButton: true,
            cancelButtonText: t('cancel'),
            confirmButtonText: t('remove'),
            type: 'warning',
            allowEscapeKey: true,
            allowOutsideClick: true,
            reverseButtons: true,
        })
        if (result.value) {
            try {
                setLoading(true)
                await OrderApi.removeStatus(orderStatusId)
                await refresh()
                setSuccessStatus()
                setLoading(false)
            } catch (e) {
                setFailureStatus()
            }
        }
        if (result.dismiss === 'backdrop' || result.dismiss === 'esc') return
    }

    const refresh = async () => {
        try {
            const orderStatuses = await OrderApi.getStatuses()
            setOrderStatuses(() => orderStatuses)
        } catch (e) {}
        setEditing(false)
        setNewStatus(null)
    }
    const addStatus = async () => {
        try {
            setLoading(true)
            await OrderApi.addStatus(newStatus)
            await refresh()
            setSuccessStatus()
            setLoading(false)
        } catch (e) {
            setFailureStatus()
        }
    }
    const saveStatuses = async () => {
        try {
            setLoading(true)
            await OrderApi.updateStatuses(orderStatuses)
            setSuccessStatus()
            setEditing(false)
            setLoading(false)
        } catch (e) {
            setFailureStatus()
        }
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>{t('Order statuses')}</Card.Title>
                <Card.Options>
                    {!newStatus && (
                        <Button
                            size="sm"
                            color="success"
                            onClick={() => {
                                setNewStatus({ name: '' })
                            }}>
                            {t('add')}
                        </Button>
                    )}
                    {isEditing && (
                        <>
                            <PrimaryButton
                                text={t('save')}
                                onClick={() => {
                                    saveStatuses()
                                }}
                            />
                            <SecondaryButton text={t('cancel')} onClick={cancel} />
                        </>
                    )}
                </Card.Options>
            </Card.Header>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <StyledTable>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColHeader>{t('name')}</Table.ColHeader>
                                <Table.ColHeader>{t('email template')}</Table.ColHeader>
                                <Table.ColHeader />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {newStatus && (
                                <Table.Row>
                                    <Table.Col>
                                        <Form.Input
                                            value={newStatus.name}
                                            onChange={e =>
                                                setNewStatus({
                                                    name: e.target.value,
                                                    emailTemplateId: newStatus.emailTemplateId,
                                                })
                                            }
                                        />
                                    </Table.Col>
                                    <Table.Col>
                                        <Form.Select
                                            value={newStatus.emailTemplateId}
                                            onChange={e =>
                                                setNewStatus({
                                                    name: newStatus.name,
                                                    emailTemplateId: e.target.value,
                                                })
                                            }>
                                            <option value={''}>-</option>
                                            {emailTemplates.map(template => (
                                                <option value={template.id}>{template.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Table.Col>
                                    <Table.Col>
                                        <Button size="sm" color="success" icon="check" onClick={addStatus} />
                                        <Button
                                            size="sm"
                                            color="danger"
                                            icon="x"
                                            onClick={() => {
                                                setNewStatus(null)
                                            }}
                                        />
                                    </Table.Col>
                                </Table.Row>
                            )}
                            {orderStatuses.map(status => {
                                return (
                                    <Table.Row>
                                        <Table.Col>
                                            <InlineFormGroup>
                                                <Form.Input
                                                    value={status.name}
                                                    onChange={e => updateName(status.id, e.target.value)}
                                                />
                                                {status.staticName && (
                                                    <Tooltip
                                                        title={status.staticName}
                                                        position="right"
                                                        trigger="mouseenter">
                                                        <Form.Help />
                                                    </Tooltip>
                                                )}
                                            </InlineFormGroup>
                                        </Table.Col>
                                        <Table.Col>
                                            <Form.Select
                                                value={status.emailTemplateId}
                                                onChange={e => updateTemplate(status.id, e.target.value)}>
                                                <option value={''}>-</option>
                                                {emailTemplates.map(template => (
                                                    <option value={template.id}>{template.name}</option>
                                                ))}
                                            </Form.Select>
                                        </Table.Col>
                                        <Table.Col>
                                            {!status.isReadonly && (
                                                <RemoveButton
                                                    onClick={() => {
                                                        removeStatus(status.id)
                                                    }}
                                                />
                                            )}
                                        </Table.Col>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </StyledTable>
                </Dimmer>
            </Card.Body>
        </Card>
    )
}

export default OrderStatuses

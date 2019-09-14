import React, { useState, useEffect } from 'react'
import { Card, Dimmer, Button, Form } from 'tabler-react'
import { StyledCard, ButtonsContainer } from './components'
import OrderApi from '../../../services/order/api'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'

const DeliveryData = ({ orderId, customer, updateInitialData, t }) => {
    const [isLoading, setLoading] = useState(false)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [isEditMode, setEditMode] = useState(false)
    const [customerData, setCustomerData] = useState(customer || {})

    useEffect(() => {
        setCustomerData(customer)
    }, [customer])

    const updateCustomerData = (key, value) => {
        setCustomerData({ ...customerData, [key]: value })
        setEditMode(true)
    }

    const cancel = () => {
        setCustomerData(customer)
        setEditMode(false)
    }
    const save = async () => {
        setLoading(true)
        try {
            await OrderApi.updateDeliveryData(orderId, customerData)
            updateInitialData('customer', customerData)
            setSuccessStatus()
        } catch (e) {
            console.error(e.json.message)
            setFailureStatus()
        }
        setLoading(false)
        setEditMode(false)
    }

    if (!customer || !customerData) return null
    return (
        <StyledCard
            isCollapsible
            title={t('Delivery address')}
            options={
                <ButtonsContainer>
                    {isEditMode && (
                        <>
                            <Button size="sm" color="primary" className="mr-2" onClick={save}>
                                {t('save')}
                            </Button>
                            <Button size="sm" color="secondary" className="mr-2" onClick={cancel}>
                                {t('cancel')}
                            </Button>
                        </>
                    )}
                </ButtonsContainer>
            }>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <Form>
                        <Form.Group>
                            <Form.Label>{t('first and last name')}</Form.Label>
                            <Form.InputGroup>
                                <Form.Input
                                    value={customerData.firstName || ''}
                                    className="mr-2"
                                    onChange={e => {
                                        updateCustomerData('firstName', e.target.value)
                                    }}
                                />
                                <Form.Input
                                    value={customerData.lastName || ''}
                                    className="ml-2"
                                    onChange={e => {
                                        updateCustomerData('lastName', e.target.value)
                                    }}
                                />
                            </Form.InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('email')}</Form.Label>
                            <Form.Input
                                value={customerData.email || ''}
                                onChange={e => {
                                    updateCustomerData('email', e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('address')}</Form.Label>
                            <Form.Input
                                value={customerData.address || ''}
                                onChange={e => {
                                    updateCustomerData('address', e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('post code and city')}</Form.Label>
                            <Form.InputGroup>
                                <Form.Input
                                    value={customerData.postCode || ''}
                                    className="mr-2"
                                    onChange={e => {
                                        updateCustomerData('postCode', e.target.value)
                                    }}
                                />
                                <Form.Input
                                    value={customerData.city || ''}
                                    className="ml-2"
                                    onChange={e => {
                                        updateCustomerData('city', e.target.value)
                                    }}
                                />
                            </Form.InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('country')}</Form.Label>
                            <Form.Input
                                value={customerData.country || ''}
                                onChange={e => {
                                    updateCustomerData('country', e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.InputGroup>
                                <div style={{ flexGrow: 1 }} className="mr-2">
                                    <Form.Label>{t('area code')}</Form.Label>
                                    <Form.Input
                                        value={customerData.areaCode || ''}
                                        onChange={e => {
                                            updateCustomerData('areaCode', e.target.value)
                                        }}
                                    />
                                </div>
                                <div style={{ flexGrow: 1 }} className="ml-2">
                                    <Form.Label>{t('phone number')}</Form.Label>
                                    <Form.Input
                                        value={customerData.phoneNumber || ''}
                                        onChange={e => {
                                            updateCustomerData('phoneNumber', e.target.value)
                                        }}
                                    />
                                </div>
                            </Form.InputGroup>
                        </Form.Group>
                    </Form>
                </Dimmer>
            </Card.Body>
        </StyledCard>
    )
}

export default DeliveryData

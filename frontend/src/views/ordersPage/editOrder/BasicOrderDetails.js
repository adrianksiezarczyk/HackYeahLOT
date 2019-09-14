import React, { useState, useEffect } from 'react'
import { Card, Dimmer, Grid, Form, Button } from 'tabler-react'
import { StyledCard, ButtonsContainer } from './components'
import styled from 'styled-components'
import OrderApi from '../../../services/order/api'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 350px;
    margin-bottom: 10px;
`

const BasicOrderDetails = ({ orderId, orderInfo, updateInitialData, t }) => {
    const [isLoading, setLoading] = useState(false)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [isEditMode, setEditMode] = useState(false)
    const [statusId, setStatusId] = useState(orderInfo.statusId)

    useEffect(() => {
        setStatusId(orderInfo.statusId)
    }, [orderInfo])

    const updateStatus = value => {
        setStatusId(value)
        setEditMode(true)
    }

    const cancel = () => {
        setStatusId(orderInfo.statusId)
        setEditMode(false)
    }
    const save = async () => {
        setLoading(true)
        try {
            await OrderApi.updateStatus(orderId, statusId)
            updateInitialData('setOrderStatusId', statusId)
            setSuccessStatus()
        } catch (e) {
            console.error(e.json.message)
            setFailureStatus()
        }
        setLoading(false)
        setEditMode(false)

        updateInitialData('setOrderStatusId', statusId)
    }

    if (!orderInfo) return null
    return (
        <StyledCard
            isCollapsible
            title={t('order details')}
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
                    <Grid>
                        <Grid.Row>
                            <Grid.Col md={6}>
                                <InfoRow>
                                    <div>{t('orderId')}</div>
                                    <div>
                                        <b>{orderInfo.id}</b>
                                    </div>
                                </InfoRow>
                                <InfoRow>
                                    <div>{t('baselinker orderId')}</div>
                                    <div>
                                        {' '}
                                        <b>{orderInfo.baselinkerOrderId}</b>
                                    </div>
                                </InfoRow>
                                <InfoRow>
                                    <div>{t('date')}</div>
                                    <div>{orderInfo.date}</div>
                                </InfoRow>
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <InfoRow>
                                    <div>{t('status')}</div>
                                    <div>
                                        <Form.Select value={statusId} onChange={e => updateStatus(e.target.value)}>
                                            {orderInfo.statuses.map(status => {
                                                return (
                                                    <option key={status.id} value={status.id}>
                                                        {status.name}
                                                    </option>
                                                )
                                            })}
                                        </Form.Select>
                                    </div>
                                </InfoRow>
                            </Grid.Col>
                        </Grid.Row>
                    </Grid>
                </Dimmer>
            </Card.Body>
        </StyledCard>
    )
}

export default BasicOrderDetails

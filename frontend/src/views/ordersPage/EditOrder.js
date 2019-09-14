import React, { useState, useEffect, useCallback } from 'react'
import { Page, Grid, Dimmer } from 'tabler-react'
import { useTranslation } from 'react-i18next'
import OrderApi from '../../services/order/api'
import OrderProducts from './editOrder/OrderProducts'
import PaymentDetails from './editOrder/PaymentDetails'
import DeliveryData from './editOrder/DeliveryData'
import AliExpressDetails from './editOrder/AliExpressDetails'
import OrderComments from './editOrder/OrderComments'
import BasicOrderDetails from './editOrder/BasicOrderDetails'
import { FailureCardAlert } from '../../components/shared/Alert'
import useImmerState from '../../hooks/useImmerState'

const getOrderInfo = orderDetails => {
    if (!orderDetails) return null
    return {
        id: orderDetails.id,
        date: orderDetails.date,
        baselinkerOrderId: orderDetails.baseLinkerOrderId,
        statusId: orderDetails.setOrderStatusId,
        statuses: orderDetails.statuses,
    }
}

const OrderEditPage = ({ match }) => {
    const [isLoading, setLoading] = useState(false)
    const [orderDetails, setOrdersDetails] = useImmerState(null)
    const [orderPayments, setOrdersPayments] = useState(null)
    const [orderComments, setOrdersComments] = useState(null)

    const [error, setError] = useState(null)

    const { t } = useTranslation('orders-page')

    const getOrderData = useCallback(async () => {
        setLoading(true)
        try {
            const details = await OrderApi.getOrderDetails(match.params.orderId)
            setOrdersDetails(() => details)

            const payments = await OrderApi.getOrderPayments(match.params.orderId)
            setOrdersPayments(payments)
        } catch (e) {
            console.error(e)
            setError(e.json.message)
        }

        const comments = await OrderApi.getOrderComments(match.params.orderId)
        setOrdersComments(comments)

        setLoading(false)
    }, [match.params.orderId, setOrdersDetails])

    useEffect(() => {
        getOrderData()
    }, [getOrderData])

    const updateInitialOrderDetails = (key, value) => {
        setOrdersDetails(draft => {
            draft[key] = value
        })
    }

    const refreshOrderDetails = async () => {
        setLoading(true)
        try {
            const details = await OrderApi.getOrderDetails(match.params.orderId)
            setOrdersDetails(() => details)
        } catch (e) {
            console.error(e)
            setError(e.json.message)
        }
        setLoading(false)
    }

    if (error)
        return (
            <Page.Content>
                <FailureCardAlert
                    autoCanelDisabled
                    onHide={() => {
                        setError(null)
                    }}
                    text={error}
                />
            </Page.Content>
        )
    if (!orderDetails || !orderPayments || !orderComments) return null
    return (
        <Page.Content>
            <Dimmer active={isLoading} loader>
                <BasicOrderDetails
                    orderId={match.params.orderId}
                    orderInfo={getOrderInfo(orderDetails)}
                    updateInitialData={updateInitialOrderDetails}
                    t={t}
                />
                <OrderProducts
                    orderId={match.params.orderId}
                    orderProducts={orderDetails && orderDetails.products}
                    refreshOrderDetails={refreshOrderDetails}
                    t={t}
                />
                <PaymentDetails orderPayments={orderPayments} t={t} />
                <Grid.Row>
                    <Grid.Col md={6}>
                        <DeliveryData
                            orderId={match.params.orderId}
                            customer={orderDetails.customer}
                            updateInitialData={updateInitialOrderDetails}
                            t={t}
                        />
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <AliExpressDetails t={t} aliExpressOrders={orderDetails.aliExpressOrders} />
                    </Grid.Col>
                </Grid.Row>
                <OrderComments t={t} orderComments={orderComments} />
            </Dimmer>
        </Page.Content>
    )
}

export default OrderEditPage

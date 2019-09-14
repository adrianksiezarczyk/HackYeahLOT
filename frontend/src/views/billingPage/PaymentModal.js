import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Dinero from 'dinero.js'
import { Icon } from 'tabler-react'
import BaseModal from '../../components/shared/BaseModal'
import Button from '../../components/shared/Button'
import BillingApi from '../../services/billing/api'
import { getLanguage } from '../../utils/l10n'
import SubscriptionApi from '../../services/subscription/api'
import { withRouter } from 'react-router-dom'
import { warningTakeAlert } from '../../components/shared/TakeAlert'

const TextRow = styled.p`
    display: flex;
    justify-content: space-between;
`

const PaymentModal = ({ isOpen, onCloseModal, t, history, planId, internalOrderId, plan }) => {
    const [paymentDetails, setPaymentDetails] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        if (!planId || !isOpen) return
        if (internalOrderId) {
            setLoading(false)
            return
        }
        setLoading(true)
        const getPaymentDetails = async () => {
            try {
                const data = await BillingApi.GetPaymentDetails(planId)
                setPaymentDetails(data)
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }
        getPaymentDetails()
    }, [planId, internalOrderId, isOpen])

    const errorAlert = () =>
        warningTakeAlert(t('You have not filled out the invoice details'), t('Return to the form'), t('Go'), () => {
            history.push('/billing/details')
        })

    const onPayClick = async () => {
        try {
            let response
            if (internalOrderId) response = await SubscriptionApi.pay(internalOrderId)
            else response = await SubscriptionApi.buy(planId)
            window.location.href = response.redirectUri
        } catch (error) {
            console.error(error)
            errorAlert()
        }
    }

    const PlanDetailsContent = () => {
        return (
            <>
                <h5 className="text-center">{paymentDetails.description}</h5>
                <TextRow>
                    <span>{t('Plan validity period')}:</span>
                    <span>
                        {paymentDetails.dateFrom} - {paymentDetails.dateTo}
                    </span>
                </TextRow>
                <TextRow>
                    <span>{t('Plan cost')}: </span>
                    <span>
                        {Dinero({
                            amount: Math.round(paymentDetails.planPrice * 100),
                            currency: 'pln',
                        })
                            .setLocale(getLanguage())
                            .toFormat('$0,0.00')}
                    </span>
                </TextRow>
                <TextRow>
                    <span>{t('Shop products limit')}:</span>
                    <span> {paymentDetails.planShopProductsLimit}</span>
                </TextRow>
                <TextRow>
                    <span>{t('Shops limit')}: </span>
                    <span>{paymentDetails.planShopsLimit}</span>
                </TextRow>
            </>
        )
    }
    const CreatedOrderContent = () => {
        return (
            <>
                <h5 className="text-center">
                    {t('Plan payment')} - {plan.name}
                </h5>
                <TextRow>
                    <span>{t('Plan validity period')}:</span>
                    <span>
                        {plan.dateFrom && plan.dateTo && plan.dateFrom} - {plan.dateTo}
                    </span>
                </TextRow>
                <TextRow>
                    <span>{t('Plan cost')}: </span>
                    <span>
                        {Dinero({
                            amount: Math.round(plan.amount * 100),
                            currency: 'pln',
                        })
                            .setLocale(getLanguage())
                            .toFormat('$0,0.00')}
                    </span>
                </TextRow>
            </>
        )
    }

    if (isLoading) return null
    return (
        <BaseModal
            isOpen={isOpen}
            onCloseModal={onCloseModal}
            title={t('payment')}
            actions={<Icon link name="x" onClick={onCloseModal} />}
            footer={
                <>
                    <Button className="mr-2" color="success" size="sm" onClick={onPayClick}>
                        {t('pay')}
                    </Button>
                    <Button color="warning" size="sm" onClick={onCloseModal}>
                        {t('cancel')}
                    </Button>
                </>
            }>
            {paymentDetails && <PlanDetailsContent />}
            {internalOrderId && plan && <CreatedOrderContent />}
        </BaseModal>
    )
}

export default withRouter(PaymentModal)

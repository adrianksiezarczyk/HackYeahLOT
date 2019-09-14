import React, { useEffect, useState, Suspense, lazy } from 'react'
import Dinero from 'dinero.js'
import styled from 'styled-components'
import { Grid, Card, Table, Button, Tag } from 'tabler-react'
import BillingApi from '../../services/billing/api'
import { getLanguage } from '../../utils/l10n'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import useModal from '../../components/hooks/useModal'

const PaymentModal = lazy(() => import('./PaymentModal'))

const StyledCardHeader = styled(Card.Header)`
    border-bottom: none !important;
`

const BillingInvoices = ({ t }) => {
    const [isLoading, setLoading] = useState(false)
    const [plans, setPlans] = useState(null)

    useEffect(() => {
        setLoading(true)
        const getPlansPayments = async () => {
            try {
                const data = await BillingApi.GetPlansPayments()
                setPlans(data)
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }
        getPlansPayments()
    }, [])

    const { isOpen: isModalOpen, open: openModal, close: closeModal, modalProps } = useModal({})

    if (!plans || isLoading) return null
    return (
        <Grid>
            <Grid.Row>
                <Grid.Col>
                    <Card>
                        <StyledCardHeader>
                            <Card.Title>{t('invoices')}</Card.Title>
                        </StyledCardHeader>
                        <Card.Body>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColHeader>{t('date')}</Table.ColHeader>
                                        <Table.ColHeader>{t('name')}</Table.ColHeader>
                                        <Table.ColHeader>{t('number')}</Table.ColHeader>
                                        <Table.ColHeader>{t('status')}</Table.ColHeader>
                                        <Table.ColHeader>{t('amount')}</Table.ColHeader>
                                        <Table.ColHeader />
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {plans.map((plan, index) => {
                                        const date =
                                            plan.dateFrom && plan.dateTo
                                                ? `${plan.dateFrom} - ${plan.dateTo}`
                                                : plan.date
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Col>{date}</Table.Col>
                                                <Table.Col>{plan.name}</Table.Col>
                                                <Table.Col>{plan.invoiceNumber}</Table.Col>
                                                <Table.Col>
                                                    {plan.payment && plan.payment.success ? (
                                                        <Tag color="lime">{t('paid')}</Tag>
                                                    ) : (
                                                        <Tag color="yellow">{t('pending')}</Tag>
                                                    )}
                                                </Table.Col>
                                                <Table.Col>
                                                    {Dinero({
                                                        amount: Math.round(
                                                            plan.payment
                                                                ? plan.payment.amount * 100
                                                                : plan.amount * 100,
                                                        ),
                                                        currency: 'pln',
                                                    })
                                                        .setLocale(getLanguage())
                                                        .toFormat('$0,0.00')}
                                                </Table.Col>
                                                <Table.Col>
                                                    {plan.invoiceUrl && (
                                                        <a
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            href={plan.invoiceUrl}>
                                                            <Button color="secondary">{t('download')}</Button>
                                                        </a>
                                                    )}
                                                    {!plan.invoiceUrl && !(plan.payment && plan.payment.success) && (
                                                        <Button
                                                            color="secondary"
                                                            onClick={() =>
                                                                openModal({
                                                                    selectedPlanId: plan.planId,
                                                                    internalOrderId: plan.internalOrderId,
                                                                })
                                                            }>
                                                            {t('pay')}
                                                        </Button>
                                                    )}
                                                </Table.Col>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Card.Body>
                    </Card>
                </Grid.Col>
            </Grid.Row>
            <Suspense fallback={<LoadingIndicator />}>
                <PaymentModal
                    size="md"
                    isOpen={isModalOpen}
                    onCloseModal={closeModal}
                    plan={plans.find(
                        p => p.planId === modalProps.selectedPlanId && p.internalOrderId === modalProps.internalOrderId,
                    )}
                    planId={modalProps.selectedPlanId}
                    internalOrderId={modalProps.internalOrderId}
                    t={t}
                />
            </Suspense>
        </Grid>
    )
}

export default BillingInvoices

import React from 'react'
import { Table, Card, Dimmer, Badge } from 'tabler-react'
import { StyledCard } from './components'

const PaymentDetails = ({ orderPayments, t }) => {
    if (!orderPayments || !orderPayments.length) return null
    return (
        <StyledCard isCollapsible title={t('payment details')}>
            <Card.Body>
                <Dimmer loader active={false}>
                    <Table responsive>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColHeader>{t('date')}</Table.ColHeader>
                                <Table.ColHeader>{t('payment type')}</Table.ColHeader>
                                <Table.ColHeader>{t('amount expected')}</Table.ColHeader>
                                <Table.ColHeader>{t('amount received')}</Table.ColHeader>
                                <Table.ColHeader />
                                <Table.ColHeader />
                                <Table.ColHeader />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {orderPayments.map(payment => {
                                return (
                                    <Table.Row key={payment.id}>
                                        <Table.Col>{payment.creationDate}</Table.Col>
                                        <Table.Col>{payment.paymentTypeName}</Table.Col>
                                        <Table.Col>{payment.expectedAmount} PLN</Table.Col>
                                        <Table.Col>{payment.actualAmount} PLN</Table.Col>
                                        <Table.Col>
                                            <Badge color={payment.success ? 'success' : 'danger'}>
                                                {payment.success}
                                            </Badge>
                                        </Table.Col>
                                        <Table.Col>
                                            {/* <Button
                                                color="default"
                                                size="sm"
                                                disabled={
                                                    payment.paymentTypeName !== 'BANK_TRANSFER' || payment.success
                                                }>
                                                <Icon name="check" />
                                                {t('Set as paid')}
                                            </Button> */}
                                        </Table.Col>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </Dimmer>
            </Card.Body>
        </StyledCard>
    )
}

export default PaymentDetails

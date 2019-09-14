import React from 'react'
import { Table, Card, Dimmer, Form, Badge } from 'tabler-react'
import { StyledCard } from './components'

const AliExpressDetails = ({ aliExpressOrders, t }) => {
    if (!aliExpressOrders) return null
    return (
        <StyledCard isCollapsible title={t('aliExpress details')}>
            <Card.Body>
                <Dimmer loader active={false}>
                    <Table responsive>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColHeader />
                                <Table.ColHeader>{t('number')}</Table.ColHeader>
                                <Table.ColHeader>{t('shop')}</Table.ColHeader>
                                <Table.ColHeader>{t('tracking')}</Table.ColHeader>
                                <Table.ColHeader>{t('value')}</Table.ColHeader>
                                <Table.ColHeader>{t('products')}</Table.ColHeader>
                                <Table.ColHeader />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {aliExpressOrders.map(order => {
                                return (
                                    <Table.Row key={order.number}>
                                        <Table.Col>
                                            <Form.Checkbox />
                                        </Table.Col>
                                        <Table.Col>{order.number}</Table.Col>
                                        <Table.Col>{order.shopName}</Table.Col>
                                        <Table.Col>{order.trackingNumber}</Table.Col>
                                        <Table.Col>{order.actualCost} $</Table.Col>
                                        <Table.Col>
                                            {!order.products.length ? (
                                                <Badge color={'danger'}> {t('lack').toUpperCase()} </Badge>
                                            ) : (
                                                order.products.map(product => product)
                                            )}
                                        </Table.Col>
                                        <Table.Col />
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

export default AliExpressDetails

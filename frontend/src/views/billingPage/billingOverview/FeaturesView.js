import React from 'react'
import { Subscriptions, Features } from '../subscriptions'
import styled from 'styled-components'
import { Grid, Card, List, Icon } from 'tabler-react'

const StyledCardTitle = styled.p`
    font-size: 0.875rem;
    text-transform: uppercase;
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin: 0 0 0.5rem;
`
const Price = styled.div`
    font-size: 42px !important;
`
const StyledCollapsibleCard = styled(Card)`
    border: none !important;
    margin-bottom: 0 !important;
    cursor: pointer;
    .card-header {
        min-height: 2.5rem;
    }
`

const StyledCollapsibleCardBody = styled(Card.Body)`
    padding: 0 !important;
`
const StyledCollapsibleList = styled(List)`
    text-align: left;
    font-size: 12px;
`
const FeaturesView = ({ t, plans }) => {
    return (
        <Grid.Row justifyContent="center">
            {Object.entries(Subscriptions).map(([name, info], index) => {
                const plan = plans.find(p => p.name === name)
                if (!plan) return null
                return (
                    <Grid.Col xs={12} sm={6} lg={3} key={index}>
                        <Card>
                            <Card.Body className="text-center">
                                <StyledCardTitle>{name}</StyledCardTitle>
                                <Price className="display-4 my-4">
                                    {plan.price.toFixed(2)} {plan.currency}
                                </Price>
                                <List unstyled className="leading-loose">
                                    <List.Item>
                                        <b>{plan.shopProductsLimit}</b> {t('products_genitive')}
                                    </List.Item>
                                    <List.Item>
                                        <b>{info.OrdersAmountMontly}</b> {t('orders_genitive')}
                                    </List.Item>
                                    <List.Item>
                                        <b>{info.TakeDropMargin}</b> {t('margin')}
                                    </List.Item>
                                    <List.Item>
                                        <b>{plan.shopsLimit}</b>{' '}
                                        {plan.shopsLimit === 1
                                            ? t('shop')
                                            : plan.shopsLimit === 3
                                            ? t('shops')
                                            : t('shops_genitive')}
                                    </List.Item>
                                </List>
                                <StyledCollapsibleCard isCollapsible>
                                    <StyledCollapsibleCardBody>
                                        <StyledCollapsibleList unstyled className="leading-loose">
                                            {Object.entries(Features).map(([name, arr]) => {
                                                return (
                                                    <List.Item key={name}>
                                                        {arr[index] ? (
                                                            <Icon name="check" className="text-success mr-2" />
                                                        ) : (
                                                            <Icon name="x" className="text-danger mr-2" />
                                                        )}
                                                        {name}
                                                    </List.Item>
                                                )
                                            })}
                                        </StyledCollapsibleList>
                                    </StyledCollapsibleCardBody>
                                </StyledCollapsibleCard>
                            </Card.Body>
                        </Card>
                    </Grid.Col>
                )
            })}
        </Grid.Row>
    )
}

export default FeaturesView

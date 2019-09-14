import React from 'react'
import styled from 'styled-components'
import { Card, Grid, List } from 'tabler-react'
import { UI_BREAKPOINTS } from '../../../constants'

const StyledCardHeader = styled(Card.Header)`
    border-bottom: none !important;
`

const StyledCardFooter = styled(Card.Footer)`
    border-top: none !important;
`
const StyledList = styled(List)`
    li {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        @media (min-width: ${UI_BREAKPOINTS.LG}px) {
            height: 30px;
        }
    }
`
const MainPlanInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const PlanName = styled.div`
    font-size: 36px;
    text-transform: uppercase;
`
const PlanPrice = styled.div`
    font-size: 24px;
    color: rgba(35, 37, 51, 0.6);
`
const ListItemKey = styled.span`
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: initial;
    color: #232533;
`
const ListItemValue = styled.span`
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: initial;
    color: #232533;
`

const CurrentPlanView = ({ t, currentPlanInfo, currentPlan }) => {
    return (
        <Grid.Row>
            <Grid.Col>
                <Card>
                    <StyledCardHeader>
                        <Card.Title>{t('current plan')}</Card.Title>
                    </StyledCardHeader>
                    <Card.Body>
                        <Grid.Row>
                            <Grid.Col md={6}>
                                <MainPlanInfo>
                                    <PlanName>{currentPlan.name}</PlanName>
                                    <PlanPrice>
                                        {currentPlanInfo.isTrialPlan
                                            ? t('trial version')
                                            : `${currentPlan.price} ${currentPlan.currency}`}
                                    </PlanPrice>
                                </MainPlanInfo>
                            </Grid.Col>
                            <Grid.Col md={5} offset={1}>
                                <StyledList>
                                    <List.Item>
                                        <ListItemKey>{t('validity date')}</ListItemKey>
                                        <ListItemValue>
                                            {new Date(currentPlanInfo.planValidityDateFrom).toLocaleDateString()} -{' '}
                                            {new Date(currentPlanInfo.planValidityDateTo).toLocaleDateString()}
                                        </ListItemValue>
                                    </List.Item>
                                    <List.Item>
                                        <ListItemKey>{t('products amount limit')}</ListItemKey>
                                        <ListItemValue>{currentPlan.shopProductsLimit}</ListItemValue>
                                    </List.Item>
                                    <List.Item>
                                        <ListItemKey>{t('shops amount limit')}</ListItemKey>
                                        <ListItemValue>{currentPlan.shopsLimit}</ListItemValue>
                                    </List.Item>
                                </StyledList>
                            </Grid.Col>
                        </Grid.Row>
                    </Card.Body>
                    <StyledCardFooter />
                </Card>
            </Grid.Col>
        </Grid.Row>
    )
}

export default CurrentPlanView

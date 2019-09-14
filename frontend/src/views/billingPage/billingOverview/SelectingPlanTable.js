import React from 'react'
import styled from 'styled-components'
import { Grid, Card, Icon, Table, Button } from 'tabler-react'
import { Subscriptions } from '../subscriptions'
import { UI_BREAKPOINTS } from '../../../constants'
import MediaQuery from 'react-responsive'

const StyledTableRow = styled(Table.Row)`
    td {
        vertical-align: middle !important;
    }
    :hover {
        cursor: pointer;
    }
    ${props =>
        props.selected &&
        `
            outline: 1px solid #467fcf!important;
            z-index: 1;
            color: #467fcf;
            background: #edf2fa;
    `}
`
const Circle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    ${props => props.selected && `border: 1px solid #467fcf;`}
`
const SelectingPlanCard = styled(Card)`
    min-height: ${props => props.minHeight}px;
`

const PlanBox = styled.div`
    border: 1px solid rgba(0, 40, 100, 0.12);
    border-radius: 3px;
    padding: 15px;
    margin-bottom: 15px;
    ${props => props.selected && `border: 1px solid #467fcf;`}
`
const TextRow = styled.p`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const CheckboxCol = styled(Grid.Col)`
    display: flex;
    justify-content: center;
    align-items: center;
`
const SelectingPlanTable = ({ t, plans, selectedPlanId, setSelectedPlanId, currentPlan, payForPlan }) => {
    return (
        <Grid.Row>
            <Grid.Col>
                <SelectingPlanCard minHeight={plans.length * 55 + 160}>
                    <MediaQuery maxWidth={UI_BREAKPOINTS.MD - 1}>
                        <Card.Body>
                            {Object.entries(Subscriptions).map(([name, info], index) => {
                                const plan = plans.find(p => p.name === name)
                                if (!plan) return null
                                const selectedRow = selectedPlanId === plan.id
                                return (
                                    <PlanBox
                                        key={index}
                                        selected={selectedRow}
                                        onClick={() => {
                                            setSelectedPlanId(plan.id)
                                        }}>
                                        <Grid.Row>
                                            <Grid.Col sm={6}>
                                                <h3>{name}</h3>
                                                <TextRow>
                                                    <span>{t('price')}</span>
                                                    <span>
                                                        {plan.price.toFixed(2)} {plan.currency}
                                                    </span>
                                                </TextRow>
                                                <TextRow>
                                                    <span>{t('products amount')}</span>
                                                    <span>{plan.shopProductsLimit}</span>
                                                </TextRow>
                                                <TextRow>
                                                    <span>{t('shops amount')}</span>
                                                    <span> {plan.shopsLimit}</span>
                                                </TextRow>
                                            </Grid.Col>
                                            <CheckboxCol sm={6}>
                                                <Circle selected={selectedRow}>
                                                    {selectedRow && <Icon prefix="fe" name="check" />}
                                                </Circle>
                                            </CheckboxCol>
                                        </Grid.Row>
                                    </PlanBox>
                                )
                            })}
                            {selectedPlanId && (
                                <div className="text-right mt-6">
                                    {selectedPlanId !== currentPlan.id && (
                                        <Button color={'success'} onClick={payForPlan}>
                                            {t('choose plan')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </Card.Body>
                    </MediaQuery>
                    <MediaQuery minWidth={UI_BREAKPOINTS.MD}>
                        <Card.Body>
                            <Table highlightRowOnHover>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColHeader>{t('subscription')}</Table.ColHeader>
                                        <Table.ColHeader>{t('price')}</Table.ColHeader>
                                        <Table.ColHeader>{t('products amount')}</Table.ColHeader>
                                        <Table.ColHeader>{t('shops amount')}</Table.ColHeader>
                                        <Table.ColHeader />
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {Object.entries(Subscriptions).map(([name, info], index) => {
                                        const plan = plans.find(p => p.name === name)
                                        if (!plan) return null
                                        const selectedRow = selectedPlanId === plan.id
                                        return (
                                            <StyledTableRow
                                                key={index}
                                                selected={selectedRow}
                                                onClick={() => {
                                                    setSelectedPlanId(plan.id)
                                                }}>
                                                <Table.Col>{name}</Table.Col>
                                                <Table.Col>
                                                    {plan.price.toFixed(2)} {plan.currency}
                                                </Table.Col>
                                                <Table.Col>{plan.shopProductsLimit}</Table.Col>
                                                <Table.Col>{plan.shopsLimit} </Table.Col>
                                                <Table.Col>
                                                    <Circle selected={selectedRow}>
                                                        {selectedRow && <Icon prefix="fe" name="check" />}
                                                    </Circle>
                                                </Table.Col>
                                            </StyledTableRow>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                            {selectedPlanId && (
                                <div className="text-right mt-6">
                                    {selectedPlanId !== currentPlan.id && (
                                        <Button
                                            color={'success'}
                                            onClick={() => {
                                                payForPlan(selectedPlanId)
                                            }}>
                                            {t('choose plan')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </Card.Body>
                    </MediaQuery>
                </SelectingPlanCard>
            </Grid.Col>
        </Grid.Row>
    )
}

export default SelectingPlanTable

import React, { useState, useEffect, useCallback } from 'react'
import { Table, Card } from 'tabler-react'
import withCurrentShop from '../../components/HOCs/withCurrentShop'
import Button, { PrimaryButton, SecondaryButton,RemoveButton } from '../../components/shared/Button'
import PricesApi from '../../services/prices/api'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import FormElement from '../../components/form/FormElement'
import useImmerState from '../../hooks/useImmerState'
import TakeAlert from '../../utils/takeAlert'

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

const CardHeaderOptionsDivider = styled.div`
    width: 0px;
    border: 1px solid rgba(0, 40, 100, 0.12);
`

const Commissions = () => {
    const [commissions, setCommissions] = useState(null)
    const [editableCommisions, setEditableCommissions] = useImmerState(null)
    const [touched, setTouched] = useState(new Set())
    const [deleted, setDeleted] = useState(new Set())

    const [t] = useTranslation('prices-page')

    const getCommissionsAsync = useCallback(async () => {
        try {
            const data = await PricesApi.getCommissions()
            setCommissions(data)
            setEditableCommissions(() => {
                return data
            })
            setTouched(new Set())
            setDeleted(new Set())
        } catch (error) {
            console.error(error)
            setCommissions([])
        }
    }, [setEditableCommissions])

    useEffect(() => {
        getCommissionsAsync()
    }, [getCommissionsAsync])

    const updateCommissionRateField = useCallback(
        (commissionRate, key, value) => {
            const commissionRateId = commissionRate.id
            const newTouched = new Set(touched)
            newTouched.add(commissionRateId)
            setTouched(newTouched)
            setEditableCommissions(draft => {
                draft.find(cr => cr.id === commissionRateId)[key] = Number(value)
            })
        },
        [setEditableCommissions, touched],
    )

    const clearChanges = useCallback(() => {
        setTouched(new Set())
        setDeleted(new Set())
        setEditableCommissions(() => commissions)
    }, [commissions, setEditableCommissions])

    const saveChanges = useCallback(async () => {
        const commissionsToSave = editableCommisions
            .filter(c => touched.has(c.id))
            .filter(c => typeof c.id !== 'string')
        const results = []
        for (const commission of commissionsToSave) {
            const result = await PricesApi.updateCommission(commission)
            results.push(result.ok)
        }
        for (const id of deleted) {
            const result = await PricesApi.deleteCommission(id)
            results.push(result.ok)
        }
        const commissionsToAdd = editableCommisions.filter(c => typeof c.id === 'string')
        for (const commission of commissionsToAdd) {
            if (Object.values(commission).some(val => val === null)) {
                TakeAlert.fire({
                    type: 'warning',
                    title: t('complete-rest'),
                })
                return
            }
            const result = await PricesApi.addCommission(commission)
            results.push(result.ok)
        }
        if (results.every(s => s === true))
            TakeAlert.fire({
                type: 'success',
                title: t('saved-exclamation-mark'),
            })
        else
            TakeAlert.fire({
                type: 'error',
                title: t('error-during-saving'),
            })
        await getCommissionsAsync()
    }, [deleted, editableCommisions, getCommissionsAsync, t, touched])

    const deleteCommission = useCallback(
        id => {
            if (typeof id === 'number') {
                const newDeleted = new Set(deleted)
                newDeleted.add(id)
                setDeleted(newDeleted)
            } else {
                setEditableCommissions(draft => draft.filter(cr => cr.id !== id))
            }
        },
        [deleted, setEditableCommissions],
    )

    const addCommissionRate = useCallback(() => {
        const newCr = {
            value: null,
            to: null,
            from: null,
            id: `new-${editableCommisions.length + 1}`,
        }
        setEditableCommissions(draft => {
            draft.push(newCr)
        })
    }, [editableCommisions, setEditableCommissions])

    if (!commissions || !editableCommisions) return <LoadingIndicator />

    return (
        <Card>
            <Card.Header>
                <Card.Options>
                    <Button size="sm" color="success" onClick={addCommissionRate}>
                        {t('add')}
                    </Button>
                    {(touched.size > 0 || deleted.size > 0 || editableCommisions.length > commissions.length) && (
                        <>
                            <CardHeaderOptionsDivider className="mx-2" />
                            <PrimaryButton text={t('save')} onClick={saveChanges} />
                            <SecondaryButton text={t('cancel')} onClick={clearChanges} />
                        </>
                    )}
                </Card.Options>
            </Card.Header>
            <Card.Body>
                <Table highlightRowOnHover>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColHeader>{t('from')}</Table.ColHeader>
                            <Table.ColHeader>{t('to')}</Table.ColHeader>
                            <Table.ColHeader>{t('value')}</Table.ColHeader>
                            <Table.ColHeader>{t('actions')}</Table.ColHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {editableCommisions
                            .filter(c => !deleted.has(c.id))
                            .map((commissionRate, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <Table.Col>
                                            <FormElement
                                                type="number"
                                                value={commissionRate.from}
                                                onChange={val => updateCommissionRateField(commissionRate, 'from', val)}
                                            />
                                        </Table.Col>
                                        <Table.Col>
                                            <FormElement
                                                type="number"
                                                value={commissionRate.to}
                                                onChange={val => updateCommissionRateField(commissionRate, 'to', val)}
                                            />
                                        </Table.Col>
                                        <Table.Col>
                                            <FormElement
                                                type="number"
                                                value={commissionRate.value}
                                                onChange={val =>
                                                    updateCommissionRateField(commissionRate, 'value', val)
                                                }
                                            />
                                        </Table.Col>
                                        <Table.Col>
                                            <RemoveButton onClick={() =>
                                                    deleteCommission(
                                                        commissionRate.id ? commissionRate.id : commissionRate,
                                                    )
                                                }/>
                                            
                                        </Table.Col>
                                    </StyledTableRow>
                                )
                            })}
                    </Table.Body>
                </Table>
            </Card.Body>
        </Card>
    )
}

export default withCurrentShop(Commissions)

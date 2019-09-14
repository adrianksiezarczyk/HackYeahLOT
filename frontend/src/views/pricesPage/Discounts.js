import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react'
import { Card, Table, Icon, Dimmer } from 'tabler-react'
import PricesApi from '../../services/prices/api'
import get from 'lodash.get'
import { useTranslation } from 'react-i18next'
import Button, { EditButton } from '../../components/shared/Button'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import TakeAlert from '../../utils/takeAlert'
import Pagination from '../../components/shared/Pagination'
import useFilters from '../../components/hooks/useFilters'
import useSort from '../../components/hooks/useSort'
import { TableFilterHeader, TableSortHeader } from '../../components/shared/Table'
import { warningTakeAlert } from '../../components/shared/TakeAlert'

const DiscountModal = lazy(() => import('./discounts/DiscountModal'))

const Discounts = () => {
    const [loading, setLoading] = useState(false)
    const [isDiscountModalOpen, setDiscountModalOpen] = useState(false)
    const [selectedDiscount, setSelectedDiscount] = useState({})
    const [totalItems, setTotalItems] = useState(null)
    const [discounts, setDiscounts] = useState(null)
    const { filters, modifyFilters } = useFilters()
    const { sortColumnName, descending, modifySorting } = useSort()

    const toggleDiscountModal = useCallback(() => {
        setDiscountModalOpen(open => !open)
    }, [setDiscountModalOpen])

    const [t] = useTranslation('prices-page')

    const fetchData = useCallback(
        async (currentPage = 1, pageSize = 12) => {
            setLoading(true)

            const request = {
                name: get(['code']),
                sortColumnName: sortColumnName,
                sortOrder: descending ? 'desc' : 'asc',
                page: currentPage,
                pageSize,
                filters,
            }

            const { data, filteredItems } = await PricesApi.getDiscounts(request)
            setTotalItems(filteredItems)
            setDiscounts(data)
            setLoading(false)
        },
        [descending, filters, sortColumnName],
    )

    const onRemove = async id => {
        const response = await PricesApi.deleteDiscount(id)
        if (response.ok) {
            TakeAlert.fire({
                type: 'success',
                title: t('deleted'),
            }).finally(() => fetchData())
        }
    }
    const deleteDiscount = async id => {
        try {
            warningTakeAlert(t('are-you-sure-question-mark?'), '', t('delete'), () => onRemove(id))
        } catch (error) {
            console.error(error)
            TakeAlert.fire({
                type: 'error',
                title: t('error-during-deleting'),
            }).finally(() => fetchData())
        }
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])

    if (!discounts) return null
    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Options>
                        <Button size="sm" color="success" onClick={toggleDiscountModal}>
                            {t('add')}
                        </Button>
                    </Card.Options>
                </Card.Header>
                <Card.Body>
                    <Dimmer loader={loading} active={loading}>
                        <Table responsive highlightRowOnHover>
                            <TableFilterHeader filterColumns={[null, t('code')]} modifyFilters={modifyFilters} />
                            <TableSortHeader
                                sortColumns={[
                                    t('id'),
                                    t('code'),
                                    t('min-order-value'),
                                    t('duration'),
                                    t('discount-value'),
                                ]}
                                modifySorting={modifySorting}
                                sortColumnName={sortColumnName}
                                descending={descending}
                            />
                            <Table.Body>
                                {discounts.map(discount => {
                                    return (
                                        <Table.Row>
                                            <Table.Col>{discount.id}</Table.Col>
                                            <Table.Col>{discount.code}</Table.Col>
                                            <Table.Col>{discount.minOrderValue}</Table.Col>
                                            <Table.Col>
                                                {discount.startDate} - {discount.endDate}
                                            </Table.Col>
                                            <Table.Col>{discount.value}</Table.Col>
                                            <Table.Col>
                                                <div style={{ textAlign: 'right' }}>
                                                    <EditButton
                                                        text={t('manage')}
                                                        onClick={() => {
                                                            setSelectedDiscount(discount)
                                                            toggleDiscountModal()
                                                        }}
                                                    />
                                                    <Icon
                                                        link
                                                        className="ml-5"
                                                        size="sm"
                                                        name="trash-2"
                                                        onClick={() => {
                                                            deleteDiscount(discount.id)
                                                        }}
                                                    />
                                                </div>
                                            </Table.Col>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                        <Pagination totalItems={totalItems} onPageChange={fetchData} />
                    </Dimmer>
                </Card.Body>
            </Card>
            <Suspense fallback={<LoadingIndicator />}>
                <DiscountModal
                    discount={selectedDiscount}
                    isOpen={isDiscountModalOpen}
                    onCloseModal={() => {
                        fetchData()
                        setSelectedDiscount({})
                        toggleDiscountModal()
                    }}
                />
            </Suspense>
        </>
    )
}

export default Discounts

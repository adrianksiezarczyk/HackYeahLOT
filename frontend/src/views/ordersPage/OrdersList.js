import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { Card, Table, Page, Dimmer, Icon, Button, Grid, Form } from 'tabler-react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import OrderApi from '../../services/order/api'
import Pagination from '../../components/shared/Pagination'
import useFilters from '../../components/hooks/useFilters'
import useSort from '../../components/hooks/useSort'
import OrdersTableBody from './ordersList/OrdersTableBody'
import { TableFilterAccordionHeader, TableSortDropdownButton } from '../../components/shared/Table'
import ExportOrdersModal from './ordersList/ExportOrdersModal'
import useModal from '../../components/hooks/useModal'

const PageContent = styled(Page.Content)``
const StyledTable = styled(Table)`
    font-size: 12px !important;
    th {
        font-size: 12px !important;
        p {
            margin-bottom: 0 !important;
        }
    }
`

const columnsArr = [
    ['id_col', 'baseLinkerOrderId_col'],
    ['date_col', 'realizationDate_col'],
    ['aliExpressOrderNumbers_col'],
    ['customerEmail_col'],
    ['products_col'],
    ['price / received / profit_col'],
    ['status_col'],
    [''],
]
const filterColumns = ['id', 'baseLinkerOrderId', 'date', 'realizationDate', 'aliExpressOrderNumbers', 'customerEmail']
const sortColumns = ['id', 'baseLinkerOrderId', 'date', 'realizationDate', 'customerEmail']

const OrdersList = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState(null)
    const [statuses, setStatuses] = useState(null)

    const [totalItems, setTotalItems] = useState(null)
    const { filters, modifyFilters } = useFilters()
    const { sortColumnName, descending, modifySorting } = useSort()

    const [isAdvancedSearchOpen, openAdvancedSearch] = useState(false)

    const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal()

    const { t } = useTranslation('orders-page')

    const getOrders = useCallback(
        async (currentPage = 1, pageSize = 12) => {
            setLoading(true)
            const request = {
                filters,
                sortColumnName,
                sortOrder: descending ? 'desc' : 'asc',
                currentPage,
                pageSize,
            }

            try {
                const { data, totalItems } = await OrderApi.getOrders(request)
                setTotalItems(totalItems)
                setOrders(data)
            } catch (e) {}
            setLoading(false)
        },
        [descending, filters, sortColumnName],
    )

    const getStatuses = useCallback(async () => {
        const response = await OrderApi.getStatuses()
        setStatuses(response)
    }, [])

    useEffect(() => {
        getStatuses()
    }, [getStatuses])

    useEffect(() => {
        getOrders()
    }, [getOrders])

    if (!orders) return null
    return (
        <PageContent>
            <Card>
                <Card.Header>
                    <Card.Title>{t('Orders view')}</Card.Title>
                    <Card.Options>
                        <Button color="primary" size="sm" onClick={openModal}>
                            {t('export')}
                        </Button>
                    </Card.Options>
                </Card.Header>
                <Card.Body>
                    <Dimmer loader={loading} active={loading}>
                        <StyledTable responsive highlightRowOnHover>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColHeader colSpan={8}>
                                        <Button
                                            color="secondary"
                                            onClick={() => openAdvancedSearch(!isAdvancedSearchOpen)}>
                                            <Icon name="search" />
                                            <span> {t('Advanced search')}</span>
                                        </Button>
                                        <TableSortDropdownButton
                                            sortColumns={sortColumns}
                                            modifySorting={modifySorting}
                                            descending={descending}
                                            sortColumnName={sortColumnName}
                                            t={t}
                                        />
                                    </Table.ColHeader>
                                </Table.Row>
                                <TableFilterAccordionHeader
                                    isOpen={isAdvancedSearchOpen}
                                    filterColumns={filterColumns}
                                    modifyFilters={modifyFilters}
                                    t={t}>
                                    <Fragment>
                                        <Grid.Col md={4}>
                                            <Form.Group>
                                                <Form.InputGroup>
                                                    <Form.Label>{t('status')}</Form.Label>
                                                    <Form.Select
                                                        onChange={e => {
                                                            modifyFilters('status', e.target.value)
                                                        }}>
                                                        <option value="" selected>
                                                            --
                                                        </option>
                                                        {statuses &&
                                                            statuses.map(status => {
                                                                return (
                                                                    <option key={status.id} value={status.staticName}>
                                                                        {status.name}
                                                                    </option>
                                                                )
                                                            })}
                                                    </Form.Select>
                                                </Form.InputGroup>
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col md={2} />
                                    </Fragment>
                                </TableFilterAccordionHeader>
                                <Table.Row>
                                    {columnsArr.map(columnArr => {
                                        return (
                                            <th key={columnArr[0]} name={columnArr[0]}>
                                                {columnArr.map((column, index) => {
                                                    if (index > 0) return <p key={column}>({t(column)})</p>
                                                    return <p key={column}>{t(column)}</p>
                                                })}
                                            </th>
                                        )
                                    })}
                                </Table.Row>
                            </Table.Header>
                            <OrdersTableBody orders={orders} t={t} />
                        </StyledTable>
                    </Dimmer>
                    <Pagination totalItems={totalItems} onPageChange={getOrders} />
                </Card.Body>
            </Card>
            <ExportOrdersModal isOpen={isModalOpen} onCloseModal={closeModal} t={t} />
        </PageContent>
    )
}

export default OrdersList

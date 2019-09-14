import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react'
import { Card, Table, Icon, Page, Dimmer, Form } from 'tabler-react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/shared/Button'
import withCurrentShop from '../../components/HOCs/withCurrentShop'
import CategoryApi from '../../services/category/api'
import styled from 'styled-components'
import Breadcrumbs from './Breadcrumbs'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import TakeAlert from '../../utils/takeAlert'
import Pagination from '../../components/shared/Pagination'
import useImmerState from '../../hooks/useImmerState'
import useFilters from '../../components/hooks/useFilters'
import useSort from '../../components/hooks/useSort'
import { TableSortHeader, TableFilterHeader } from '../../components/shared/Table'
import { warningTakeAlert } from '../../components/shared/TakeAlert'

const CategoryModal = lazy(() => import('./CategoryModal'))

const StyledTableCol = styled(Table.Col)`
    position: relative;
    cursor: pointer;
`
const StyledIcon = styled(Icon)`
    color: ${props => props.color};
`
const Cell = styled.div`
    ${props =>
        !props.disabled &&
        `   ::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
    }`}
`

const Categories = ({ currentShop }) => {
    const [loading, setLoading] = useState(false)
    const [selectedParent, setSelectedParent] = useState({ id: null, hierarchy: '', name: '' })
    const [isEditMode, setEditMode] = useState(false)

    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({})

    const [totalItems, setTotalItems] = useState(null)
    const [categories, setCategories] = useImmerState(null)
    const { filters, modifyFilters } = useFilters()
    const { sortColumnName, descending, modifySorting } = useSort()
    const [categoriesOrder, setCategoriesOrder] = useState({})

    const toggleCategoryModal = useCallback(() => {
        setCategoryModalOpen(open => !open)
    }, [setCategoryModalOpen])

    const [t] = useTranslation('prices-page')
    const fetchData = useCallback(
        async (currentPage = 1, pageSize = 12) => {
            setLoading(true)

            const request = {
                filters,
                parentId: selectedParent.id,
                sortColumnName,
                sortOrder: descending ? 'desc' : 'asc',
                currentPage,
                pageSize,
            }

            const { data, filteredItems } = await CategoryApi.getShopCategoriesPaginated(request)
            setTotalItems(filteredItems)
            setCategories(() => data)

            setLoading(false)
        },
        [descending, filters, selectedParent.id, setCategories, sortColumnName],
    )

    const onRemove = async id => {
        const response = await CategoryApi.deleteShopCategory(id)
        if (response.ok) {
            TakeAlert.fire({
                type: 'success',
                title: t('deleted'),
            }).finally(() => fetchData())
        }
    }
    const deleteCategory = async id => {
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

    const saveCategoriesOrder = async () => {
        const model = {
            categoriesOrders: Object.entries(categoriesOrder).map(([key, value]) => {
                return { id: key, order: value }
            }),
        }
        try {
            await CategoryApi.updateCategoriesOrder(model)
            setCategories(draft => {
                model.categoriesOrders.forEach(categoryOrder => {
                    // eslint-disable-next-line eqeqeq
                    const cat = draft.find(category => category.id == categoryOrder.id)
                    if (cat) cat.order = categoryOrder.order
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])
    if (!categories) return <LoadingIndicator />
    return (
        <Page.Content>
            <Breadcrumbs currentCategory={selectedParent} setCurrentCategory={setSelectedParent} />
            <Card>
                <Card.Header>
                    <Card.Title>{selectedParent.name}</Card.Title>
                    <Card.Options>
                        {isEditMode ? (
                            <>
                                <Button
                                    size="sm"
                                    color="primary"
                                    className="mr-2"
                                    onClick={() => {
                                        saveCategoriesOrder()
                                        setEditMode(false)
                                    }}>
                                    {t('save')}
                                </Button>
                                <Button
                                    size="sm"
                                    color="secondary"
                                    className="mr-2"
                                    onClick={() => {
                                        setEditMode(false)
                                    }}>
                                    {t('cancel')}
                                </Button>
                            </>
                        ) : (
                            <Button
                                size="sm"
                                color="primary"
                                className="mr-2"
                                onClick={() => {
                                    setEditMode(true)
                                }}>
                                {t('edit order')}
                            </Button>
                        )}
                        <Button size="sm" color="success" onClick={toggleCategoryModal}>
                            {t('add')}
                        </Button>
                    </Card.Options>
                </Card.Header>
                <Card.Body>
                    <Dimmer loader={loading} active={loading}>
                        <Table responsive highlightRowOnHover>
                            <TableFilterHeader filterColumns={['id', 'name']} modifyFilters={modifyFilters} />
                            <TableSortHeader
                                sortColumns={['id', 'name', 'order']}
                                modifySorting={modifySorting}
                                sortColumnName={sortColumnName}
                                descending={descending}
                            />
                            <Table.Body>
                                {categories.map(category => {
                                    const onRowClick = () => {
                                        if (!category.hasChildren) return
                                        setSelectedParent({
                                            id: category.id,
                                            hierarchy: category.hierarchy,
                                            name: category.name,
                                        })
                                    }

                                    return (
                                        <Table.Row>
                                            <StyledTableCol>
                                                <Cell onClick={onRowClick}>{category.id}</Cell>
                                            </StyledTableCol>
                                            <StyledTableCol onClick={onRowClick}>
                                                <Cell onClick={onRowClick}>{category.name}</Cell>
                                            </StyledTableCol>
                                            <StyledTableCol onClick={onRowClick}>
                                                <Cell
                                                    disabled={isEditMode}
                                                    onClick={() => {
                                                        if (isEditMode) return
                                                        onRowClick()
                                                    }}>
                                                    {isEditMode ? (
                                                        <Form.Input
                                                            value={categoriesOrder[category.id] || category.order}
                                                            onChange={e => {
                                                                const _categoriesOrder = Object.assign(
                                                                    {},
                                                                    categoriesOrder,
                                                                )
                                                                _categoriesOrder[category.id] = e.target.value
                                                                setCategoriesOrder(_categoriesOrder)
                                                            }}
                                                        />
                                                    ) : (
                                                        category.order
                                                    )}
                                                </Cell>
                                            </StyledTableCol>
                                            <Table.Col>
                                                <div style={{ textAlign: 'right' }}>
                                                    {category.hidden && (
                                                        <StyledIcon
                                                            className="mr-5"
                                                            color="var(--danger)"
                                                            name="eye-off"
                                                        />
                                                    )}
                                                    <Icon
                                                        link
                                                        className="mr-5"
                                                        size="sm"
                                                        name="plus"
                                                        onClick={() => {
                                                            setSelectedParent({
                                                                id: category.id,
                                                                hierarchy: category.hierarchy,
                                                                name: category.name,
                                                            })
                                                            toggleCategoryModal()
                                                        }}
                                                    />
                                                    <Button
                                                        size="sm"
                                                        color="secondary"
                                                        onClick={e => {
                                                            e.stopPropagation()
                                                            setSelectedCategory(category)
                                                            toggleCategoryModal()
                                                        }}>
                                                        {t('manage')}
                                                    </Button>
                                                    <Icon
                                                        link
                                                        className="ml-5"
                                                        size="sm"
                                                        name="trash-2"
                                                        onClick={() => {
                                                            deleteCategory(category.id)
                                                        }}
                                                    />
                                                </div>
                                            </Table.Col>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    </Dimmer>
                    <Pagination totalItems={totalItems} onPageChange={fetchData} />
                </Card.Body>
            </Card>
            <Suspense fallback={<LoadingIndicator />}>
                {isCategoryModalOpen && (
                    <CategoryModal
                        parentCategory={selectedParent}
                        category={selectedCategory}
                        isOpen={isCategoryModalOpen}
                        onCloseModal={() => {
                            fetchData()
                            setSelectedCategory({})
                            toggleCategoryModal()
                        }}
                    />
                )}
            </Suspense>
        </Page.Content>
    )
}
export default withCurrentShop(Categories)

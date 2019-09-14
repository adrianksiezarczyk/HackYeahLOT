import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Card, Grid, Icon, Text, Dimmer } from 'tabler-react'
import CategoryTree from '../../components/CategoryTree'
import withCurrentShop from '../../components/HOCs/withCurrentShop'
import ProductCard from '../../components/product/ProductCard.new'
import Products from '../../components/product/Products'
import Button from '../../components/shared/Button'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import Pagination from '../../components/shared/Pagination'
import CategoryApi from '../../services/category/api'
import ProductApi from '../../services/product/api'
import SearchDropdown, { SearchDropdownOption } from '../../components/shared/SearchDropdown'
import useModal from '../../components/hooks/useModal'
import { warningTakeAlert } from '../../components/shared/TakeAlert'
import { AFFILIATE_LINK } from '../../constants'
import NoProductsInfoRow from '../../components/product/NoProductsInfo'
import { Link } from 'react-router-dom'
import { DETAILS_REQUEST_TYPES } from './manageProducts/EditProductModal'

const CategoryTreeWrapper = styled(Grid.Col)``

const SearchButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`
const GroupEditButtonWrapper = styled(Grid.Row)`
    min-height: 2em;
    text-align: right;
    margin-bottom: 1.5rem;
    align-items: center;
`

const EyeButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    cursor: pointer;
    color: #9aa0ac;
    :hover {
        color: #717171;
    }
`

const EditProductModal = lazy(() => import('./manageProducts/EditProductModal'))
const GroupEditModal = lazy(() => import('./manageProducts/GroupEditModal'))

const ShopProducts = ({ currentShop }) => {
    const [categoriesShop, setCategoriesShop] = useState(null)
    const [expandedCategory, setExpandedCategory] = useState({ id: null, hasChildren: true })
    const [editList, setEditList] = useState(new Set())

    const [t] = useTranslation('products-page')

    const { isOpen: isGroupModalOpen, open: openGroupModal, close: closeGroupModal } = useModal()
    const {
        isOpen: isEditModalOpen,
        open: openEditModal,
        close: closeEditModal,
        modalProps: selectedProduct,
    } = useModal()

    const expandCategory = category =>
        typeof category === 'object'
            ? setExpandedCategory(category)
            : setExpandedCategory(categoriesShop.find(c => c.id === category))

    const clearCategory = () => setExpandedCategory({ id: null, hasChildren: true })

    useEffect(() => clearCategory(), [currentShop.id])

    useEffect(() => {
        const getCategoriesAsync = async () => {
            try {
                const data = await CategoryApi.getShopCategories(null)
                setCategoriesShop(data)
            } catch (error) {
                console.error(error)
                setCategoriesShop([])
            }
        }
        getCategoriesAsync()
    }, [currentShop.id])

    const deleteProducts = useCallback(
        async getCurrentProducts => {
            const model = {
                ids: Array.from(editList),
                deleted: true,
            }
            await warningTakeAlert(
                '',
                `${t('Do you want to remove')} ${editList.size} ${t('products_genitive')}?`,
                t('Yes'),
                async () => {
                    try {
                        await ProductApi.updateMany(model)
                        setEditList(new Set([]))
                        getCurrentProducts()
                    } catch (e) {}
                },
            )
        },
        [editList, t],
    )

    if (!categoriesShop) return <LoadingIndicator />
    return (
        <Products categoryId={expandedCategory.id} getProducts={ProductApi.getShopProducts} noLoaders>
            {({ products, totalItems, setPage, setFilter, getCurrentProducts, isLoading, setPageSize }) => (
                <>
                    <SearchButtonWrapper>
                        <SearchDropdown>
                            <SearchDropdownOption
                                placeholder={t('ID in shop')}
                                onChange={e => {
                                    setFilter('productId', e.target.value)
                                }}
                            />
                            <SearchDropdownOption
                                placeholder={t('Aliexpress ID')}
                                onChange={e => {
                                    setFilter('aliExpressProductId', e.target.value)
                                }}
                            />
                        </SearchDropdown>
                    </SearchButtonWrapper>

                    <GroupEditButtonWrapper>
                        <Grid.Col>
                            {editList.size > 0 && (
                                <>
                                    <Button
                                        size="sm"
                                        color="danger"
                                        icon="trash-2"
                                        onClick={() => {
                                            deleteProducts(getCurrentProducts)
                                        }}>
                                        {t('delete')} {editList.size}
                                    </Button>
                                    <Button className="ml-2" size="sm" color="primary" onClick={() => openGroupModal()}>
                                        {t('group-edit')}
                                    </Button>
                                </>
                            )}
                        </Grid.Col>
                    </GroupEditButtonWrapper>
                    <Dimmer loader active={isLoading}>
                        <Grid.Row>
                            <CategoryTreeWrapper md={3}>
                                <Card>
                                    <CategoryTree
                                        async
                                        expandedCategory={expandedCategory}
                                        expandCategory={expandCategory}
                                        getChildren={CategoryApi.getShopCategories}
                                        clearCategory={clearCategory}
                                        isShopCategory
                                        noItemsComponent={
                                            <>
                                                {t('no-categories-question-mark')}{' '}
                                                <Link to="/categories">
                                                    <b>{t('add')}</b>
                                                </Link>
                                            </>
                                        }
                                    />
                                </Card>
                            </CategoryTreeWrapper>

                            <Grid.Col>
                                <>
                                    <Grid.Row>
                                        <>
                                            {products &&
                                                products.map(product => {
                                                    return (
                                                        <Grid.Col key={product.id} md={3}>
                                                            <ProductCard
                                                                clickable
                                                                onClick={id => {
                                                                    const newSet = new Set(editList)
                                                                    if (newSet.has(id)) newSet.delete(id)
                                                                    else newSet.add(id)
                                                                    setEditList(newSet)
                                                                }}
                                                                showCorner={true}
                                                                cornerActive={editList.has(product.id)}
                                                                cornerIcon="edit"
                                                                hideRating
                                                                hideOrders
                                                                footer={() => (
                                                                    <>
                                                                        <Button
                                                                            block
                                                                            color="info"
                                                                            onClick={() => openEditModal(product)}>
                                                                            <Text size="small">
                                                                                <Icon prefix="fe" name="edit" />
                                                                                {t('edit')}
                                                                            </Text>
                                                                        </Button>
                                                                        <EyeButton
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            href={`//${currentShop.domain}/${product.id}${AFFILIATE_LINK}`}>
                                                                            <Icon name="eye" />
                                                                        </EyeButton>
                                                                    </>
                                                                )}
                                                                {...product}
                                                            />
                                                        </Grid.Col>
                                                    )
                                                })}
                                        </>
                                    </Grid.Row>
                                    {products && !products.length && <NoProductsInfoRow />}
                                    {products && products.length > 0 && (
                                        <Pagination
                                            totalItems={totalItems}
                                            onPageChange={(page = 1, pageSize = 12) => {
                                                setPage(page)
                                                setPageSize(pageSize)
                                            }}
                                        />
                                    )}
                                </>
                            </Grid.Col>
                        </Grid.Row>
                    </Dimmer>
                    <Suspense fallback={<LoadingIndicator />}>
                        <EditProductModal
                            isImportList={false}
                            size="lg"
                            isOpen={isEditModalOpen}
                            onCloseModal={closeEditModal}
                            productId={selectedProduct ? selectedProduct.id : null}
                            requestType={DETAILS_REQUEST_TYPES.SHOP_PRODUCT}
                        />
                        <GroupEditModal
                            size="lg"
                            isOpen={isGroupModalOpen}
                            onCloseModal={closeGroupModal}
                            productIds={editList}
                        />
                    </Suspense>
                </>
            )}
        </Products>
    )
}

export default withCurrentShop(ShopProducts)

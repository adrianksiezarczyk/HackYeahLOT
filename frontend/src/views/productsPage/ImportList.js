import React, { lazy, Suspense, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Grid, Icon, Text, Dimmer } from 'tabler-react'
import withCurrentShop from '../../components/HOCs/withCurrentShop'
import ProductCard from '../../components/product/ProductCard.new'
import Products from '../../components/product/Products'
import Button from '../../components/shared/Button'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import Pagination from '../../components/shared/Pagination'
import ProductApi from '../../services/product/api'
import TakeAlert from '../../utils/takeAlert'
import { warningTakeAlert } from '../../components/shared/TakeAlert'
import useModal from '../../components/hooks/useModal'
import SearchDropdown, { SearchDropdownOption } from '../../components/shared/SearchDropdown'
import NoProductsInfoRow from '../../components/product/NoProductsInfo'
import { DETAILS_REQUEST_TYPES } from './manageProducts/EditProductModal'

const SearchButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
`

const EditProductModal = lazy(() => import('./manageProducts/EditProductModal'))
const GroupEditModal = lazy(() => import('./manageProducts/GroupEditModal'))

const GroupEditButtonWrapper = styled(Grid.Row)`
    min-height: 2em;
    text-align: right;
    margin-bottom: 1.5rem;
    align-items: center;
`

const ImportList = () => {
    const [editList, setEditList] = useState(new Set([]))

    const [t] = useTranslation('products-page')

    const { isOpen: isGroupModalOpen, open: openGroupModal, close: closeGroupModal } = useModal()
    const {
        isOpen: isEditModalOpen,
        open: openEditModal,
        close: closeEditModal,
        modalProps: selectedProduct,
    } = useModal()

    const deleteProducts = useCallback(
        async refreshProductList => {
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
                        await refreshProductList()
                    } catch (e) {}
                },
            )
        },
        [editList, t],
    )

    const addProductToShop = useCallback(
        async refreshProductList => {
            const model = {
                productsIds: Array.from(editList),
            }
            await warningTakeAlert(
                '',
                `${t('Do you want to add')} ${editList.size} ${t('products to shop')}?`,
                t('Yes'),
                async () => {
                    try {
                        await ProductApi.addProductsToShop(model)
                        setEditList(new Set([]))
                        await refreshProductList()
                        await TakeAlert.fire({
                            type: 'success',
                            text: t('Product added to shop'),
                        })
                    } catch (e) {}
                },
            )
        },
        [editList, t],
    )
    const forceUpdate = useCallback(async () => {
        const productsIds = Array.from(editList)
        console.log(editList, 'SD', productsIds)
        try {
            await ProductApi.addProductsToUpdate(productsIds)
            await TakeAlert.fire({
                type: 'success',
                text: t('Product added to update queue'),
            })
        } catch (e) {
            console.log(e)
            await TakeAlert.fire({
                type: 'error',
                text: e,
            })
        }
    }, [editList, t])

    const addEditedProductToShop = async (productId, refreshProductList) => {
        await warningTakeAlert('', t('Do you want to add this product to your shop'), t('Yes'), async () => {
            try {
                await ProductApi.addProductsToShop({ productsIds: [productId] })
                setEditList(new Set([]))
                await refreshProductList()
                await TakeAlert.fire({
                    type: 'success',
                    text: t('Product added to shop'),
                })
            } catch (e) {}
        })
        closeEditModal()
    }

    return (
        <>
            <Products getProducts={ProductApi.getImportList}>
                {({ products, setPageSize, setPage, setFilter, getCurrentProducts, isLoading, totalItems }) => (
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
                                            className="ml-2"
                                            size="sm"
                                            color="primary"
                                            onClick={() => forceUpdate()}>
                                            {t('force-update')}
                                        </Button>
                                        <Button
                                            className="ml-2"
                                            size="sm"
                                            color="success"
                                            onClick={() => addProductToShop(getCurrentProducts)}>
                                            {t('add-to-shop')}
                                        </Button>
                                        <Button
                                            className="ml-2"
                                            size="sm"
                                            color="danger"
                                            icon="trash-2"
                                            onClick={() => deleteProducts(getCurrentProducts)}>
                                            {t('delete')} {editList.size}
                                        </Button>
                                        <Button
                                            className="ml-2"
                                            size="sm"
                                            color="primary"
                                            onClick={() => openGroupModal()}>
                                            {t('group-edit')}
                                        </Button>
                                    </>
                                )}
                            </Grid.Col>
                        </GroupEditButtonWrapper>
                        <Dimmer loader active={isLoading}>
                            <Grid.Row>
                                {products &&
                                    products.map(product => (
                                        <Grid.Col key={product.id} md={3}>
                                            <ProductCard
                                                {...product}
                                                clickable
                                                onClick={id => {
                                                    const newSet = new Set(editList)
                                                    if (newSet.has(id)) newSet.delete(id)
                                                    else newSet.add(id)
                                                    setEditList(newSet)
                                                }}
                                                showCorner
                                                cornerIcon="edit"
                                                cornerActive={editList.has(product.id)}
                                                hideRating
                                                hideOrders
                                                footer={id => (
                                                    <Button block color="info" onClick={() => openEditModal(product)}>
                                                        <Text size="small">
                                                            <Icon prefix="fe" name="edit" /> {t('edit')}
                                                        </Text>
                                                    </Button>
                                                )}
                                            />
                                        </Grid.Col>
                                    ))}
                            </Grid.Row>
                        </Dimmer>
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
                        <Suspense fallback={<LoadingIndicator />}>
                            <EditProductModal
                                isImportList
                                size="lg"
                                isOpen={isEditModalOpen}
                                onCloseModal={closeEditModal}
                                productId={selectedProduct ? selectedProduct.id : null}
                                addProductToShop={productId => addEditedProductToShop(productId, getCurrentProducts)}
                                requestType={DETAILS_REQUEST_TYPES.IMPORT_PRODUCT}
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
        </>
    )
}

export default withCurrentShop(ImportList)

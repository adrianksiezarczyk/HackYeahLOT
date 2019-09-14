import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Table, Card, Dimmer } from 'tabler-react'
import { StyledCard, StyledTable, ButtonsContainer } from './components'
import { getShopDomain } from '../../../utils/settings'
import LoadingIndicator from '../../../components/shared/LoadingIndicator'
import useModal from '../../../components/hooks/useModal'
import { EditButton, RemoveButton } from '../../../components/shared/Button'
import useImmerState from '../../../hooks/useImmerState'
import styled from 'styled-components'
import { warningTakeAlert } from '../../../components/shared/TakeAlert'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'
import OrderApi from '../../../services/order/api'
import { AFFILIATE_LINK } from '../../../constants'

const EditProductModal = lazy(() => import('./orderProducts/EditProductModal'))

const ProductVariant = styled.p`
    margin-bottom: 0 !important;
`

const OrderProducts = ({ orderProducts, refreshOrderDetails, orderId, t }) => {
    const [isLoading, setLoading] = useState(false)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [products, setProducts] = useImmerState(() => orderProducts)
    const { isOpen: isModalOpen, open: openModal, close: closeModal, modalProps } = useModal()

    useEffect(() => {
        setProducts(() => orderProducts)
    }, [orderProducts, setProducts])

    const addProduct = () => {
        openModal({ product: { name: '', photo: {}, price: 0, variants: [] }, addProductMode: true })
    }

    const onRemove = async orderProductId => {
        setLoading(true)
        try {
            await OrderApi.removeOrderProduct(orderProductId)
            refreshOrderDetails()
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }
    const remove = orderProductId =>
        warningTakeAlert(t('are you sure?'), t('remove product'), t('remove'), () => onRemove(orderProductId))

    if (!products) return null
    return (
        <StyledCard
            isCollapsible
            title={t('order items')}
            options={
                <ButtonsContainer>
                    <EditButton text={t('add')} onClick={addProduct} />
                </ButtonsContainer>
            }>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <StyledTable responsive>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColHeader>{t('photo')}</Table.ColHeader>
                                <Table.ColHeader>{t('id')}</Table.ColHeader>
                                <Table.ColHeader>{t('aliExpressId')}</Table.ColHeader>
                                <Table.ColHeader>{t('name')}</Table.ColHeader>
                                <Table.ColHeader>{t('combination')}</Table.ColHeader>
                                <Table.ColHeader>{t('quantity')}</Table.ColHeader>
                                <Table.ColHeader>{t('price')}</Table.ColHeader>
                                <Table.ColHeader />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {products.map((product, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Col>
                                            <img src={product.photo.thumbnailUrl_50px} alt="" />
                                        </Table.Col>
                                        <Table.Col>
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={`//${getShopDomain()}/${product.id}`}>
                                                {product.id}
                                            </a>
                                        </Table.Col>
                                        <Table.Col>
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={`//aliexpress.com/item/${product.aliExpressId}/${product.aliExpressId}.html${AFFILIATE_LINK}`}>
                                                {product.aliExpressId}
                                            </a>
                                        </Table.Col>
                                        <Table.Col>{product.name}</Table.Col>
                                        <Table.Col>
                                            {product.variants.map(v => {
                                                return (
                                                    <ProductVariant key={v.displayName}>
                                                        {v.displayName}: {v.displayValue}
                                                    </ProductVariant>
                                                )
                                            })}
                                        </Table.Col>
                                        <Table.Col>{product.quantity}</Table.Col>
                                        <Table.Col>{product.price} PLN</Table.Col>
                                        <Table.Col>
                                            <EditButton text={t('edit')} onClick={() => openModal({ product })} />
                                            <RemoveButton onClick={() => remove(product.orderProductId)} />
                                        </Table.Col>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </StyledTable>
                </Dimmer>
            </Card.Body>
            <Suspense fallback={<LoadingIndicator />}>
                <EditProductModal
                    isOpen={isModalOpen}
                    onCloseModal={closeModal}
                    orderProduct={modalProps && modalProps.product}
                    addProductMode={modalProps && modalProps.addProductMode}
                    refreshOrderDetails={refreshOrderDetails}
                    orderId={orderId}
                    t={t}
                />
            </Suspense>
        </StyledCard>
    )
}

export default OrderProducts

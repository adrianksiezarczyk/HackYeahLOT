import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon, Table, Form, Dimmer } from 'tabler-react'
import BaseModal from '../../../../components/shared/BaseModal'
import Button, { RemoveButton } from '../../../../components/shared/Button'
import { getPhotoUrl } from '../../../../utils/helpers/images'
import useImmerState from '../../../../hooks/useImmerState'
import CardStatusAlert, { useAlert } from '../../../../components/shared/Alert'
import OrderApi from '../../../../services/order/api'
import AddProductBasicInfo from './AddProductPartModal'

const StyledBaseModal = styled(BaseModal)`
    @media (min-width: 1280px) {
        max-width: 1200px !important;
    }
`
const StyledTableColHeader = styled(Table.ColHeader)`
    ${props => props.width && `width: ${props.width}px;`}
`
const KeyValueRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 15px;
`
const Image = styled.div`
    max-width: 150px;
    img {
        object-fit: contain;
    }
`
const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`

const EditProductModal = ({ isOpen, onCloseModal, orderProduct, refreshOrderDetails, addProductMode, orderId, t }) => {
    const [isLoading, setLoading] = useState(false)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [product, setProduct] = useImmerState(() => orderProduct)

    useEffect(() => {
        setProduct(() => orderProduct)
    }, [orderProduct, setProduct])

    const closeModal = () => {
        setNoStatus()
        onCloseModal()
    }
    const addVariant = () => {
        setProduct(draft => {
            draft.variants.push({
                displayName: '',
                displayValue: '',
                imageUrl: '',
                originalName: '',
                originalValue: '',
            })
        })
    }
    const removeVariant = index => {
        setProduct(draft => {
            draft.variants = product.variants.filter((v, i) => i !== index)
        })
    }
    const updateVariant = (index, key, value) => {
        setProduct(draft => {
            draft.variants[index][key] = value
        })
    }

    const updateProductToAdd = (key, value) => {
        setProduct(draft => {
            draft[key] = value
        })
    }

    const save = async () => {
        setLoading(true)
        try {
            if (addProductMode) await OrderApi.addOrderProduct(orderId, product)
            else await OrderApi.updateOrderProduct(product.orderProductId, { variants: product.variants })
            setSuccessStatus()
            refreshOrderDetails()
        } catch (e) {
            console.error(e.json.message)
            setFailureStatus()
        }
        setLoading(false)
    }

    if (!isOpen || !product) return null
    return (
        <StyledBaseModal
            size="lg"
            isOpen={isOpen}
            onCloseModal={closeModal}
            title={
                addProductMode
                    ? t('adding new product')
                    : t('order product edition') + '  (' + t('product id') + ': ' + product.id + ')'
            }
            actions={<Icon link name="x" onClick={closeModal} />}
            footer={
                <>
                    <Button className="mr-2" color="primary" size="sm" onClick={save}>
                        {t('save')}
                    </Button>
                    <Button color="secondary" size="sm" onClick={closeModal}>
                        {t('cancel')}
                    </Button>
                </>
            }>
            <CardStatusAlert status={status} onHide={setNoStatus} autoCanelDisabled />
            <Dimmer loader active={isLoading}>
                {addProductMode && <AddProductBasicInfo product={product} updateProduct={updateProductToAdd} t={t} />}
                <Table hasOutline>
                    <Table.Header>
                        <Table.Row>
                            <StyledTableColHeader width={50}>Lp.</StyledTableColHeader>
                            <StyledTableColHeader width={350}>{t('name')}</StyledTableColHeader>
                            <StyledTableColHeader width={350}>{t('value')}</StyledTableColHeader>
                            <StyledTableColHeader>{t('photo')}</StyledTableColHeader>
                            <StyledTableColHeader />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {product.variants.map((variant, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Col>{index + 1}</Table.Col>
                                    <Table.Col>
                                        <KeyValueRow>
                                            <div>{t('displayed')}</div>
                                            <div>
                                                <Form.Input
                                                    value={variant.displayName}
                                                    onChange={e => {
                                                        updateVariant(index, 'displayName', e.target.value)
                                                    }}
                                                />
                                            </div>
                                        </KeyValueRow>
                                        <KeyValueRow>
                                            <div>{t('aliExpress')}</div>
                                            <div>
                                                <Form.Input
                                                    value={variant.originalName}
                                                    onChange={e => {
                                                        updateVariant(index, 'originalName', e.target.value)
                                                    }}
                                                />
                                            </div>
                                        </KeyValueRow>
                                    </Table.Col>
                                    <Table.Col>
                                        <KeyValueRow>
                                            <div>{t('displayed')}</div>
                                            <div>
                                                <Form.Input
                                                    value={variant.displayValue}
                                                    onChange={e => {
                                                        updateVariant(index, 'displayValue', e.target.value)
                                                    }}
                                                />
                                            </div>
                                        </KeyValueRow>
                                        <KeyValueRow>
                                            <div>{t('aliExpress')}</div>
                                            <div>
                                                <Form.Input
                                                    value={variant.originalValue}
                                                    onChange={e => {
                                                        updateVariant(index, 'originalValue', e.target.value)
                                                    }}
                                                />
                                            </div>
                                        </KeyValueRow>
                                    </Table.Col>
                                    <Table.Col>
                                        <Form.Input
                                            value={variant.imageUrl}
                                            onChange={e => {
                                                updateVariant(index, 'imageUrl', e.target.value)
                                            }}
                                        />
                                        <Image>
                                            <img src={getPhotoUrl({ photo: variant.imageUrl })} alt="" />
                                        </Image>
                                    </Table.Col>
                                    <Table.Col>
                                        <RemoveButton onClick={() => removeVariant(index)} />
                                    </Table.Col>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
                <Buttons>
                    <Button color="success" size="sm" style={{ float: 'right' }} onClick={addVariant}>
                        {t('add')}
                    </Button>
                </Buttons>
            </Dimmer>
        </StyledBaseModal>
    )
}

export default EditProductModal

import React from 'react'
import { Grid, Form } from 'tabler-react'
import styled from 'styled-components'

const StyledFormInput = styled(Form.Input)`
    ${props => props.width && `width:${props.width}px!important;`}
`
const InputWithCurrency = styled(StyledFormInput)`
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="38"><text y="24" x="110" style="font: 16px Arial">PLN</text></svg>')
        no-repeat;
    padding-right: 40px !important;
`
const StyledFormInputGroup = styled(Form.InputGroup)`
    justify-content: space-between;
    align-items: center !important;
`

const AddProductBasicInfo = ({ product, updateProduct, t }) => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Col md={4}>
                    <Form>
                        <Form.Group>
                            <StyledFormInputGroup>
                                <div>
                                    <Form.Label>{t('product id')}</Form.Label>
                                    <StyledFormInput
                                        value={product.id}
                                        onChange={e => {
                                            updateProduct('productId', e.target.value)
                                        }}
                                        type="number"
                                        width="150"
                                    />
                                </div>
                                <div>
                                    <Form.Label>{t('quantity')}</Form.Label>
                                    <StyledFormInput
                                        value={product.quantity}
                                        onChange={e => {
                                            updateProduct('quantity', e.target.value)
                                        }}
                                        type="number"
                                        width="50"
                                    />
                                </div>
                                <div>
                                    <Form.Label>{t('price')}</Form.Label>
                                    <InputWithCurrency
                                        value={product.price}
                                        onChange={e => {
                                            updateProduct('price', e.target.value)
                                        }}
                                        width="150"
                                    />
                                </div>
                                {/* <div>
                                    <Form.Label>{t('aliExpressId')}</Form.Label>
                                    <StyledFormInput
                                        value={product.aliExpressId}
                                        onChange={e => {
                                            updateProduct('aliExpressId', e.target.value)
                                        }}
                                        type="number"
                                        width="150"
                                    />
                                </div> */}
                            </StyledFormInputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('name')}</Form.Label>
                            <StyledFormInput
                                value={product.name}
                                onChange={e => {
                                    updateProduct('name', e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Grid.Col>
            </Grid.Row>
        </Grid>
    )
}

export default AddProductBasicInfo

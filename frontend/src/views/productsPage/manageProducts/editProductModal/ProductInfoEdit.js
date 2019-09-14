import React from 'react'
import Select from 'react-select'
import { Container, Grid } from 'tabler-react'
import LoadingIndicator from '../../../../components/shared/LoadingIndicator'
import { getOfferLink, getShopLink } from '../../../../utils/helpers/aliLinks'
import FormElement from '../../../../components/form/FormElement'
import { useTranslation } from 'react-i18next'
import { AFFILIATE_LINK } from '../../../../constants'
import { getPhotoUrl } from '../../../../utils/helpers/images'

const ProductInfoEdit = ({
    productPhoto,
    productName,
    aliExpressOfferId,
    aliExpressShopId,
    selectedLanguage,
    setSelectedLanguage,
    langs,
    setProductInfo,
    setTouched,
}) => {
    const [t] = useTranslation('products-page')

    if (!langs) return <LoadingIndicator />

    return (
        <Container>
            <Grid.Row>
                <Grid.Col width={3}>
                    <img src={getPhotoUrl({ photo: productPhoto })} alt={productName} />
                </Grid.Col>
                <Grid.Col>
                    <div className="form-group">
                        <label>{t('language')}</label>
                        <Select
                            options={langs}
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            defaultValue={langs.find(lang => lang.id === selectedLanguage)}
                            onChange={({ id }) => setSelectedLanguage(id)}
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('product-name')}</label>
                        <FormElement
                            value={productName}
                            onChange={val => {
                                setProductInfo(draft => {
                                    draft.productName = val
                                })
                                setTouched(draft => {
                                    draft.isProductNameTouched = true
                                })
                            }}
                        />
                        <p>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${getOfferLink(aliExpressOfferId)}${AFFILIATE_LINK}`}>
                                {t('see-original-product')}
                            </a>{' '}
                            {t('in-space')}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${getShopLink(aliExpressShopId)}${AFFILIATE_LINK}`}>
                                {t('original-shop')}
                            </a>
                            .
                        </p>
                    </div>
                </Grid.Col>
            </Grid.Row>
        </Container>
    )
}

export default ProductInfoEdit

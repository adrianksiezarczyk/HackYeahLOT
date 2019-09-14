import React from 'react'
import WysiwygEditor from '../../../../components/WysiwygEditor'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'

const ProductDescriptionEdit = ({
    shortDescription,
    productDescription,
    setProductInfo,
    setTouched,
    langs,
    selectedLanguage,
    setSelectedLanguage,
}) => {
    const [t] = useTranslation('products-page')

    const setDescription = value => {
        setProductInfo(draft => {
            draft.productDescription = value
        })
        setTouched(draft => {
            draft.isProductDescriptionTouched = true
        })
    }

    const setShortDescription = value => {
        setProductInfo(draft => {
            draft.shortDescription = value
        })
        setTouched(draft => {
            draft.isShortDescriptionTouched = true
        })
    }

    return (
        <>
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
                <label>{t('short-description')}</label>
                <WysiwygEditor htmlContent={shortDescription} onChange={setShortDescription} height={100} />
            </div>
            <div className="form-group">
                <label>{t('long-description')}</label>
                <WysiwygEditor htmlContent={productDescription} onChange={setDescription} />
            </div>
        </>
    )
}

export default ProductDescriptionEdit

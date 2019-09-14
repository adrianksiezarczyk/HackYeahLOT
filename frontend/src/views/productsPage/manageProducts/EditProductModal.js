import React, { useCallback, useEffect, useState } from 'react'
import { Icon } from 'tabler-react'
import withCurrentShop from '../../../components/HOCs/withCurrentShop'
import BaseModal from '../../../components/shared/BaseModal'
import Button from '../../../components/shared/Button'
import { TabHeader, TabLink, TabPane } from '../../../components/shared/Tabs'
import Tree from '../../../components/Tree'
import useImmerState from '../../../hooks/useImmerState'
import CategoryApi from '../../../services/category/api'
import LanguageApi from '../../../services/language/api'
import ProductApi from '../../../services/product/api'
import TakeAlert from '../../../utils/takeAlert'
import LoadingIndicator from '../../../components/shared/LoadingIndicator'
import ProductDescriptionEdit from './editProductModal/ProductDescriptionEdit'
import ProductInfoEdit from './editProductModal/ProductInfoEdit'
import ProductPhotosEdit from './editProductModal/ProductPhotosEdit'
import { useTranslation } from 'react-i18next'

export const DETAILS_REQUEST_TYPES = { IMPORT_PRODUCT: 0, SHOP_PRODUCT: 1 }

const EditProductModal = ({ productId, isOpen, onCloseModal, isImportList, addProductToShop, requestType }) => {
    const [details, setDetails] = useState(null)
    const [activeTab, setActiveTab] = useState(1)
    const [isMainPhotoSelection, setMainPhotoSelection] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(1)
    const [langs, setLangs] = useState(null)
    const [
        { productName, productDescription, shortDescription, productPhotos, shopCategoryId },
        setProductInfo,
    ] = useImmerState({
        productName: null,
        productDescription: null,
        shortDescription: null,
        productPhotos: null,
        shopCategoryId: null,
    })
    const [
        { isProductNameTouched, isShortDescriptionTouched, isProductDescriptionTouched },
        setTouched,
    ] = useImmerState({
        isProductNameTouched: false,
        isShortDescriptionTouched: false,
        isProductDescriptionTouched: false,
    })

    const setTab = useCallback(tabId => setActiveTab(tabId), [])

    const [t] = useTranslation('products-page')

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                let productDetails
                if (requestType === DETAILS_REQUEST_TYPES.IMPORT_PRODUCT)
                    productDetails = await ProductApi.getImportListProductDetails(productId, selectedLanguage)
                else if (requestType === DETAILS_REQUEST_TYPES.SHOP_PRODUCT)
                    productDetails = await ProductApi.getShopProductDetails(productId, selectedLanguage)
                setDetails(productDetails)
                setProductInfo(draft => {
                    draft.productName = productDetails.productName
                    draft.productDescription = productDetails.productDescription
                    draft.shortDescription = productDetails.shortDescription
                    draft.productPhotos = productDetails.productPhotos
                    draft.shopCategoryId = productDetails.shopCategoryId
                })
            } catch (e) {}
        }
        if (productId) getProductDetails()
    }, [productId, requestType, selectedLanguage, setProductInfo])

    useEffect(() => {
        const getLanguagesAsync = async () => {
            try {
                const langs = await LanguageApi.get()
                setLangs(langs)
            } catch (e) {}
        }
        getLanguagesAsync()
    }, [])

    const saveChanges = useCallback(async () => {
        // if (!(isProductNameTouched || isProductDescriptionTouched || isShortDescriptionTouched)) {
        //     onCloseModal()
        //     setActiveTab(1)
        //     return
        // }
        const model = {
            productId,
            productName: productName,
            isProductNameTouched,
            productDescription: productDescription,
            isProductDescriptionTouched,
            shortDescription: shortDescription,
            isShortDescriptionTouched,
            productPhotos,
            languageId: selectedLanguage,
            shopCategoryId,
        }
        try {
            await ProductApi.updateProduct(model)
            TakeAlert.fire({
                type: 'success',
                title: t('saved-exclamation-mark'),
            })
        } catch (error) {
            console.error(error)
            TakeAlert.fire({
                type: 'error',
                title: t('failure'),
                text: t('that-is-sad'),
                confirmButtonText: t('understand'),
            })
        }
    }, [
        isProductNameTouched,
        isProductDescriptionTouched,
        isShortDescriptionTouched,
        productId,
        productName,
        productDescription,
        shortDescription,
        productPhotos,
        selectedLanguage,
        shopCategoryId,
        t,
    ])

    const closeModal = useCallback(async () => {
        if (!(isProductNameTouched || isProductDescriptionTouched || isShortDescriptionTouched)) {
            onCloseModal()
            setActiveTab(1)
            return
        }
        const result = await TakeAlert.fire({
            title: t('changes-will-not-be-saved'),
            text: t('save-changes-question-mark'),
            showCancelButton: true,
            cancelButtonText: t('abandon'),
            confirmButtonText: t('save'),
            type: 'warning',
            allowEscapeKey: true,
            allowOutsideClick: true,
            reverseButtons: true,
        })
        if (result.value) saveChanges()
        if (result.dismiss === 'backdrop' || result.dismiss === 'esc') return
        setActiveTab(1)
        setTouched(draft => {
            draft.isProductDescriptionTouched = false
            draft.isProductNameTouched = false
            draft.isShortDescriptionTouched = false
        })
        onCloseModal()
    }, [
        isProductDescriptionTouched,
        isProductNameTouched,
        isShortDescriptionTouched,
        onCloseModal,
        saveChanges,
        setTouched,
        t,
    ])

    if (!productId) return null
    if (!details) return <LoadingIndicator />
    return (
        <BaseModal
            size="lg"
            isOpen={isOpen}
            onCloseModal={closeModal}
            title={productName || ''}
            actions={<Icon link name="x" onClick={closeModal} />}
            footer={
                <>
                    {activeTab === 3 && (
                        <Button
                            className="mr-2"
                            color="warning"
                            size="sm"
                            onClick={() => {
                                setMainPhotoSelection(!isMainPhotoSelection)
                            }}>
                            {isMainPhotoSelection ? t('select') : t('edit main photo')}
                        </Button>
                    )}
                    <Button
                        className="mr-2"
                        color="info"
                        size="sm"
                        onClick={() => {
                            saveChanges()
                            onCloseModal()
                        }}>
                        {t('save-changes')}
                    </Button>
                    {isImportList && (
                        <Button
                            color="success"
                            size="sm"
                            onClick={() => {
                                addProductToShop(productId)
                            }}>
                            {t('add-to-shop')}
                        </Button>
                    )}
                </>
            }>
            <TabHeader>
                <TabLink title={t('product')} active={activeTab === 1} onClick={() => setTab(1)} />
                <TabLink title={t('description')} active={activeTab === 2} onClick={() => setTab(2)} />
                <TabLink title={t('photos')} active={activeTab === 3} onClick={() => setTab(3)} />
                <TabLink title={t('category')} active={activeTab === 4} onClick={() => setTab(4)} />
            </TabHeader>
            <>
                <TabPane active={activeTab === 1}>
                    <ProductInfoEdit
                        productName={productName}
                        setTouched={setTouched}
                        productPhoto={productPhotos && productPhotos.length ? productPhotos[0].imageUrl : null}
                        aliExpressOfferId={details.aliExpressOfferId}
                        aliExpressShopId={details.aliExpressShopId}
                        langs={langs}
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        setProductInfo={setProductInfo}
                    />
                </TabPane>
                <TabPane active={activeTab === 2}>
                    <ProductDescriptionEdit
                        productDescription={productDescription}
                        shortDescription={shortDescription}
                        setProductInfo={setProductInfo}
                        setTouched={setTouched}
                        langs={langs}
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                    />
                </TabPane>
                <TabPane active={activeTab === 3}>
                    <ProductPhotosEdit
                        t={t}
                        photos={productPhotos}
                        setProductInfo={setProductInfo}
                        isMainPhotoSelection={isMainPhotoSelection}
                        setMainPhotoSelection={setMainPhotoSelection}
                    />
                </TabPane>
                <TabPane active={activeTab === 4}>
                    <Tree
                        async
                        getChildren={CategoryApi.getShopCategories}
                        shopCategoryId={shopCategoryId}
                        setProductInfo={setProductInfo}
                    />
                </TabPane>
            </>
        </BaseModal>
    )
}

export default withCurrentShop(EditProductModal)

import React, { useCallback, useState } from 'react'
import { Icon } from 'tabler-react'
import withCurrentShop from '../../../components/HOCs/withCurrentShop'
import BaseModal from '../../../components/shared/BaseModal'
import Button from '../../../components/shared/Button'
import { TabHeader, TabLink, TabPane } from '../../../components/shared/Tabs'
import Tree from '../../../components/Tree'
import useImmerState from '../../../hooks/useImmerState'
import CategoryApi from '../../../services/category/api'
// import ProductApi from '../../services/product/api'
import TakeAlert from '../../../utils/takeAlert'
import ProductApi from '../../../services/product/api'
import { useTranslation } from 'react-i18next'

const GroupEditModal = ({ productIds, isOpen, onCloseModal }) => {
    const [activeTab, setActiveTab] = useState(1)
    const [{ shopCategoryId }, setProductInfo] = useImmerState({
        shopCategoryId: null,
    })

    const [t] = useTranslation('products-page')

    const setTab = useCallback(tabId => setActiveTab(tabId), [])
    const saveChanges = useCallback(async () => {
        const model = {
            ids: Array.from(productIds),
            shopCategoryId,
        }
        try {
            await ProductApi.updateMany(model)
        } catch (e) {}
    }, [productIds, shopCategoryId])

    const closeModal = useCallback(async () => {
        if (!shopCategoryId) {
            onCloseModal()
            return
        }
        const result = await TakeAlert.fire({
            title: 'Zmiany nie zostaną zapisane',
            text: 'Czy chcesz zapisać wprowadzone zaminy?',
            showCancelButton: true,
            cancelButtonText: 'Porzuć',
            confirmButtonText: 'Zapisz',
            type: 'warning',
            allowEscapeKey: true,
            allowOutsideClick: true,
            reverseButtons: true,
        })
        if (result.value) {
            saveChanges()
        }
        if (result.dismiss === 'backdrop' || result.dismiss === 'esc') return
        onCloseModal()
        setActiveTab(1)
        setProductInfo(draft => {
            draft.shopCategoryId = null
        })
    }, [onCloseModal, saveChanges, setProductInfo, shopCategoryId])

    return (
        <BaseModal
            size="lg"
            isOpen={isOpen}
            onCloseModal={closeModal}
            title={'Edycja grupowa produktów'}
            actions={<Icon link name="x" onClick={closeModal} />}
            footer={
                <>
                    <Button
                        className="mr-2"
                        color="info"
                        size="sm"
                        onClick={() => {
                            saveChanges()
                            onCloseModal()
                        }}>
                        Zapisz zmiany
                    </Button>
                </>
            }>
            <TabHeader>
                <TabLink title={t('category')} active={activeTab === 1} onClick={() => setTab(1)} />
            </TabHeader>
            <>
                <TabPane active={activeTab === 1}>
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

export default withCurrentShop(GroupEditModal)

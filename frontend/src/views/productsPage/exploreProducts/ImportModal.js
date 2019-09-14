import React, { useState } from 'react'
import { Icon, Form } from 'tabler-react'
import withCurrentShop from '../../../components/HOCs/withCurrentShop'
import BaseModal from '../../../components/shared/BaseModal'
import Button from '../../../components/shared/Button'
import FormElement from '../../../components/form/FormElement'
import ChromeApi from '../../../services/chrome/api'
import TakeAlert from '../../../utils/takeAlert'
import { withRouter } from 'react-router-dom'

const GroupEditModal = ({ isOpen, onCloseModal, currentShop, history, t }) => {
    const [productUrl, setProductUrl] = useState('')
    const [isLoading, setLoading] = useState('')

    const closeModal = () => {
        setProductUrl('')
        onCloseModal()
    }

    return (
        <BaseModal
            isOpen={isOpen}
            onCloseModal={onCloseModal}
            title={t('Product import')}
            actions={<Icon link name="x" onClick={onCloseModal} />}
            footer={
                <>
                    <Button
                        className="mr-2"
                        color="success"
                        size="sm"
                        loading={isLoading}
                        onClick={async () => {
                            if (!productUrl) return
                            setLoading(true)
                            const model = {
                                aliExpressUrls: productUrl ? [productUrl] : [],
                                shopId: currentShop.id,
                                importMode: false,
                            }
                            try {
                                await ChromeApi.importProduct(model)
                                TakeAlert.fire({
                                    type: 'success',
                                    title: t('Saved'),
                                }).finally(() => {
                                    setLoading(false)
                                    closeModal()
                                })
                            } catch (error) {
                                if (error.message && parseInt(error.message) === 403) {
                                    const result = await TakeAlert.fire({
                                        text: t("Your plan doesn't allow direct import"),
                                        showCancelButton: true,
                                        cancelButtonText: t('cancel'),
                                        confirmButtonText: t('CHOOSE HIGHER PLAN'),
                                        type: 'error',
                                        allowEscapeKey: true,
                                        allowOutsideClick: true,
                                        reverseButtons: true,
                                    })
                                    if (result.value) history.push('/billing/overview')
                                    if (result.dismiss === 'backdrop' || result.dismiss === 'esc') return
                                } else
                                    TakeAlert.fire({
                                        type: 'error',
                                        title: `${t('Failure')}!`,
                                        text: `${t('We are sorry')}...`,
                                        confirmButtonText: t('I understand'),
                                    }).finally(() => {
                                        setLoading(false)
                                        closeModal()
                                    })
                            }
                        }}>
                        {t('Import')}
                    </Button>
                </>
            }>
            <Form.Group label={t('Product URL')}>
                <FormElement name="productUrl" value={productUrl} onChange={setProductUrl} />
            </Form.Group>
        </BaseModal>
    )
}

export default withRouter(withCurrentShop(GroupEditModal))

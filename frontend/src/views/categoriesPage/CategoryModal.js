import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { Form, Icon } from 'tabler-react'
import withCurrentShop from '../../components/HOCs/withCurrentShop'
import BaseModal from '../../components/shared/BaseModal'
import Button from '../../components/shared/Button'
import FormElement from '../../components/form/FormElement'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import WysiwygEditor from '../../components/WysiwygEditor'
import useImmerState from '../../hooks/useImmerState'
import CategoryApi from '../../services/category/api'
import LanguageApi from '../../services/language/api'
import { getFileBase64 } from '../../utils/helpers/files'
import TakeAlert from '../../utils/takeAlert'
import { getBase64WithoutPrefix } from '../../utils/helpers/getBase64WithoutPrefix'

const CategoryModal = ({ category, isOpen, onCloseModal, parentCategory }) => {
    const [t] = useTranslation('prices-page')
    const [isLoading, setLoading] = useState(null)
    const [selectedLanguageId, setSelectedLanguageId] = useState(1)
    const [selectedParentCategory, setSelectedParentCategory] = useState(null)
    const [langs, setLangs] = useState(null)
    const [categories, setCategories] = useState([])

    const [
        { id: categoryId, order, hidden, imageFileName, imageFile, imageUrl, localizedCategoryDetails },
        setCategoryInfo,
    ] = useImmerState({
        categoryId: null,
        order: null,
        hidden: false,
        imageFileName: '',
        imageFile: null,
        imageUrl: '',
        localizedCategoryDetails: [],
    })
    useEffect(() => {
        setSelectedParentCategory(parentCategory.id)
    }, [parentCategory])

    //TODO keep in global store
    useEffect(() => {
        const getLanguagesAsync = async () => {
            const langs = await LanguageApi.get()
            setLangs(langs)
        }
        getLanguagesAsync()
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            const categories = await CategoryApi.getAllShopCategories()
            setCategories(categories)
        }
        getCategories()
    }, [])

    const getCategoryDetails = useCallback(async () => {
        if (category.id) {
            const categoryDetails = await CategoryApi.getShopCategoryDetails(category.id)
            setCategoryInfo(() => categoryDetails)
        }
    }, [category.id, setCategoryInfo])

    useEffect(() => {
        getCategoryDetails()
    }, [getCategoryDetails])

    const saveChanges = useCallback(async () => {
        setLoading(true)
        const model = {
            order,
            hidden,
            imageFileName,
            parentId: selectedParentCategory,
            imageFile: imageFile ? getBase64WithoutPrefix(imageFile) : '',
            localizedCategoryDetails,
        }

        try {
            if (!category.id) await CategoryApi.addShopCategoryDetails(model)
            else await CategoryApi.updateShopCategoryDetails({ ...model, id: category.id })

            TakeAlert.fire({
                type: 'success',
                title: t('saved-exclamation-mark'),
            }).finally(() => onCloseModal())
        } catch (error) {
            TakeAlert.fire({
                type: 'error',
                title: t('error-during-saving'),
            })
        }
        setLoading(false)
    }, [
        category.id,
        hidden,
        imageFile,
        imageFileName,
        localizedCategoryDetails,
        onCloseModal,
        order,
        selectedParentCategory,
        t,
    ])
    console.log('lc', localizedCategoryDetails)
    const getLocalizedCategoryValue = key => {
        const selectedLocalizedCategoryDetails = localizedCategoryDetails.find(
            lcd => lcd.languageId === selectedLanguageId,
        )
        if (selectedLocalizedCategoryDetails) return selectedLocalizedCategoryDetails[key] || ''
        return ''
    }
    const setLocalizedCategoryValue = (key, value) => {
        setCategoryInfo(draft => {
            const selectedLocalizedCategoryDetails = draft.localizedCategoryDetails.find(
                lcd => lcd.languageId === selectedLanguageId,
            )
            if (selectedLocalizedCategoryDetails) selectedLocalizedCategoryDetails[key] = value
            else draft.localizedCategoryDetails.push({ languageId: selectedLanguageId, [key]: value })
        })
    }
    const changeLanguage = languageId => {
        if (!localizedCategoryDetails.some(lcd => lcd.languageId === languageId))
            setCategoryInfo(draft => {
                draft.localizedCategoryDetails.push({ languageId })
            })

        setSelectedLanguageId(languageId)
    }

    //TODO TO SPLIT
    if (!langs) return <LoadingIndicator />
    return (
        <BaseModal
            size="lg"
            isOpen={isOpen}
            onCloseModal={onCloseModal}
            title={category ? category.name : t('adding-discount')}
            actions={<Icon link name="x" onClick={onCloseModal} />}
            footer={
                <Button className="mr-2" color="primary" size="sm" loading={isLoading} onClick={saveChanges}>
                    {t('save-changes')}
                </Button>
            }>
            <Form>
                <div className="form-group">
                    <label>{t('parent category')}</label>
                    <Select
                        options={categories}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.id}
                        defaultValue={parentCategory}
                        onChange={({ id }) => setSelectedParentCategory(id)}
                    />
                </div>
                <div className="form-group">
                    <label>{t('language')}</label>
                    <Select
                        options={langs}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.id}
                        defaultValue={langs.find(lang => lang.id === selectedLanguageId)}
                        onChange={({ id }) => changeLanguage(id)}
                    />
                </div>
                <div className="form-group">
                    <label>{t('name')}</label>
                    <FormElement
                        value={getLocalizedCategoryValue('name')}
                        onChange={val => setLocalizedCategoryValue('name', val)}
                    />
                </div>
                <div className="form-group">
                    <label>{t('description')}</label>
                    <WysiwygEditor
                        htmlContent={getLocalizedCategoryValue('description')}
                        onChange={val => setLocalizedCategoryValue('description', val)}
                        height={100}
                    />
                </div>
                <div className="form-group">
                    <label>{t('meta-title')}</label>
                    <FormElement
                        value={getLocalizedCategoryValue('metaTitle')}
                        onChange={val => setLocalizedCategoryValue('metaTitle', val)}
                    />
                </div>
                <div className="form-group">
                    <label>{t('meta-description')}</label>
                    <FormElement
                        value={getLocalizedCategoryValue('metaDescription')}
                        onChange={val => setLocalizedCategoryValue('metaDescription', val)}
                    />
                </div>
                <div className="form-group">
                    <label>{t('hidden')}</label>
                    <FormElement
                        isCheckbox
                        isSwitch
                        checked={hidden}
                        value={hidden}
                        onChange={val => {
                            setCategoryInfo(draft => {
                                draft.hidden = val
                            })
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>{t('image')}</label>
                    <div>
                        {imageUrl && (
                            <img
                                style={{ maxWidth: '150px', marginTop: '1em', marginBottom: '1em' }}
                                src={imageUrl}
                                alt="category"
                            />
                        )}
                    </div>
                    <Form.FileInput
                        accept="image/*"
                        label={t('choose-file')}
                        onChange={async evt => {
                            const fileName = evt.target.files[0].name
                            const fileBase64 = await getFileBase64(evt.target.files[0])
                            setCategoryInfo(draft => {
                                draft.imageFileName = fileName
                                draft.imageFile = fileBase64
                            })
                        }}
                    />
                </div>
            </Form>
        </BaseModal>
    )
}

export default withCurrentShop(CategoryModal)

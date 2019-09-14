import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Card, Dimmer, Icon, Button } from 'tabler-react'
import { PrimaryButton, SecondaryButton } from '../../../components/shared/Button'
import useImmerState from '../../../hooks/useImmerState'
import TakeAlert from '../../../utils/takeAlert'
import ThemeApi from '../../../services/theme/api'

const RemoveIcon = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    color: #888;
`

const BannerMainContent = styled.div`
    display: flex;
`
const BannerImg = styled.div`
    height: 200px;
    width: 100%;
    text-align: center;
    img {
        object-fit: contain;
        height: 100%;
    }
`
const InlineFormGroup = styled(Form.Group)`
    display: flex !important;
    align-items: center;
    margin: 5px 0;
    margin-bottom: 0 !important;
    label {
        margin-right: 5px;
    }
`
const StyledFormSwitch = styled(Form.Switch)`
    cursor: pointer !important;
`

const defaultBanner = {
    fileBase64: null,
    fileExtension: null,
    fileName: null,
    isHidden: false,
    languageCode: 'pl',
    link: '',
}
const Banners = ({ initialBanners, domain, updateInitialBanner, updateInitialBanners, t }) => {
    const [isLoading, setLoading] = useState(false)
    const [newBanner, setNewBanner] = useState(null)
    const [editedBannersIds, setEditedBanners] = useState([])
    const [banners, setBanners] = useImmerState(initialBanners)
    const [selectedLanguage, setLanguage] = useState('pl')

    const changeLanguage = e => setLanguage(e.target.value)
    const changeLink = (bannerId, value) => {
        setBanners(draft => {
            const banner = draft.find(b => b.id === bannerId)
            if (banner) banner.link = value
        })
        setEditedBanners(editedBannersIds.concat(bannerId))
    }
    const changeVisibility = (bannerId, value) => {
        setBanners(draft => {
            const banner = draft.find(b => b.id === bannerId)
            if (banner) banner.isHidden = value
        })
        if (!editedBannersIds.includes(bannerId)) setEditedBanners(editedBannersIds.concat(bannerId))
    }
    const cancel = bannerId => {
        const initialBanner = initialBanners.find(b => b.id === bannerId)
        setBanners(draft => {
            let banner = draft.find(b => b.id === bannerId)
            if (banner) {
                banner.link = initialBanner.link
                banner.isHidden = initialBanner.isHidden
            }
        })
        setEditedBanners(editedBannersIds.filter(id => id !== bannerId))
    }
    const save = async bannerId => {
        setLoading(true)
        const banner = banners.find(b => b.id === bannerId)
        try {
            await ThemeApi.updateBanner(bannerId, banner)
            setEditedBanners(editedBannersIds.filter(id => id !== bannerId))
            updateInitialBanner(banner)
        } catch (e) {}
        setLoading(false)
    }
    const remove = async bannerId => {
        const result = await TakeAlert.fire({
            title: t('are you sure?'),
            text: t('remove banner'),
            showCancelButton: true,
            cancelButtonText: t('cancel'),
            confirmButtonText: t('remove'),
            type: 'warning',
            allowEscapeKey: true,
            allowOutsideClick: true,
            reverseButtons: true,
        })
        if (result.value) {
            setLoading(true)
            try {
                await ThemeApi.deleteBanner(bannerId)
                setBanners(() => banners.filter(b => b.id !== bannerId))
            } catch (e) {}
            setLoading(false)
        }
        if (result.dismiss === 'backdrop' || result.dismiss === 'esc') return
    }
    const handleBannerUpload = e => {
        setLoading(true)
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onloadend = () => {
            const nameArr = file.name.split('.')
            setNewBanner({
                ...newBanner,
                fileBase64: reader.result,
                fileExtension: nameArr.slice(-1).pop(),
                fileName: nameArr[0],
            })
            setLoading(false)
        }
        reader.readAsDataURL(file)
    }
    const saveNewBanner = async () => {
        setLoading(true)
        try {
            await ThemeApi.addBanner({
                ...newBanner,
                fileBase64: newBanner.fileBase64.split(',')[1],
                languageCode: selectedLanguage,
            })
            const allBanners = await ThemeApi.getBanners()
            setBanners(() => allBanners)
            updateInitialBanners(allBanners)
            setNewBanner(null)
        } catch (e) {}
        setLoading(false)
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>{t('Banners')}</Card.Title>
                <Card.Options>
                    {!newBanner && (
                        <Button size="sm" color="success" onClick={() => setNewBanner({ ...defaultBanner })}>
                            {t('add')}
                        </Button>
                    )}
                </Card.Options>
            </Card.Header>
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <Form.Group label={t('language')}>
                        <Form.Select onChange={changeLanguage}>
                            <option value="pl">{t('Polish')}</option>
                            <option value="en">{t('English')}</option>
                        </Form.Select>
                    </Form.Group>
                    {newBanner && (
                        <Card>
                            <Card.Header>
                                <StyledFormSwitch
                                    label={t('Hide')}
                                    checked={newBanner.isHidden}
                                    onChange={e => setNewBanner({ ...newBanner, isHidden: e.target.checked })}
                                />
                                <Card.Options>
                                    <PrimaryButton text={t('save')} onClick={saveNewBanner} />
                                    <SecondaryButton text={t('cancel')} onClick={() => setNewBanner(null)} />
                                </Card.Options>
                            </Card.Header>
                            <Card.Body>
                                <BannerMainContent>
                                    <BannerImg>
                                        {newBanner.fileBase64 ? (
                                            <img src={newBanner.fileBase64} alt="banner" />
                                        ) : (
                                            <Form.Group>
                                                <Form.FileInput onChange={handleBannerUpload} />
                                            </Form.Group>
                                        )}
                                    </BannerImg>
                                </BannerMainContent>
                                <InlineFormGroup>
                                    <Form.InputGroup>
                                        <Form.InputGroupPrepend>
                                            <Form.InputGroupText>https://{domain}/</Form.InputGroupText>
                                        </Form.InputGroupPrepend>
                                        <Form.Input
                                            value={newBanner.link}
                                            onChange={e => setNewBanner({ ...newBanner, link: e.target.value })}
                                        />
                                    </Form.InputGroup>
                                </InlineFormGroup>
                            </Card.Body>
                        </Card>
                    )}
                    {banners
                        .filter(b => b.languageCode === selectedLanguage)
                        .map(banner => {
                            return (
                                <Card key={banner.id}>
                                    <Card.Header>
                                        <StyledFormSwitch
                                            label={t('Hide')}
                                            checked={banner.isHidden}
                                            onChange={e => changeVisibility(banner.id, e.target.checked)}
                                        />
                                        <RemoveIcon onClick={() => remove(banner.id)}>
                                            <Icon name="trash-2" />
                                        </RemoveIcon>
                                        <Card.Options>
                                            {editedBannersIds.includes(banner.id) && (
                                                <>
                                                    <PrimaryButton text={t('save')} onClick={() => save(banner.id)} />
                                                    <SecondaryButton
                                                        text={t('cancel')}
                                                        onClick={() => cancel(banner.id)}
                                                    />
                                                </>
                                            )}
                                        </Card.Options>
                                    </Card.Header>
                                    <Card.Body>
                                        <BannerMainContent>
                                            <BannerImg>
                                                <img src={banner.imageUrl} alt="banner" />
                                            </BannerImg>
                                        </BannerMainContent>
                                        <InlineFormGroup>
                                            <Form.InputGroup>
                                                <Form.InputGroupPrepend>
                                                    <Form.InputGroupText>https://{domain}/</Form.InputGroupText>
                                                </Form.InputGroupPrepend>
                                                <Form.Input
                                                    value={banner.link}
                                                    onChange={e => {
                                                        changeLink(banner.id, e.target.value)
                                                    }}
                                                />
                                            </Form.InputGroup>
                                        </InlineFormGroup>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                </Dimmer>
            </Card.Body>
        </Card>
    )
}

export default Banners

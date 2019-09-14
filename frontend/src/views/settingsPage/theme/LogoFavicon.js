import React, { useState } from 'react'
import styled from 'styled-components'
import { Grid, Form, Card, Dimmer } from 'tabler-react'
import { PrimaryButton, SecondaryButton } from '../../../components/shared/Button'
import ThemeApi from '../../../services/theme/api'

const ImageBox = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
`
const StyledCard = styled(Card)`
    min-height: 300px;
`

const initialImageState = { url: null, base64: null, extension: null, file: null }
const LogoFavicon = ({ logoUrl, faviconUrl, t }) => {
    const [isLoading, setLoading] = useState(false)
    const [isEdited, setEdited] = useState(false)
    const [logo, setLogo] = useState({ ...initialImageState, url: logoUrl })
    const [favicon, setFavicon] = useState({ ...initialImageState, url: faviconUrl })

    const setImage = (func, obj) => ({ url, base64, extension, file }) => {
        func({
            url: url ? url : obj.url,
            base64: base64 ? base64 : obj.base64,
            extension: extension ? extension : obj.extension,
            file: file ? file : obj.file,
        })
    }
    const _setLogo = setImage(setLogo, logo)
    const _setFavicon = setImage(setFavicon, favicon)

    const handleUpload = (e, func) => {
        setEdited(true)
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onloadend = () =>
            func({
                base64: reader.result,
                extension: file.name
                    .split('.')
                    .slice(-1)
                    .pop(),
            })
        reader.readAsDataURL(file)
    }
    const handleLogoUpload = e => handleUpload(e, _setLogo)
    const handleFaviconUpload = e => handleUpload(e, _setFavicon)

    const cancel = () => {
        setEdited(false)
        setLogo({ ...initialImageState, url: logo.url })
        setFavicon({ ...initialImageState, url: favicon.url })
    }

    const save = async () => {
        setLoading(true)
        try {
            if (logo.base64) {
                const model = {
                    fileExtension: logo.extension,
                    fileBase64: logo.base64.split(',')[1],
                }
                await ThemeApi.uploadLogo(model)
                setLogo({ ...initialImageState, url: logo.base64 })
            }
            if (favicon.base64) {
                const model = {
                    fileExtension: favicon.extension,
                    fileBase64: favicon.base64.split(',')[1],
                }
                await ThemeApi.uploadFavicon(model)
                setFavicon({ ...initialImageState, url: favicon.base64 })
            }
        } catch (e) {}
        setEdited(false)
        setLoading(false)
    }

    return (
        <StyledCard>
            <Card.Header>
                <Card.Title>{t('Logo & favicon')}</Card.Title>
                {isEdited && (
                    <Card.Options>
                        <PrimaryButton text={t('save')} onClick={save} />
                        <SecondaryButton text={t('cancel')} onClick={cancel} />
                    </Card.Options>
                )}
            </Card.Header>
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <Grid.Row>
                        <Grid.Col md={6}>
                            <Form.Group label={t('logo')}>
                                <Form.FileInput onChange={handleLogoUpload} />
                            </Form.Group>
                        </Grid.Col>
                        <Grid.Col md={3} offset={3}>
                            <ImageBox>
                                <img src={logo.base64 ? logo.base64 : logo.url} alt="logo" />
                            </ImageBox>
                        </Grid.Col>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Col md={6}>
                            <Form.Group label={t('favicon')}>
                                <Form.FileInput onChange={handleFaviconUpload} />
                            </Form.Group>
                        </Grid.Col>
                        <Grid.Col md={3} offset={3}>
                            <ImageBox>
                                <img src={favicon.base64 ? favicon.base64 : favicon.url} alt="favicon" />
                            </ImageBox>
                        </Grid.Col>
                    </Grid.Row>
                </Dimmer>
            </Card.Body>
        </StyledCard>
    )
}

export default LogoFavicon

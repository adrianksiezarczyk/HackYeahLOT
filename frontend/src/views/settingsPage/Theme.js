import React, { useState, useEffect } from 'react'
import { Grid } from 'tabler-react'
import { useTranslation } from 'react-i18next'
import ThemeApi from '../../services/theme/api'
import LogoFavicon from './theme/LogoFavicon'
import Styles from './theme/Styles'
import Banners from './theme/Banners'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import useImmerState from '../../hooks/useImmerState'

const Theme = () => {
    const [isLoading, setLoading] = useState(true)
    const [logoUrl, setLogoUrl] = useState(null)
    const [faviconUrl, setFaviconUrl] = useState(null)
    //const [metaImage, setMetaImage] = useState(null)
    const [themeKeys, setTheme] = useState(null)
    const [banners, setBanners] = useImmerState(null)
    const [domain, setDomain] = useState(null)
    const [t] = useTranslation('settings-page')

    useEffect(() => {
        const getDomain = async () => {
            try {
                const { logoUrl, faviconUrl, banners, keys, domain } = await ThemeApi.get()
                setLogoUrl(logoUrl)
                setFaviconUrl(faviconUrl)
                //          setMetaImage(metaImageUrl)
                setTheme(keys)
                setBanners(() => banners)
                setDomain(domain)
            } catch (e) {}
            setLoading(false)
        }
        getDomain()
    }, [setBanners])

    const updateThemeStyles = keys => setTheme(keys)
    const updateBanners = banners => setBanners(() => banners)
    const updateBanner = banner =>
        setBanners(draft => {
            const oldBanner = draft.find(b => b.id === banner.id)
            oldBanner.isHidden = banner.isHidden
            oldBanner.link = banner.link
        })

    if (isLoading) return <LoadingIndicator />
    return (
        <Grid>
            <Grid.Row>
                <Grid.Col md={6}>
                    <LogoFavicon logoUrl={logoUrl} faviconUrl={faviconUrl} t={t} />
                    <Banners
                        initialBanners={banners}
                        domain={domain}
                        updateInitialBanner={updateBanner}
                        updateInitialBanners={updateBanners}
                        t={t}
                    />
                </Grid.Col>
                <Grid.Col md={6}>
                    <Styles themeKeys={themeKeys} updateInitialStyles={updateThemeStyles} t={t} />
                </Grid.Col>
            </Grid.Row>
        </Grid>
    )
}

export default Theme

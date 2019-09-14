import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Tooltip } from 'react-tippy'
import { Form, Grid, Icon } from 'tabler-react'
import withCurrentShop from '../../components/HOCs/withCurrentShop'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import useOnOutsideClick from '../../hooks/useOnOutsideClick'
import StatisticsApi from '../../services/statistics/api'
import { useTranslation } from 'react-i18next'
import ShopApi from '../../services/shop/api'

const XmlLinkInput = ({ value }) => {
    const inputElement = useRef(null)
    const wrapperRef = useRef(null)
    const [copied, setCopied] = useState(false)
    const [t] = useTranslation('settings-page')

    const resetCopied = useCallback(() => setCopied(false), [])

    useOnOutsideClick(wrapperRef, resetCopied)

    return (
        <div ref={wrapperRef}>
            <Form.Group>
                <Form.InputGroup>
                    <input className="form-control" ref={inputElement} disabled value={value} />
                    <Tooltip open={copied} title={t('copied-exclamation-mark')} position="right">
                        <Form.InputGroupAppend>
                            <Form.InputGroupText>
                                <Icon
                                    link
                                    name={copied ? 'check-square' : 'clipboard'}
                                    onClick={() => {
                                        navigator.clipboard.writeText(inputElement.current.value)
                                        setCopied(true)
                                    }}
                                />
                            </Form.InputGroupText>
                        </Form.InputGroupAppend>
                    </Tooltip>
                </Form.InputGroup>
            </Form.Group>
        </div>
    )
}

const ExportLinks = ({ currentShop }) => {
    const [shopSetToken, setShopSetToken] = useState(null)
    const [stats, setStats] = useState(null)
    const [{ siteMapPages, feedPages }, setPages] = useState({ siteMapPages: [], feedPages: [] })
    const [t] = useTranslation('settings-page')

    useEffect(() => {
        const getStatsAsync = async () => {
            try {
                const data = await StatisticsApi.getDashboard()
                setStats(data)
                const { totalProductsQuantity } = data
                const pages = Math.ceil(totalProductsQuantity / 50000)
                const siteMapPages = new Array(pages).fill(1)
                const feedPagesNumber = Math.ceil(totalProductsQuantity / 500)
                const feedPages = new Array(feedPagesNumber).fill(1)
                setPages({ siteMapPages, feedPages })
            } catch (e) {}
        }
        getStatsAsync()
    }, [])

    useEffect(() => {
        const getShopSetToken = async () => {
            try {
                const response = await ShopApi.getShopSetToken()
                setShopSetToken(response.token)
            } catch (e) {}
        }
        getShopSetToken()
    }, [currentShop])

    if (!stats || !shopSetToken) return <LoadingIndicator />
    return (
        <div>
            <Grid.Row>
                <Grid.Col sm={4} md={2}>
                    <Form.Group label={t('source')} />
                </Grid.Col>
                <Grid.Col sm={8} md={10}>
                    <Form.Group label="URL" />
                </Grid.Col>
            </Grid.Row>
            {feedPages.map((page, index) => (
                <Grid.Row key={index}>
                    <Grid.Col sm={4} md={2}>
                        <Form.Input disabled value={`${t('facebook-feed-space')} ${index + 1}`} />
                    </Grid.Col>
                    <Grid.Col sm={8} md={10}>
                        <XmlLinkInput
                            value={`https://s1.take.shop/v2/admin/export/facebookFeed?shopId=${currentShop.id}&currentPage=${index}&pageSize=500&accessToken=${shopSetToken}`}
                        />
                    </Grid.Col>
                </Grid.Row>
            ))}
            {feedPages.map((page, index) => (
                <Grid.Row key={index}>
                    <Grid.Col sm={4} md={2}>
                        <Form.Input disabled value={`${t('google-feed-space')} ${index + 1}`} />
                    </Grid.Col>
                    <Grid.Col sm={8} md={10}>
                        <XmlLinkInput
                            value={`https://s1.take.shop/v2/admin/export/facebookFeed?shopId=${currentShop.id}&currentPage=${index}&pageSize=500&google=true&accessToken=${shopSetToken}`}
                        />
                    </Grid.Col>
                </Grid.Row>
            ))}
            <Grid.Row>
                <Grid.Col sm={4} md={2}>
                    <Form.Input disabled value={`${t('category-sitemap')}`} />
                </Grid.Col>
                <Grid.Col sm={8} md={10}>
                    <XmlLinkInput
                        value={`https://${currentShop.domain}/sitemap.xml?shopId=${
                            currentShop.id
                        }&currentPage=${0}&pageSize=${0}&accessToken=${shopSetToken}`}
                    />
                </Grid.Col>
            </Grid.Row>
            {siteMapPages.map((page, index) => (
                <Grid.Row>
                    <Grid.Col sm={4} md={2}>
                        <Form.Input disabled value={`${t('sitemap-page-space')} ${index + 1}`} />
                    </Grid.Col>
                    <Grid.Col sm={8} md={10}>
                        <XmlLinkInput
                            value={`https://${currentShop.domain}/sitemap.xml?shopId=${
                                currentShop.id
                            }&currentPage=${index + 1}&pageSize=${50000}&accessToken=${shopSetToken}`}
                        />
                    </Grid.Col>
                </Grid.Row>
            ))}
        </div>
    )
}

export default withCurrentShop(ExportLinks)

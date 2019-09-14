import React from 'react'
import { Translation } from 'react-i18next'
import NavBar from './components/NavBar'
import { RouterTabLink } from './components/shared/RouterTabs'
import { MAIN_CONFIGURATION_GROUPS } from './constants'

const routes = [
    {
        name: <Translation ns="navigation">{t => <>{t('products')}</>}</Translation>,
        icon: 'tag',
        path: '/products',
        loader: () => import('./views/ProductsPage'),
        hasChildren: true,
        navbar: () => (
            <NavBar>
                {url => (
                    <>
                        <RouterTabLink namespace="products-page" title="explore-products" to={url + '/explore'} />
                        <RouterTabLink namespace="products-page" title="newly-added" to={url + '/new-products'} />
                        <RouterTabLink namespace="products-page" title="in-your-shop" to={url + '/your-shop'} />
                    </>
                )}
            </NavBar>
        ),
    },
    {
        name: <Translation ns="navigation">{t => <>{t('buy shop')}</>}</Translation>,
        icon: 'shopping-bag',
        path: '/buy-shop',
        loader: () => import('./views/BuyShopPage'),
    },
    {
        name: <Translation ns="navigation">{t => <>{t('categories')}</>}</Translation>,
        icon: 'server',
        path: '/categories',
        loader: () => import('./views/CategoriesPage'),
    },
    {
        name: <Translation ns="navigation">{t => <>{t('prices')}</>}</Translation>,
        icon: 'percent',
        path: '/prices',
        loader: () => import('./views/PricesPage'),
        navbar: () => (
            <NavBar>
                {url => (
                    <>
                        <RouterTabLink title="commissions" to={url + '/commissions'} namespace="prices-page" />
                        <RouterTabLink title="discounts" to={url + '/discounts'} namespace="prices-page" />
                    </>
                )}
            </NavBar>
        ),
    },
    {
        name: <Translation ns="navigation">{t => <>{t('orders')}</>}</Translation>,
        icon: 'list',
        path: '/orders',
        loader: () => import('./views/OrdersPage'),
    },
    {
        name: <Translation ns="navigation">{t => <>{t('additions')}</>}</Translation>,
        icon: 'more-horizontal',
        path: '/additions',
        loader: () => import('./views/AdditionsPage'),
        navbar: () => (
            <NavBar>
                {url => (
                    <>
                        <RouterTabLink title="stories" to={url + '/stories'} namespace="additions-page" />
                        <RouterTabLink title="shop-main-page" to={url + '/shop-main-page'} namespace="additions-page" />
                    </>
                )}
            </NavBar>
        ),
    },
    {
        name: <Translation ns="navigation">{t => <>{t('settings')}</>}</Translation>,
        icon: 'settings',
        path: '/settings',
        loader: () => import('./views/SettingsPage'),
        navbar: () => (
            <NavBar>
                {url =>
                    Object.values(MAIN_CONFIGURATION_GROUPS).map((configGroup, index) => (
                        <RouterTabLink
                            key={index}
                            title={configGroup.toLowerCase()}
                            namespace="settings-page"
                            to={url + `/${configGroup.toLowerCase()}`}
                        />
                    ))
                }
            </NavBar>
        ),
    },
    {
        name: <Translation ns="navigation">{t => <>{t('billing')}</>}</Translation>,
        icon: 'credit-card',
        path: '/billing',
        loader: () => import('./views/BillingPage'),
        navbar: () => (
            <NavBar>
                {url => (
                    <>
                        <RouterTabLink title="overview" to={url + '/overview'} namespace="billing-page" />
                        <RouterTabLink title="details" to={url + '/details'} namespace="billing-page" />
                        <RouterTabLink title="invoices" to={url + '/invoices'} namespace="billing-page" />
                    </>
                )}
            </NavBar>
        ),
    },
]

export default routes

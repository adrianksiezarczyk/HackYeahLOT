const routes = [
    {
        name: 'Explore',
        path: '/explore',
        exact: true,
        loader: () => import('./ExploreProducts'),
    },
    {
        name: 'New products',
        path: '/new-products',
        exact: true,
        loader: () => import('./ImportList'),
    },
    {
        name: 'Your shop',
        path: '/your-shop',
        exact: true,
        loader: () => import('./ShopProducts'),
    },
]

export default routes

const routes = [
    {
        name: 'Commissions',
        path: '/commissions',
        exact: true,
        loader: () => import('./Commissions'),
    },
    {
        name: 'Discounts',
        path: '/discounts',
        exact: true,
        loader: () => import('./Discounts'),
    },
    // {
    //     name: 'New products',
    //     path: '/new-products',
    //     exact: true,
    //     loader: () => import('./ImportList'),
    // },
]

export default routes

const routes = [
    {
        name: 'Orders list',
        path: '/',
        exact: true,
        loader: () => import('./OrdersList'),
    },
    {
        name: 'Edit Order',
        path: '/:orderId',
        exact: true,
        loader: () => import('./EditOrder'),
    },
]

export default routes

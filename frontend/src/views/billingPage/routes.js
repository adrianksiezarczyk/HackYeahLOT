const routes = [
    {
        name: 'Overview',
        path: '/overview',
        exact: true,
        loader: () => import('./BillingOverview'),
    },
    {
        name: 'Details',
        path: '/details',
        exact: true,
        loader: () => import('./BillingDetails'),
    },
    {
        name: 'Invoices',
        path: '/invoices',
        exact: true,
        loader: () => import('./BillingInvoices'),
    },
    
]

export default routes

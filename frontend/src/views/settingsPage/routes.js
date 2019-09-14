import { MAIN_CONFIGURATION_GROUPS } from '../../constants'

const routes = Object.values(MAIN_CONFIGURATION_GROUPS)
    .filter(configGroup => {
        return (
            MAIN_CONFIGURATION_GROUPS.PAYMENTS === configGroup ||
            MAIN_CONFIGURATION_GROUPS.INTEGRATIONS === configGroup ||
            MAIN_CONFIGURATION_GROUPS.META_TAGS === configGroup ||
            MAIN_CONFIGURATION_GROUPS.OTHER === configGroup
        )
    })
    .map(configGroup => ({
        name: configGroup,
        path: `/${configGroup.toLowerCase()}`,
        exact: true,
        loader: () => import('./SettingsTabContent'),
    }))
    .concat([
        {
            name: 'Export XML',
            path: '/export-xml',
            exact: true,
            loader: () => import('./ExportLinks'),
        },
        {
            name: 'Domain',
            path: '/domain',
            exact: true,
            loader: () => import('./Domain'),
        },
        {
            name: 'Theme',
            path: '/theme',
            exact: true,
            loader: () => import('./Theme'),
        },
        {
            name: 'Emails',
            path: '/emails',
            exact: true,
            loader: () => import('./Emails'),
        },
        {
            name: 'Email template details',
            path: '/emails/:templateId',
            exact: true,
            loader: () => import('./emails/EmailTemplateDetails'),
        },
        {
            name: 'Documents',
            path: '/documents',
            exact: true,
            loader: () => import('./Documents'),
        },
        {
            name: 'Document details',
            path: '/documents/:documentId',
            exact: true,
            loader: () => import('./documents/DocumentDetails'),
        },
    ])

export default routes

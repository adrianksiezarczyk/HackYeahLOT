const routes = [
    {
        name: 'Stories',
        path: '/stories',
        exact: true,
        loader: () => import('./Stories'),
    },
    {
        name: 'Stories details',
        path: '/stories/:storyId',
        exact: true,
        loader: () => import('./stories/StoryDetails'),
    },
    {
        name: 'Shop main page',
        path: '/shop-main-page',
        exact: true,
        loader: () => import('./ShopMainPage'),
    },
]

export default routes

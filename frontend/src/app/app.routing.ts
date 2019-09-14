import { Routes, RouterModule } from '@angular/router'
import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout.component'
import { AuthLayoutComponent } from './shared/layout/app-layouts/auth-layout.component'
import { ModuleWithProviders } from '@angular/core'
import { AuthGuard } from './app.guard'

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'products',
                loadChildren: 'app/products/products.module#ProductsModule',
            },
            {
                path: 'orders',
                loadChildren: 'app/orders/orders.module#OrdersModule',
            },
            {
                path: 'offers',
                loadChildren: 'app/offers/offers.module#OffersModule',
            },
            {
                path: 'buy-shop',
                loadChildren: 'app/buy-shop/buy-shop.module#BuyShopModule',
            },
            {
                path: 'disputes',
                loadChildren: 'app/disputes/disputes.module#DisputesModule',
            },
            {
                path: 'commissions',
                loadChildren: 'app/commissions/commissions.module#CommissionsModule',
            },
            {
                path: 'categories',
                loadChildren: 'app/categories/categories.module#CategoriesModule',
            },
            {
                path: 'statuses',
                loadChildren: 'app/statuses/statuses.module#StatusesModule',
            },
            {
                path: 'settings',
                loadChildren: 'app/settings/settings.module#SettingsModule',
            },
            {
                path: 'users',
                loadChildren: 'app/users/users.module#UsersModule',
            },
            {
                path: 'discounts',
                loadChildren: 'app/discount/discount.module#DiscountModule',
            },
            {
                path: 'shops',
                loadChildren: 'app/shops/shops.module#ShopsModule',
            },
            {
                path: 'emails',
                loadChildren: 'app/emails/emails.module#EmailsModule',
            },
            {
                path: 'profile',
                loadChildren: 'app/profile/profile.module#ProfileModule',
            },
            {
                path: 'stories',
                loadChildren: 'app/stories/stories.module#StoriesModule',
            },
            {
                path: 'themes',
                loadChildren: 'app/themes/theme.module#ThemeModule',
            },
            {
                path: 'static-pages',
                loadChildren: 'app/static-page/static-page.module#StaticPageModule',
            },
            {
                path: 'payment',
                loadChildren: 'app/payment/payment.module#PaymentModule',
            },
            {
                path: 'payment-history',
                loadChildren: 'app/payment-history/payment-history.module#PaymentHistoryModule',
            },
        ],
    },
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false })

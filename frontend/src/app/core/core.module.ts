import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ApiService } from './api/api.service'
import { LayoutService } from '../shared/layout/layout.service'
import { TabsModule, ProgressbarModule, TooltipModule, BsDropdownModule, AlertModule } from 'ngx-bootstrap'
import { AuthGuard } from 'app/app.guard'
import { AuthService } from 'app/core/services/AuthService/AuthService'
import { StatusService } from 'app/core/services/StatusService/StatusService'
import { CommissionService } from 'app/core/services/CommissionService/CommissionService'
import { ProductService } from './services/ProductService/ProductService'
import { OrderService } from 'app/core/services/OrderService/OrderService'
import { CategoryService } from './services/CategoryService/CategoryService'
import { SharedService } from 'app/core/services/SharedService/SharedService'
import { throwIfAlreadyLoaded } from 'app/core/guards/module-import-guard'
import { CurrencyService } from './services/CurrencyService/CurrencyService'
import { StatisticsService } from './services/StatisticsService/StatisticsService'
import { ConfigurationService } from './services/ConfigurationService/ConfigurationService'
import { CsvParser } from 'app/shared/utils/csv.parser'
import { ExportService } from './services/ExportService/ExportService'
import { DisputesService } from './services/DisputesService/DisputeService'
import { PhotoService } from './services/PhotoService/PhotoService'
import { UsersService } from './services/UsersService/UsersService'
import { DiscountService } from './services/DiscountService/DiscountService'
import { ShopsService } from './services/ShopsService/ShopsService'
import { EmailTemplateService } from './services/EmailTemplateService/EmailTemplateService'
import { StoriesService } from './services/StoriesService/StoriesService'
import { DocumentsService } from './services/DocumentsService/DocumentsService'
import { ThemeService } from './services/ThemeService/ThemeService'
import { BannerService } from './services/BannerService/BannerService'
import { CurrentSetService } from './services/CurrentSetService/CurrentSetService'
import { StaticPageService } from './services/StaticPageService/StaticPageService'
import { StringsHelper } from '../shared/utils/strings.helper'
import { PaymentService } from './services/PaymentService/PaymentService'
import { OfferService } from './services/OfferService/OfferService'
import { PlanService } from './services/PlanService/PlanService'
import { PaymentHistoryService } from './services/PaymentHistoryService/PaymentHistoryService';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        AlertModule.forRoot(),
        TabsModule.forRoot(),
    ],
    exports: [HttpClientModule],
    declarations: [],
    providers: [
        StatusService,
        CommissionService,
        ProductService,
        CategoryService,
        CurrencyService,
        CsvParser,
        StatisticsService,
        DatePipe,
        ConfigurationService,
        PhotoService,
        ExportService,
        OrderService,
        DisputesService,
        SharedService,
        ApiService,
        LayoutService,
        AuthGuard,
        AuthService,
        UsersService,
        DiscountService,
        ShopsService,
        EmailTemplateService,
        StoriesService,
        DocumentsService,
        ThemeService,
        BannerService,
        CurrentSetService,
        StaticPageService,
        StringsHelper,
        PaymentService,
        OfferService,
        PlanService,
        PaymentHistoryService
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule')
    }
}

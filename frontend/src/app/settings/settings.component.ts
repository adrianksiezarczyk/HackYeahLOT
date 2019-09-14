import { Component, OnInit } from '@angular/core'
import { ConfigurationService } from 'app/core/services/ConfigurationService/ConfigurationService'
import { DocumentsService } from 'app/core/services/DocumentsService/DocumentsService'
import { BaseComponent } from 'app/core/base/base.component'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import { StatisticsService } from 'app/core/services/StatisticsService/StatisticsService'
import { CurrentSetService } from '../core/services/CurrentSetService/CurrentSetService'
import { SharedEventName } from '../core/services/SharedService/models'
import { SharedService } from '../core/services/SharedService/SharedService'
import { Observable } from 'rxjs/Observable'
import { PaymentService } from 'app/core/services/PaymentService/PaymentService'
import { UsersService } from 'app/core/services/UsersService/UsersService';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent extends BaseComponent implements OnInit {
    configurations: Array<any> = []
    documents: Array<any> = []
    groups: Set<string> = new Set<string>()
    currentTab = 'settings'
    editMode = false
    domain = <any>{}
    currentSet = <any>{}
    statistics = <any>{}
    currentShop = <any>{}
    siteMapTotalPages: Array<any> = []
    feedTotalPages: Array<any> = []
    paymentTypes: Array<any> = []
    shop = <any>{}

    isBaselinkerEnabledRecord = false
    constructor(
        private configurationService: ConfigurationService,
        private documentsService: DocumentsService,
        private statisticsService: StatisticsService,
        private sharedService: SharedService,
        private paymentService: PaymentService,
        private usersService: UsersService
    ) {
        super()
        this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.init()
                    break
            }
        })
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }

    init() {
        this.showLoader()
        const getConfigurations = this.configurationService.get()
        const getDocuments = this.documentsService.getSummary()
        const getPaymentTypes = this.paymentService.getPaymentTypes()
        Observable.forkJoin([getConfigurations, getDocuments, getPaymentTypes]).subscribe(data => {
            const configurationResponse = data[0]
            const documentsResponse = data[1]
            const paymentTypesResponse = data[2]

            this.configurations = configurationResponse.keys
            this.groups = new Set(configurationResponse.keys.map(r => r.group))
            this.domain = configurationResponse.domain
            this.shop = configurationResponse.shop
            let footerEnabledConfig = this.configurations.find(c => c.key == 'FooterEnabled')
            if (footerEnabledConfig)
                footerEnabledConfig.isReadOnly = !StorageService.getItem(StorageKeys.permissions).some(
                    p => p == 'SuperAdmin',
                )
            this.documents = documentsResponse
            this.paymentTypes = paymentTypesResponse
            this.hideLoader()
        }, this.handleError)

        this.currentShop = CurrentSetService.currentShop
        this.statisticsService.get().subscribe(stats => {
            this.statistics = stats
            const pages = Math.ceil(this.statistics.totalProductsQuantity / 50000)
            this.siteMapTotalPages = new Array(pages).fill(1)
            const feedPages = Math.ceil(this.statistics.totalProductsQuantity / 500)
            this.feedTotalPages = new Array(feedPages).fill(1)
        }, this.handleError)
    }
    canUserChangeDomain(){
        return this.usersService.hasPermission('CanEditDomain')
    }
    save() {
        this.showLoader()
        this.configurationService.update(this.configurations).subscribe(r => {
            this.init()
            this.editMode = false
        }, this.handleError)
    }
    changeDomain() {
        if (
            confirm(
                'Czy jesteś pewien, że jest to Twoja domena i możesz zmienić jej adres DNS? Poprzednia domena przestanie działać!',
            )
        ) {
            this.showLoader()
            this.configurationService.changeDomain(this.domain.domain).subscribe(r => {
                this.init()
            }, this.handleError)
        }
    }
    changePaymentTypeEnabledStatus(paymentType) {
        this.paymentService
            .updatePaymentType({ id: paymentType.id, isEnabled: !paymentType.isEnabled })
            .subscribe(r => {
                this.init()
            }, this.handleError)
    }

    isPaymentCheckboxEnabled = paymentTypeId => {
        if (paymentTypeId === 1 || paymentTypeId === 2)
            return !!this.configurations.find(c => c.key == 'PayUClientSecret').value
        else if (paymentTypeId === 3) return !!this.configurations.find(c => c.key == 'PayPalClientSecret').value
        else if (paymentTypeId === 7) return !!this.configurations.find(c => c.key == 'BankTransferAccountNumber').value
        else return true
    }
    saveNotificationEmail = () => {
        this.showLoader()
        this.configurationService.updateNotificationEmail(this.shop.notificationEmail).subscribe(() => {
            this.init()
        }, this.handleError)
    }
}

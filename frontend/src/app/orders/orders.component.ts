import { Component, OnInit, OnDestroy } from '@angular/core'
import { OrderService } from 'app/core/services/OrderService/OrderService'
import { OrderModel, GetOrdersRequest } from '../core/services/OrderService/models'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from 'app/core/services/SharedService/models'
import { BaseDatatableComponent } from '../core/base/base.datatable.component'
import { StorageService } from '../core/services/StorageService/StorageService'
import { StorageKeys } from '../core/services/StorageService/StorageKeys'
import { Subscription } from 'rxjs/Subscription'
import { CsvParser } from 'app/shared/utils/csv.parser'
import { CurrentSetService } from '../core/services/CurrentSetService/CurrentSetService'
import { UsersService } from 'app/core/services/UsersService/UsersService'

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
})
export class OrdersComponent extends BaseDatatableComponent<GetOrdersRequest, OrderModel> implements OnInit, OnDestroy {
    showSearch: boolean
    constructor(
        private orderService: OrderService,
        private sharedService: SharedService,
        private csvParser: CsvParser,
        private usersService: UsersService,
    ) {
        super()
        this.sharedSubscription = sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.response.data = []
                    this.init()
                    break
            }
        })
        this.request.sortColumnName = 'id'
        this.request.sortOrder = 'desc'
    }
    ngOnDestroy(): void {
        if (this.sharedSubscription) this.sharedSubscription.unsubscribe()
    }
    ngOnInit() {
        if (CurrentSetService.currentShop.id) this.init()
    }
    init() {
        console.log(CurrentSetService.currentShop)
        if (!CurrentSetService.currentShop.id) return
        this.request.filter.shopId = CurrentSetService.currentShop.id

        this.showLoader()
        this.orderService.get(this.request).subscribe(r => {
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }
    placeOrder(orderId) {
        if (confirm('Na pewno chcesz zrealizowac to zamowienie?')) {
            this.showLoader()
            this.orderService.placeOrder({ orderId }).subscribe(() => {
                this.init()
            }, this.handleError)
        }
    }
    hasUserPermission(permission) {
        return this.usersService.hasPermission(permission)
    }
    export() {
        this.showLoader()
        this.request.filter.shopId = CurrentSetService.currentShop.id
        this.orderService.getExportData(this.request.filter).subscribe(data => {
            data.forEach(d => {
                d.amountRecieved = d.amountRecieved.toString().replace('.', ',')
                d.amountPaid = d.amountPaid.toString().replace('.', ',')
                d.currencyRate = d.currencyRate ? d.currencyRate.toString().replace('.', ',') : 0
                delete d.placingOrderDate
                delete d.date
            })

            var csvData = this.csvParser.converToCsv(data, false)
            this.createAndDownloadFile(`zamowienia-eksport.csv`, csvData, 'text/csv')
            this.hideLoader()
        }, this.handleError)
    }

    getTransfers() {
        if (!confirm('Na pewno? Masz tylko jedną szanse!')) return
        this.showLoader()
        this.request.filter.shopId = CurrentSetService.currentShop.id
        this.orderService.getAliTransfers().subscribe(data => {
            var csvData = this.csvParser.converToCsv(data, true)
            this.createAndDownloadFile(`payments.csv`, csvData, 'text/csv')
            this.hideLoader()
        }, this.handleError)
    }
    sendToBl(orderId) {
        this.showLoader()
        this.orderService.sentToBl(orderId).subscribe(() => {
            this.orderService.get(this.request).subscribe(r => {
                this.response = r
                this.hideLoader()
            }, this.handleError)
        }, this.handleError)
    }

    orderDetailsClosed(event) {}
}

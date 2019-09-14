import { Component, OnInit, OnDestroy } from '@angular/core'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from 'app/core/services/SharedService/models'
import { BaseDatatableComponent } from '../core/base/base.datatable.component'
import { PaymentHistoryService } from '../core/services/PaymentHistoryService/PaymentHistoryService';


@Component({
    selector: 'app-payment-history',
    templateUrl: './payment-history.component.html',
})
export class PaymentHistoryComponent extends BaseDatatableComponent<any, any> implements OnInit, OnDestroy {
    constructor(private sharedService: SharedService, private paymentHistoryService: PaymentHistoryService) {
        super()
        this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
           
                case SharedEventName.ShopChanged:
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

    ngOnInit() {}

    init() {
        this.showLoader()
        this.paymentHistoryService.get(this.request).subscribe(r => {
            console.log(r)
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }
}

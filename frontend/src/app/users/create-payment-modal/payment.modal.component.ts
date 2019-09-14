import { Component } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { PaymentService } from 'app/core/services/PaymentService/PaymentService'

@Component({
    selector: 'create-payment-modal',
    templateUrl: './payment.modal.component.html',
})
export class PaymentModalComponent extends BaseModalComponent {
    constructor(private paymentService: PaymentService) {
        super()
    }

    shopSetId
    planId
    amount
    dateStart
    dateEnd

    init(shopSetId): void {
        this.shopSetId = shopSetId
        this.show()
    }
    createInternalOrder() {
        const model = {
            shopSetId: this.shopSetId,
            planId: this.planId,
            amount: this.amount,
            dateFrom: new Date(this.dateStart).toLocaleDateString(),
            dateTo: new Date(this.dateEnd).toLocaleDateString(),
        }
        this.paymentService.createInternalOrder(model).subscribe(r => {
            this.hide()
        }, this.handleError)
    }
}

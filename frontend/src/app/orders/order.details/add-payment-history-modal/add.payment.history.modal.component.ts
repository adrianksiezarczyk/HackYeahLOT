import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { UsersService } from 'app/core/services/UsersService/UsersService'
import { OrderService } from 'app/core/services/OrderService/OrderService'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'add-payment-history-modal-component',
    templateUrl: './add.payment.history.modal.component.html',
})
export class AddPaymentHistoryModalComponent extends BaseModalComponent {
    constructor(
        private productService: ProductService,
        private usersService: UsersService,
        private orderService: OrderService,
        private activatedRoute: ActivatedRoute,
    ) {
        super()
    }

    paymentHistory = {
        paymentType: 'MANUAL',
        currency: 'PLN',
        orderId: null,
    }

    init(): void {
        this.activatedRoute.params.subscribe(params => {
            this.paymentHistory.orderId = params.id
            this.show()
        })
    }
    save() {
        this.orderService.addPaymentHistory(this.paymentHistory).subscribe(
            r => {
                this.hide()
                this.hideLoader()
            },
            e => this.handleError(e),
        )
    }
}

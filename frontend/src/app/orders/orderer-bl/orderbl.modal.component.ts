import { Component } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { OrderService } from 'app/core/services/OrderService/OrderService'

@Component({
    selector: 'orderbl-modal-component',
    templateUrl: './orderbl.modal.component.html',
})
export class OrderblModalComponent extends BaseModalComponent {
    orderIds
    constructor(private productService: ProductService, private orderService: OrderService) {
        super()
    }

    init(): void {
        this.show()
    }

    save() {
        this.showLoader()
        this.orderService.placeOrderByBl({ baseLinkerIds: this.orderIds }).subscribe(r => {
            this.hideLoader()
            this.hide()
        }, this.handleError)
    }
}

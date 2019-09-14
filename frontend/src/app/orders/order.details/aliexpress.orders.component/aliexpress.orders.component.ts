import { Component, OnInit, Input } from '@angular/core'
import { BaseComponent } from '../../../core/base/base.component'
import { DisputesService } from '../../../core/services/DisputesService/DisputeService'
import { OrderService } from '../../../core/services/OrderService/OrderService'

@Component({
    selector: 'aliexpress-orders',
    templateUrl: './aliexpress.orders.component.html',
})
export class AliExpressOrdersComponent extends BaseComponent implements OnInit {
    @Input() order: any

    constructor(private disputeService: DisputesService, private orderService: OrderService) {
        super()
    }

    ngOnInit() {}

    open(order: any) {
        this.showLoader()
        this.disputeService.open(order.number).subscribe(r => {
            order.hasDispute = true
            this.hideLoader()
        }, this.handleError)
    }
    reorder() {
        let productIds = []
        this.order.aliExpressOrders
            .filter(p => p.checked)
            .forEach(o => {
                o.products.forEach(p => {
                    productIds.push(p.id)
                })
            })

        if (productIds.length == 0) {
            alert('Brak produktów!')
            return
        }

        let model = {
            productIds: productIds,
            baseLinkerOrderId: this.order.baseLinkerOrderNumber,
        }
        console.log(model)
        this.showLoader()
        this.orderService.resentOrder(model).subscribe(r => {
            this.order.aliExpressOrders
                .filter(p => p.checked)
                .forEach(o => {
                    o.reSent = true
                })
            this.hideLoader()
        }, this.handleError)
    }
    collect() {
        this.showLoader()
        this.orderService.collect(this.order.id).subscribe(r => {
            this.orderService.getDetails(this.order.id).subscribe(r => {
                this.order = r
                this.hideLoader()
            }, this.handleError)
        }, this.handleError)
    }
    changeStatus() {
        this.showLoader()

        this.orderService.changeStatus({ orderId: this.order.id, statusId: this.order.setOrderStatusId }).subscribe(r => {
            this.hideLoader()
        }, this.handleError)
    }
}

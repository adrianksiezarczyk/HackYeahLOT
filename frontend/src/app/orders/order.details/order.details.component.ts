import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'
import 'rxjs/add/observable/zip'
import { BaseComponent } from 'app/core/base/base.component'
import { OrderDetailsModel } from '../../core/services/OrderService/models'
import { OrderService } from '../../core/services/OrderService/OrderService'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'order-details-component',
    templateUrl: './order.details.component.html',
})
export class OrderDetailsComponent extends BaseComponent implements OnInit {
    order: OrderDetailsModel = <OrderDetailsModel>{ products: [], customer: {} }

    currentTab: string = 'customer'

    constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {
        super()
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.order.id = params.id
            this.init()
        })
    }

    init() {
        this.showLoader()
        this.orderService.getDetails(this.order.id).subscribe(r => {
            this.order = r
            this.hideLoader()
        }, this.handleError)
    }

    save() {}
}

import { Component } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { OrderService } from 'app/core/services/OrderService/OrderService'

@Component({
    selector: 'combination-modal-component',
    templateUrl: './combination.modal.component.html',
})
export class CombinationModalComponent extends BaseModalComponent {
    variants = []
    orderProductId = null
    failId = null
    constructor(private productService: ProductService, private orderService: OrderService) {
        super()
    }

    init(model): void {
        this.variants = model.orderProductVariants || []
        this.orderProductId = model.orderProductId
        this.failId = model.failId
        console.log('INIT', this.variants)
        this.show()
    }

    removeVariant(variant) {
        this.variants.splice(this.variants.indexOf(variant), 1)
    }
    save() {
        var model = {
            orderProductId: this.orderProductId,
            variants: this.variants,
        }
        this.showLoader()
        this.orderService.updateOrderProduct(model).subscribe(r => {
            this.hideLoader()
            this.hide(this.failId)
        }, this.handleError)
    }

    addVariant() {
        this.variants.push({})
    }
}

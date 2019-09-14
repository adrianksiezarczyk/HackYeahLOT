import { Component, OnInit } from '@angular/core'
import { DiscountService } from '../../core/services/DiscountService/DiscountService'
import { DiscountModel, GetDiscountModel } from '../../core/services/DiscountService/models'
import { BaseDatatableComponent } from '../../core/base/base.datatable.component'

@Component({
    selector: 'discount-codes',
    templateUrl: './discount-codes.component.html',
})
export class DiscountCodesComponent extends BaseDatatableComponent<GetDiscountModel, DiscountModel> implements OnInit {
    constructor(private discountService: DiscountService) {
        super()
        this.request.filter.onlyAny = true
    }
    discounts = []

    ngOnInit() {
        this.showLoader()
        this.discountService.get(this.request).subscribe(r => {
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }

    deleteDiscount(id) {
        if (confirm('Na pewno?')) {
            this.showLoader()
            this.discountService.delete(id).subscribe(r => {
                this.ngOnInit()
            }, this.handleError)
        }
    }
}

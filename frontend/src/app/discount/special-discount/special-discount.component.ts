import { Component, OnInit } from '@angular/core'
import { DiscountService } from '../../core/services/DiscountService/DiscountService'
import { DiscountModel, GetDiscountModel } from '../../core/services/DiscountService/models'
import { BaseDatatableComponent } from '../../core/base/base.datatable.component'

@Component({
    selector: 'special-discount',
    templateUrl: './special-discount.component.html',
})
export class SpecialDiscountComponent extends BaseDatatableComponent<GetDiscountModel, DiscountModel>
    implements OnInit {
    constructor(private discountService: DiscountService) {
        super()
        this.request.filter.onlyAny = false
    }

    editModeCode = null

    isActivatedSpecialDiscount = () => {
        if (this.response.data.some(d => d['isActive'])) return true
        return false
    }

    ngOnInit() {
        this.showLoader()
        this.discountService.getSpecial(this.request).subscribe(r => {
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }
    toggleCheckbox(event, coupon) {
        this.showLoader()
        const checked = event.target.checked
        if (!checked) coupon.isActive = false
        else coupon.isActive = true
        this.discountService.updateSpecial({ code: coupon.code, isActive: checked }).subscribe(r => {
            this.ngOnInit()
        }, this.handleError)
    }

    checkEditMode = discountCode => this.editModeCode == discountCode
    setEditMode = (discountCode = null) => (this.editModeCode = discountCode)
    save(coupon) {
        this.showLoader()
        this.discountService
            .updateSpecial({ code: coupon.code, startDate: coupon._startDate, endDate: coupon._endDate })
            .subscribe(r => {
                this.ngOnInit()
                this.setEditMode(null)
            }, this.handleError)
    }
}

import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import * as _ from 'lodash'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/zip'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { DiscountService } from '../../../core/services/DiscountService/DiscountService'

@Component({
    selector: 'newdiscount-modal-component',
    templateUrl: './newdiscount.modal.component.html',
})
export class NewDiscountModalComponent extends BaseModalComponent {
    discount = <any>{  }
    types = [{ id: 0, name: 'Procentowy' }, { id: 1, name: 'Kwotowy' }]
    constructor(private discountService: DiscountService) {
        super()
    }

    init(parameter: any): void {
        this.discount = parameter
        this.show()
    }

    save() {
        this.showLoader()
        if (this.discount.id) {
            this.discountService.udpate(this.discount).subscribe(r => {
                this.hide()
                this.hideLoader()
            }, this.handleError)
        } else {
            this.discountService.add(this.discount).subscribe(r => {
                this.hide()
                this.hideLoader()
            }, this.handleError)
        }
    }
}

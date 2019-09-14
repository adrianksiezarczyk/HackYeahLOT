import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { BaseComponent } from '../../core/base/base.component'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { BaseModalComponent } from 'app/core/base/base.modal.component'

@Component({
    selector: 'group-update-component',
    templateUrl: './group.update.component.html',
})
export class GroupUpdateComponent extends BaseModalComponent implements OnInit {
    productIds: Array<number>[]
    groupUpdateModel: any = { commissionTypeId: 0 }

    constructor(private productService: ProductService) {
        super()
    }

    ngOnInit(): void {}
    init(parameter: any): void {
        this.showLoader()
        this.serverError = null
        this.groupUpdateModel = { commissionTypeId: 0 }
        this.groupUpdateModel.productsIds = parameter
        this.show()
    }
    save() {
        this.productService.globalProductsGroupUpdate(this.groupUpdateModel).subscribe(r => {
            this.hide()
        }, this.handleError)
    }
}

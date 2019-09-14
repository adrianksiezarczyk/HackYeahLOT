import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'

import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { CategoryService } from 'app/core/services/CategoryService/CategoryService'
import { CurrentSetService } from '../../../core/services/CurrentSetService/CurrentSetService'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'

@Component({
    selector: 'users-shop-modal',
    templateUrl: './users.shops.modal.component.html',
})
export class UserShopsModalComponent extends BaseModalComponent {
    constructor(private categoryService: CategoryService, private shopsService: ShopsService) {
        super()
    }
    shop: any = {}
    selectedSetId = null
    @Output() private refresh: EventEmitter<any> = new EventEmitter()

    init(shop) {
        this.shop = shop
        this.show()
    }

    save(reload) {
        if (confirm('Na pewno chcesz przenieść ten sklep do wybranego setu?')) {
            this.showLoader()
            this.shopsService.assignShopToSet({ shopId: this.shop.id, setId: this.selectedSetId }).subscribe(r => {
                this.refresh.emit()
                this.hideLoader()
                this.hide(null, true)
            }, this.handleError)
        }
    }

    cancel() {
        this.hide(null, false)
    }
}

import { Component } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'

import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'
import { ShopModel, AliExpressShopModel } from 'app/core/services/ShopsService/models'
import { ThrowStmt } from '@angular/compiler'

@Component({
    selector: 'aliexpress-shop-details-modal-component',
    templateUrl: './aliexpress.shop.details.modal.component.html',
})
export class AliExpressShopDetailsModalComponent extends BaseModalComponent {
    shop: AliExpressShopModel = <AliExpressShopModel>{}
    categories: Array<any> = []

    newShopModel: any = {}

    constructor(private shopsService: ShopsService) {
        super()
    }

    init(parameter: any): void {
        this.newShopModel = {}

        this.shop = parameter
        this.showLoader()
        this.newShopModel.aliExpressShopId = this.shop.aliExpressId
        this.shopsService.getAliExpressShopsCategories(this.shop.aliExpressId).subscribe(s => {
            if (!s.groups) alert('Brak kategori!!')
            else this.categories = s.groups
            this.hideLoader()
        }, this.hideLoader)
        this.show()
    }
    handleCategoryChecked(category) {
        category.subGroupList.forEach(c => (c.checked = category.checked))
    }
    addToImportQueue() {
        let allCategories = []
        this.categories.forEach(c => {
            c.parentId = null
            if (c.subGroupList.length > 0) {
                c.subGroupList.forEach(sc => (sc.parentId = c.groupId))
                allCategories.push(c.subGroupList)
            }
        })
        allCategories.push(this.categories)
        allCategories = _.flattenDeep(allCategories)

        this.newShopModel.categories = allCategories.filter(c => c.checked).map(c => {
            return {
                id: c.groupId,
                parentId: c.parentId,
                name: c.name,
            }
        })
        this.showLoader()
        this.shopsService.addToImportQueue(this.newShopModel).subscribe(r => {
            this.hideLoader()
            this.shop.isImported = true
            setTimeout(() => alert('Dodany do kolejki importu!'))
        }, this.handleError)
    }
}

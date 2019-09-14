import { Component, OnInit } from '@angular/core'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'
import { ShopModel } from 'app/core/services/AuthService/models'
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component'
import { GetShopsRequest, ImportShopModel, GetImportsShopsRequest } from 'app/core/services/ShopsService/models'

@Component({
    selector: 'imports-shops',
    templateUrl: './imports.shops.component.html',
})
export class ImportsShopsComponent extends BaseDatatableComponent<GetImportsShopsRequest, ImportShopModel>
    implements OnInit {
    constructor(private shopsService: ShopsService) {
        super()
    }
    ngOnInit() {
        this.showLoader()
        this.shopsService.getImports(this.request).subscribe(r => {
            r.data.forEach(d => (d.categories = JSON.parse(d.categories)))
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }
    reset(importId) {
        if (confirm('Na pewno wiesz co robisz?')) {
            this.showLoader()
            this.shopsService.reset(importId).subscribe(r => {
                this.ngOnInit()
            }, this.handleError)
        }
    }
    toggleDisabled(importId) {
            this.showLoader()
            this.shopsService.toggleDisabled(importId).subscribe(r => {
                this.ngOnInit()
            }, this.handleError)
    }
}

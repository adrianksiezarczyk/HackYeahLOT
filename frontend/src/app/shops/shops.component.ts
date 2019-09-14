import { Component, OnInit } from '@angular/core'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'
import { ShopModel } from 'app/core/services/AuthService/models'
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component'
import { GetShopsRequest } from 'app/core/services/ShopsService/models'

@Component({
    selector: 'app-shops',
    templateUrl: './shops.component.html',
})
export class ShopsComponent extends BaseDatatableComponent<GetShopsRequest, ShopModel> implements OnInit {
    constructor(private shopsService: ShopsService) {
        super()
    }
    currentTab = 'shops'

    ngOnInit() {

    }
}

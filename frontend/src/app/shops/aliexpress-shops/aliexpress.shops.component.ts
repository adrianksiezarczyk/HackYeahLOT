import { Component, OnInit } from '@angular/core'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService';
import { ShopModel } from 'app/core/services/AuthService/models';
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component';
import { GetShopsRequest, AliExpressShopModel } from 'app/core/services/ShopsService/models';

@Component({
    selector: 'aliexpress-shops',
    templateUrl: './aliexpress.shops.component.html',
})
export class AliExpressShopsComponent extends BaseDatatableComponent<GetShopsRequest, AliExpressShopModel> implements OnInit {
    constructor(private shopsService: ShopsService) {
        super()
        
    }
    ngOnInit() {
      this.showLoader()
      this.shopsService.getAliExpressShops(this.request).subscribe(r => {
          this.response = r
          this.hideLoader()
      }, this.handleError)
    }
}

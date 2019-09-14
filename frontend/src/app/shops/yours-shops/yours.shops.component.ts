import { Component, OnInit } from '@angular/core'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService';
import { ShopModel } from 'app/core/services/AuthService/models';
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component';
import { GetShopsRequest } from 'app/core/services/ShopsService/models';

@Component({
    selector: 'yours-shops',
    templateUrl: './yours.shops.component.html',
})
export class YoursShopsComponent extends BaseDatatableComponent<GetShopsRequest, ShopModel> implements OnInit {
    constructor(private shopsService: ShopsService) {
        super()
        
    }
    ngOnInit() {
      this.showLoader()
      this.shopsService.getShops(this.request).subscribe(r => {
          this.response = r
          this.hideLoader()
      }, this.handleError)
    }
}

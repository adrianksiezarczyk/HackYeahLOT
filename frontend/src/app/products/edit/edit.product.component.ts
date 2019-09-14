import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import 'rxjs/add/observable/zip'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { BaseComponent } from 'app/core/base/base.component'
import { ActivatedRoute } from '@angular/router'
import { UsersService } from 'app/core/services/UsersService/UsersService'

@Component({
    selector: 'edit-product-component',
    templateUrl: './edit.product.component.html',
})
export class EditProductComponent extends BaseComponent implements OnInit {
    product: any = {}
    currentTab: string = 'desc'

    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private usersService: UsersService,
    ) {
        super()
    }

    ngOnInit() {
        this.showLoader()
        this.activatedRoute.params.subscribe(params => {
            this.productService.getGlobalProductDetails(params.id).subscribe(p => {
                this.product = p
                this.product.aliExpressOfferId = p.aliExpressOffers.find(a => a.current).aliExpressId
                this.hideLoader()
            }, this.handleError)
        })
    }
    hasUserPermission(permission) {
        return this.usersService.hasPermission(permission)
    }
    forceUpdate(id) {
        this.showLoader()
        this.productService.forceUpdate(id).subscribe(r => {
            this.hideLoader()
            alert('Produkt przesunięty na góre aktualzacji!')
        }, this.handleError)
    }
    forceHardUpdate(id) {
        if (!confirm('Na pewno chcesz zresetowac produkt?')) return
        this.showLoader()
        this.productService.forceHardUpdate(id).subscribe(r => {
            this.hideLoader()
            alert('Produkt przesunięty na góre aktualzacji!')
        }, this.handleError)
    }
}

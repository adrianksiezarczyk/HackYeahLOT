import { Component, OnInit, Input } from '@angular/core'
import { BaseComponent } from 'app/core/base/base.component'
import { ProductService } from '../../../core/services/ProductService/ProductService';

@Component({
    selector: 'price-settings',
    templateUrl: './price.component.html',
})
export class PriceComponent extends BaseComponent implements OnInit {
    @Input() product: any

    constructor(private productService: ProductService) {
        super()
    }

    ngOnInit() {}

    save() {
        this.showLoader()
        const parsed = parseFloat(this.product.additionalMargin)
        const additionalMargin = isNaN(parsed) ? null : parsed
        const model = {productId: this.product.id, additionalMargin}
        this.productService.updateAdditionalMargin(model).subscribe(r => {
            this.hideLoader()
        }, this.handleError)
    }
}

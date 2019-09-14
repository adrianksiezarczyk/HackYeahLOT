import { Component, OnInit, Input } from '@angular/core';
import { BaseDatatableComponent } from '../../../core/base/base.datatable.component';
import { GetProductCombinationsRequest } from '../../../core/services/ProductService/models';
import { ProductService } from '../../../core/services/ProductService/ProductService';

@Component({
    selector: 'combinations-settings',
    templateUrl: './combinations.component.html'
})
export class CombinationsComponent extends BaseDatatableComponent<any, any> implements OnInit {

    @Input() product: any;
    combinations: Array<any>[];

    constructor(private productService: ProductService) {
        super();

        if(this.product)
            this.request.filter.productId = this.product.id
    }

    ngOnInit() {
        this.request.filter.productId = this.product.id
        this.productService.getCombinations(this.request).subscribe(r => {
            this.response = <any>r
        })
    }
}

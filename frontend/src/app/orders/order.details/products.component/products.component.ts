import { Component, OnInit, Input } from '@angular/core'
import { BaseComponent } from '../../../core/base/base.component'
import { OrderService } from '../../../core/services/OrderService/OrderService'
@Component({
    selector: 'products-settings',
    templateUrl: './products.component.html',
})
export class ProductsComponent extends BaseComponent implements OnInit {
    @Input() order: any
    @Input() init: any

    constructor(private orderService: OrderService) {
        super()
    }

    ngOnInit() {}

    getProductCombinationName = product => {
        return product.variants.map(v => `${v.displayName}: ${v.displayValue}`).join(', ')
    }
    openEditMode(product) {
        product.editMode = true
    }
    closeEditMode(product) {
        product.editMode = false
    }
    getProductCombinationPhoto(variants) {
        var photoVariant = variants.find(v => !!v.imageUrl)
        if (photoVariant) return this.getImageUrl(photoVariant.imageUrl)
    }
    getImageUrl(url) {
        if (!url) return null
        if (url.includes('http')) return url
        return `https://images.take.shop//${url}.jpg_100x100.jpg_.webp`
    }

    save(product) {
        this.showLoader()
        this.orderService
            .updateOrderProduct({
                orderId: this.order.id,
                orderProductId: product.orderProductId,
                combinationId: product.selectedCombinationId,
            })
            .subscribe(
                r => {
                    this.hideLoader()
                    this.closeEditMode(product)
                    this.getOrderDetails()
                },
                e => {
                    this.handleError(e)
                    this.closeEditMode(product)
                },
            )
    }
    getOrderDetails = () => {
        this.orderService.getDetails(this.order.id).subscribe(r => {
            this.order = r
            this.hideLoader()
        }, this.handleError)
    }
}

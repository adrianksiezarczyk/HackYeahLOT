import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { SharedEventName } from 'app/core/services/SharedService/models'
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component'
import { Subscription } from 'rxjs/Subscription'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import { ActivatedRoute } from '@angular/router'
import { GetProductRequest, ProductModel, AddProductToShopRequest } from 'app/core/services/ProductService/models'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { SharedService } from 'app/core/services/SharedService/SharedService'
import { UsersService } from 'app/core/services/UsersService/UsersService'
import { CurrentSetService } from '../core/services/CurrentSetService/CurrentSetService'

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
})
export class ProductsComponent extends BaseDatatableComponent<GetProductRequest, ProductModel>
    implements OnInit, OnDestroy {
    currentShop: any

    @ViewChild('groupUpdateModal') groupUpdateModal
    @ViewChild('categoryFilterModal') categoryFilterModal
    constructor(
        private productService: ProductService,
        sharedService: SharedService,
        private usersService: UsersService,
        private activatedRoute: ActivatedRoute,
    ) {
        super()

        this.activatedRoute.queryParams.subscribe(params => {
            if (params.id) this.request.filter.id = params.id
        })
        this.request.filter.listMode = 'shop'

        this.sharedSubscription = sharedService.currentMessage.subscribe(r => {
            switch (r.name) {           
                case SharedEventName.ShopChanged:
                        this.response.data = []
                    this.currentShop = CurrentSetService.currentShop
                    this.init()
                    break
            }
        })
    }

    groupUpdate() {
        const ids = this.response.data.filter(p => p.checked).map(p => p.id)
        this.groupUpdateModal.init(ids)
    }

    selectTab(listMode) {
        this.request.filter.listMode = listMode
        this.init()
    }
    forceUpdate(id) {
        this.showLoader()
        this.productService.forceUpdate(id).subscribe(r => {
            this.hideLoader()
            alert('Produkt przesunięty na góre aktualzacji!')
        }, this.handleError)
    }
    forceHardUpdate(id) {
        this.showLoader()
        this.productService.forceHardUpdate(id).subscribe(r => {
            this.hideLoader()
            alert('Produkt przesunięty na góre aktualzacji!')
        }, this.handleError)
    }
    generateDisplayName(id) {
        if (!confirm('Na pewno chcesz wygenerować nową nazwę?')) return
        this.showLoader()
        this.productService.generateDisplayName(id).subscribe(r => {
            this.init()
        }, this.handleError)
    }

    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }
    updateProduct(product) {
        if (!product) return
        this.init()
    }

    deleteMany() {
        console.log(this.request.filter.listMode)
        const ids = this.response.data.filter(p => p.checked).map(p => p.id)
        if (confirm(`Jesteś pewien, że chcesz usunąć ${ids.length} prodktów?`)) {
            this.showLoader()
            if (this.request.filter.listMode == 'shop') {
                this.productService.deleteManyProductFromShop(ids).subscribe(r => {
                    this.init()
                }, this.handleError)
            } else {
                this.productService.deleteGlobalMany(ids).subscribe(r => {
                    this.init()
                }, this.handleError)
            }
        }
    }

    updateMany() {
        const ids = this.response.data.filter(p => p.checked).map(p => p.id)
        this.productService.updateMany(ids).subscribe(r => {
            this.init()
        }, this.handleError)
        alert('Update wymuszony')
    }

    delete(productId: number) {
        if (confirm('Jesteś pewien?')) {
            if (this.request.filter.listMode == 'shop') {
                this.productService.deleteProductFromShop(productId).subscribe(r => {
                    this.init()
                }, this.handleError)
            } else {
                this.productService.deleteGlobal(productId).subscribe(r => {
                    this.init()
                }, this.handleError)
            }
        }
    }

    init() {
        if (!this.request.filter.listMode) this.request.filter.listMode = 'shop'

        this.currentShop = CurrentSetService.currentShop

        this.request.filter.shopId = this.currentShop.id

        this.checkedAll = false
        this.showLoader()

        this.productService.getGlobal(this.request).subscribe(r => {
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }
    ngOnInit() {}
    hasUserPermission(permission) {
        return this.usersService.hasPermission(permission)
    }

    addProductsToShop() {
        this.showLoader()
        const model = this.response.data.filter(p => p.checked).map(p => p.id)
        this.productService.addProductsToShop(model).subscribe(r => {
            this.init()
        }, this.handleError)
    }

    showAddProductButton() {
        const condition1 = this.request.filter.listMode == 'available'
        const condition2 = this.hasUserPermission('CanAddProductsToShop')
        return condition1 && condition2
    }
    showDeleteProductButton() {
        const condition1 = this.request.filter.listMode == 'shop'
        const condition2 =
            this.hasUserPermission('CanDeleteGlobalProduct') || this.hasUserPermission('CanAddProductsToShop')
        return condition1 && condition2
    }
    showUpdateProductButton() {
        const condition1 = this.request.filter.listMode == 'available'
        const condition2 = this.hasUserPermission('CanUpdateGlobalProduct')
        return condition1 && condition2
    }
    test(id) {
        if (typeof id !== 'undefined') {
            this.request.filter.aliExpressCategoryId = id
            this.init()
        }
    }
}

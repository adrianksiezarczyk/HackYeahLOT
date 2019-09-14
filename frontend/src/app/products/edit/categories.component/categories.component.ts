import { Component, OnInit, Input } from '@angular/core'
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component'
import { CategoryModel, GetCategoryRequest } from '../../../core/services/CategoryService/models'
import { CategoryService } from '../../../core/services/CategoryService/CategoryService'
import { ProductService } from '../../../core/services/ProductService/ProductService'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import { CurrentSetService } from '../../../core/services/CurrentSetService/CurrentSetService'
import { SharedService } from '../../../core/services/SharedService/SharedService'
import { SharedEventName } from '../../../core/services/SharedService/models'

@Component({
    selector: 'categories-settings',
    templateUrl: './categories.component.html',
})
export class CategoriesComponent extends BaseDatatableComponent<GetCategoryRequest, CategoryModel> implements OnInit {
    @Input() product: any

    categories
    selectedLanguage = 'pl'
    productCategory = null
    currentShop: any
currentCategory={}

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private sharedService: SharedService,
    ) {
        super()
        this.sharedSubscription = sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.currentShop = CurrentSetService.currentShop
                    this.init()
                    break
            }
        })
    }
    init() {
        this.currentShop = CurrentSetService.currentShop
        this.request.filter.shopId = this.currentShop.id
        this.showLoader()

        this.categoryService.get(this.request).subscribe(r => {
            console.log('response', r)
            this.response = r
            this.categories = r.data
            this.productCategory = this.categories.find(c => c.id == this.product.shopCategoryId)
            this.hideLoader()
        }, this.handleError)
    }
    ngOnInit() {}

    setCategories(categoryId) {
        this.request.filter.parentId = categoryId
        this.init()
    }

    update(category) {
        if (!category) return
        this.showLoader()
        this.currentCategory = category
        this.productService.updateCategory({ productId: this.product.id, shopCategoryId: category.id }).subscribe(r => {
            this.productCategory = category
            this.product.shopCategoryId = category.id
            this.hideLoader()
        }, this.handleError)
    }

    getName(category) {
        if (!category || !category.localizedCategoryDetails) return null

        var details = category.localizedCategoryDetails[this.selectedLanguage]
        if (details) return details.name
    }
}

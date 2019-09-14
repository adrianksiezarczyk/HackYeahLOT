import { Component, OnInit, OnDestroy } from '@angular/core'
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component'
import { CategoryModel, GetCategoryRequest } from '../core/services/CategoryService/models'
import { CategoryService } from '../core/services/CategoryService/CategoryService'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from '../core/services/SharedService/models'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import { Subscription } from 'rxjs/Subscription'
import { CurrentSetService } from '../core/services/CurrentSetService/CurrentSetService'

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
})
export class CategoriesComponent extends BaseDatatableComponent<GetCategoryRequest, CategoryModel>
    implements OnInit, OnDestroy {
    breadcrumbs = Array<any>()
    selectedLanguage = 'pl'
    currentShop: any
    categories

    constructor(private categoryService: CategoryService, private sharedService: SharedService) {
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
            this.response = r
            this.categories = r.data
            //this.setCategories(null)
            this.hideLoader()
        }, this.handleError)
    }
    ngOnInit() {}
    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }
    setCategories(categoryId) {
        if (!categoryId) this.breadcrumbs = []
        let category = this.categories.find(c => c.id == categoryId)

        if (category) {
            this.clearBreadcrumbs(category.id)

            if (!this.breadcrumbs.find(b => b.id == category.id)) {
                let details = category.localizedCategoryDetails.pl
                    ? category.localizedCategoryDetails.pl
                    : category.localizedCategoryDetails.en
                this.breadcrumbs.push({
                    id: category.id,
                    name: details.name,
                    parentId: category.parentId,
                })
            }
        }
        this.request.filter.parentId = categoryId
        this.init()
    }

    clearBreadcrumbs(categoryId) {
        this.breadcrumbs = this.breadcrumbs.filter(b => b.parentId != categoryId)
    }
    update(category) {
        if (!category) return
        let cat = this.categories.find(c => c.id == category.id)
        if (cat) {
            this.categories[this.categories.indexOf(cat)] = category
        } else this.categories.push(category)
    }

    getName(category) {
        var details = category.localizedCategoryDetails[this.selectedLanguage]
        if (details) return details.name
    }

    getPrefix(category) {
        var details = category.localizedCategoryDetails[this.selectedLanguage]
        if (details) return details.productPrefix
    }

    save() {}
    delete(categoryId) {
        this.categoryService.delete(categoryId).subscribe(r => {
            this.init()
        }, this.handleError)
    }
    updateCategoriesOrder() {
        const model = {
            categoriesOrders: this.categories.map(c => {
                return { id: c.id, order: c.order }
            }),
        }
        this.categoryService.updateOrder(model).subscribe(r => {
            this.init()
        }, this.handleError)
    }
}

import { Component, ViewChild, Input } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'

import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { CategoryService } from 'app/core/services/CategoryService/CategoryService'
import { CategoryModel } from 'app/core/services/CategoryService/models'

function getNestedChildren(arr, parent) {
    var out = []
    for (var i in arr) {
        if (arr[i].parentCategoryId == parent) {
            var children = getNestedChildren(arr, arr[i].id)

            if (children.length) {
                arr[i].children = children
            }
            out.push(arr[i])
        }
    }
    return out
}

function treeHeight(node) {
    return node.children.reduce(function(maxHeight, node) {
        return Math.max(maxHeight, treeHeight(node) + 1)
    }, 1)
}

@Component({
    selector: 'products-category-filter-modal-component',
    templateUrl: './products.category.filter.modal.component.html',
})
export class CategoryFilterModalComponent extends BaseModalComponent {
    categories: Array<any> = []
    selectedChildren: Array<any> = []

    constructor(private categoryService: CategoryService) {
        super()
    }

    init(parameter: any): void {
        console.log(parameter)
        this.showLoader()
        this.categoryService.getAliexpressCategories().subscribe(r => {
            this.categories = getNestedChildren(r, null)
            this.show()
            this.hideLoader()
        })
    }

    selectedChange(event: any) {
        let cat
        if (event.target.name == 0) cat = _.find(this.categories, c => c.id == event.target.value)
        else
            cat = _.find(this.selectedChildren[Number(event.target.name) - 1].children, c => c.id == event.target.value)
        console.log(cat)
        this.selectedChildren[Number(event.target.name)] = cat
        this.selectedChildren.splice(Number(event.target.name) + 1)
        console.log(this.selectedChildren)
    }

    filter() {
        let t = Array.from(this.selectedChildren.filter(Boolean))
        if (t.length) this.hide(t.pop().id, true)
        else this.hide(null, true)
    }
}

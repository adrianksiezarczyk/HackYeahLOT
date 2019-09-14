import { Component, ViewChild } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'

import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { CategoryService } from 'app/core/services/CategoryService/CategoryService'
import { CategoryModel } from 'app/core/services/CategoryService/models'

@Component({
    selector: 'category-details-modal-component',
    templateUrl: './category.details.modal.component.html',
})
export class CategoryDetailsModalComponent extends BaseModalComponent {
    category: CategoryModel = <CategoryModel>{ localizedCategoryDetails: { en: {}, pl: {} } }
    @ViewChild('file') file
    public selectedFile: File = <File>{}
    constructor(private categoryService: CategoryService) {
        super()
    }

    init(parameter: any): void {
        console.log(parameter);
        this.showLoader();
        if (!parameter.localizedCategoryDetails) parameter.localizedCategoryDetails = {}

        parameter.localizedCategoryDetails.pl = parameter.localizedCategoryDetails.pl || {}
        parameter.localizedCategoryDetails.en = parameter.localizedCategoryDetails.en || {}
        this.category = Object.assign({}, parameter)
        this.show();
        setTimeout(this.hideLoader,1000);
    }

    save(reload) {
        this.showLoader()
        this.categoryService.update(this.category).subscribe(r => {
            this.hideLoader()
            this.hide(this.category, reload ? true : false)
        }, this.handleError)
    }
    saveCategoryImage() {
        const formData: FormData = new FormData()
        formData.append('file', this.selectedFile, this.selectedFile.name)
        formData.append('categoryId', this.category.id.toString())

        this.categoryService.saveCategoryImage(formData).subscribe(r => {
            this.save(true)
        }, this.handleError)
    }
    descChanged(event, lang) {
        this.category.localizedCategoryDetails[lang].description = event
    }
    cancel() {
        this.hide(null, false)
    }
    onFilesAdded() {
        this.selectedFile = this.file.nativeElement.files[0]
    }
}

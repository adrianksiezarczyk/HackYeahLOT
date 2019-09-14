import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { ImportModel } from 'app/core/services/ProductService/models'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { CurrentSetService } from '../../core/services/CurrentSetService/CurrentSetService'
import { UsersService } from 'app/core/services/UsersService/UsersService'

@Component({
    selector: 'product-import-modal-component',
    templateUrl: './product.import.modal.component.html',
})
export class ProductImportModalComponent extends BaseModalComponent {
    constructor(private productService: ProductService, private usersService: UsersService) {
        super()
    }

    importModel: ImportModel = <ImportModel>{}
    hasPermissionToImport = false

    hasUserPermission(permission) {
        this.hasPermissionToImport = this.usersService.hasPermission(permission)
    }
    init(): void {
        console.log('before', this.hasPermissionToImport)
        this.hasUserPermission('CanImportProductsToShop')
        console.log('after', this.hasPermissionToImport)
        this.show()
    }

    import() {
        this.showLoader()
        const model = {
            aliExpressIds: this.importModel.productId ? [this.importModel.productId] : [],
            aliExpressUrls: this.importModel.productUrl ? [this.importModel.productUrl] : [],
            // categoryId,
            // importId,
            // shopCategoryId,
            shopId: CurrentSetService.currentShop.id,
            importMode: false,
        }
        this.productService.importProduct(model).subscribe(() => {
            this.hide()
            this.hideLoader()
        }, this.handleError)
    }

    pay() {
        // this.showLoader()
        // const model = this.invoiceModel
        // model.countryCode = this.currentCountry.code
        // this.usersService.updateInvoice(model).subscribe(() => {
        //     this.paymentService.createPayment(this.paymentProduct).subscribe(r => {
        //         window.location.href = r.redirectUri
        //     }, this.handleError)
        // }, this.handleError)
    }
}

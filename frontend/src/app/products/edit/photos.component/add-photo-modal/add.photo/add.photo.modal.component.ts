import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { ImportModel } from 'app/core/services/ProductService/models'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { CurrentSetService } from '../../core/services/CurrentSetService/CurrentSetService'
import { UsersService } from 'app/core/services/UsersService/UsersService'

@Component({
    selector: 'add-photo-modal-component',
    templateUrl: './add.photo.modal.component.html',
})
export class AddPhotoModalComponent extends BaseModalComponent {
    @ViewChild('photoFile') photoFile
    @Input()  productId: null

    constructor(private productService: ProductService) {
        super()
    }

    init(): void {
        this.show()
    }
    add() {
        this.showLoader()
        var file = this.photoFile.nativeElement.files[0]
        this.convertFileToBase64(file).then(data => {
            this.productService
                .addPhoto({
                    fileName: file.name,
                    file: data.data,
                    productId: this.productId
                })
                .subscribe(r => {
                    this.hide()
                }, this.handleError)
        })
    }

}

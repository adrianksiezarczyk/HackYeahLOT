import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { ImportModel } from 'app/core/services/ProductService/models'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { CurrentSetService } from '../../core/services/CurrentSetService/CurrentSetService'
import { UsersService } from 'app/core/services/UsersService/UsersService'

@Component({
    selector: 'not-available-update-modal-component',
    templateUrl: './notAvailable.update.modal.component.html',
})
export class NotAvailableUpdateModalComponent extends BaseModalComponent {
    constructor(private productService: ProductService, private usersService: UsersService) {
        super()
    }

   
    init(): void {
        this.show()
    }

   
}

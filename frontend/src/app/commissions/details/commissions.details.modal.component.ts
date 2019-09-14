import { Component } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'

import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { CommissionModel } from 'app/core/services/CommissionService/models'
import { CommissionService } from 'app/core/services/CommissionService/CommissionService'

@Component({
    selector: 'commissions-details-modal-component',
    templateUrl: './commissions.details.modal.component.html',
})
export class CommissionsDetailsModalComponent extends BaseModalComponent {
    commissionModel: CommissionModel = <CommissionModel>{}

    constructor(private commissionService: CommissionService) {
        super()
    }

    init(parameter: any): void {
        this.commissionModel = Object.assign({}, parameter)
        this.show()
    }

    save() {
        this.commissionService.saveRate(this.commissionModel).subscribe(r => {
            this.hideLoader()
            this.hide()
        }, this.handleError)
    }
}

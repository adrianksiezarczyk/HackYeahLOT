import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { ConfigurationService } from 'app/core/services/ConfigurationService/ConfigurationService'

@Component({
    selector: 'payment-settings-modal',
    templateUrl: './payment.settings.modal.html',
})
export class PaymentSettingsModal extends BaseModalComponent {
    constructor(private configurationService: ConfigurationService) {
        super()
    }
    paymentType: any = {}

    init(paymentType): void {
        this.paymentType = paymentType
        this.show()
    }

    save() {
        this.showLoader()
        this.configurationService.update(this.paymentType.configurations).subscribe(r => {
            this.hideLoader()
            this.hide()
        }, this.handleError)
    }
}

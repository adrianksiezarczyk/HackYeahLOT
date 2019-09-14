import { Component } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { StatusService } from 'app/core/services/StatusService/StatusService'
import { EmailTemplateService } from 'app/core/services/EmailTemplateService/EmailTemplateService'

@Component({
    selector: 'status-details-modal-component',
    templateUrl: './status.details.modal.component.html',
})
export class StatusDetailsModalComponent extends BaseModalComponent {
    status: any = {}
    templates: Array<any> = []

    constructor(private statusService: StatusService, private emailTemplateService: EmailTemplateService) {
        super()
    }

    init(parameter: any): void {
        this.status = Object.assign({}, parameter)
        this.showLoader()
        this.emailTemplateService.getSummary().subscribe(r => {
            this.templates = r
            this.hideLoader()
        }, this.handleError)
        this.show()
    }

    save() {
        if (typeof this.status.emailTemplateId === 'undefined') {
            this.status.emailTemplateId = null
        }
        this.statusService.save(this.status).subscribe(r => {
            this.hideLoader()
            this.hide()
        }, this.handleError)
    }  
}

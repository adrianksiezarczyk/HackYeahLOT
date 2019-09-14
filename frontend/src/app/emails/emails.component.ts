import { Component, OnInit } from '@angular/core'
import { StatusService } from '../core/services/StatusService/StatusService'
import { BaseComponent } from '../core/base/base.component'
import { EmailTemplateService } from 'app/core/services/EmailTemplateService/EmailTemplateService'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from '../core/services/SharedService/models'

@Component({
    selector: 'app-emails',
    templateUrl: './emails.component.html',
})
export class EmailsComponent extends BaseComponent implements OnInit {
    templates: Array<any> = []
    newEmailName = ''
    


    constructor(private emailTemplateService: EmailTemplateService, private sharedService: SharedService) {
        super()
        this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.init()
                    break
            }
        })
    }

    ngOnInit() {}

    init() {
        this.showLoader()
        this.emailTemplateService.getSummary().subscribe(r => {
            this.templates = r
            this.hideLoader()
        }, this.handleError)
    }

    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }
    addEmailTemplate() {
        this.showLoader()
        this.emailTemplateService.create({ name: this.newEmailName }).subscribe(r => {
            this.init()
        }, this.handleError)
    }
    deleteEmailTemplate(templateId) {
        this.showLoader()
        this.emailTemplateService.delete(templateId).subscribe(r => {
            this.init()
        }, this.handleError)
    }
}

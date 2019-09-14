import { Component, ViewChild } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { StatusService } from 'app/core/services/StatusService/StatusService'
import { EmailTemplateService } from 'app/core/services/EmailTemplateService/EmailTemplateService'
import { StringsHelper } from '../../shared/utils/strings.helper'
import { StaticPageService } from '../../core/services/StaticPageService/StaticPageService'

@Component({
    selector: 'static-page-details-modal-component',
    templateUrl: './static-page.details.modal.component.html',
})
export class StaticPageDetailsModalComponent extends BaseModalComponent {
    page: any = {}
    @ViewChild('imageFile') imageFile

    constructor(
        private staticPageService: StaticPageService,
        private emailTemplateService: EmailTemplateService,
        private stringsHelper: StringsHelper,
    ) {
        super()
    }

    init(parameter: any): void {
        this.showLoader()
        this.page = Object.assign({}, parameter)
        this.page.content = ''
        if (this.page.contentUrl) {
            fetch(`https://takeshop.ams3.digitaloceanspaces.com/${this.page.contentUrl}`).then(res => {
                res.text().then(text => {
                    this.page.content = text
                    this.hideLoader()
                })
            })
        } else this.hideLoader()
        this.show()
    }

    updateTitle() {
        this.page.url = this.stringsHelper.urlify(this.page.title)
    }

    formatTitle() {
        this.page.url = this.stringsHelper.urlify(this.page.url)
    }

    contentChanged(e) {
        this.page.content = e
    }

    save() {
        let file = this.imageFile.nativeElement.files[0]
        if (this.page.url[0] !== '/') this.page.url = '/' + this.page.url
        if (file) {
            this.convertFileToBase64(file).then(data => {
                this.showLoader()
                let model = Object.assign({}, this.page)
                model.imageName = data.name
                model.imageFile = data.data
                this.staticPageService.save(model).subscribe(r => {
                    this.hideLoader()
                    this.hide(r)
                }, this.handleError)
            })
        } else {
            this.showLoader()
            this.staticPageService.save(this.page).subscribe(r => {
                this.hideLoader()
                this.hide(r)
            }, this.handleError)
        }

        // if (typeof this.status.emailTemplateId === 'undefined') {
        //     this.status.emailTemplateId = null
        // }
        // this.statusService.save(this.status).subscribe(r => {
        //     this.hideLoader()
        //     this.hide()
        // }, this.handleError)
    }
}

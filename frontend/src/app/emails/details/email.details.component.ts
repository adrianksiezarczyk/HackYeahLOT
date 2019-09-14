import { Component, OnInit } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { StatusService } from 'app/core/services/StatusService/StatusService'
import { EmailTemplateService } from 'app/core/services/EmailTemplateService/EmailTemplateService'
import { BaseComponent } from 'app/core/base/base.component'
import { ActivatedRoute } from '@angular/router'

declare var $: any
@Component({
    selector: 'email-details-component',
    templateUrl: './email.details.component.html',
})
export class EmailDetailsComponent extends BaseComponent implements OnInit {
    templates: Array<any> = []
    selectedTemplate: any = {}
    selectedLanguageId: number = null
    templateId: number = null

    //tagList:Array<string> = ['imie','nazwisko', 'ulica','kraj','kod','produkt','cena','dostawa','waluta','nieoplacone zamowienie - url','przekierowanie do payu - url']
    currentSelectionOffset = 0
    tagsList: any = {
        Order: [
            'order_number',
            'order_status',
            'order_date',
            'delivery_type',
            'currency',
            'total_price',
            'not_paid_order_url',
            'payu_redirect_url',
        ],
        Products: ['product_image', 'product_name', 'product_price', 'variants'],
        Customer: ['first_name', 'last_name', 'address', 'country', 'post_code'],
        Shop: ['shop_name', 'shop_logo'],
    }

    constructor(private emailTemplateService: EmailTemplateService, private activatedRoute: ActivatedRoute) {
        super()
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.init(params.id)
        })
    }

    init(id: any) {
        this.templateId = id
        this.showLoader()
        this.emailTemplateService.get(id).subscribe(r => {
            this.templates = r
            this.selectedTemplate = r.find(l => l.language.id == 1)
            if (this.selectedTemplate) this.selectedLanguageId = this.selectedTemplate.language.id
            this.hideLoader()
        }, this.handleError)
    }

    save() {
        //TODO
        //after translation tags, they should be retranslated to previous form
        this.showLoader()
        if (this.selectedTemplate.emailTemplateContentId)
            this.emailTemplateService.save(this.selectedTemplate).subscribe(r => {
                this.hideLoader()
            }, this.handleError)
        else
            this.emailTemplateService.createContent(this.selectedTemplate).subscribe(r => {
                this.templates.push(r)
                this.selectedTemplate = r
                this.hideLoader()
            }, this.handleError)
    }
    descChanged(event) {
        this.selectedTemplate.content = event
    }
    changeSelectedTemplate(languageId) {
        this.showLoader()
        this.selectedTemplate = this.templates.find(t => t.language.id == languageId) || {
            languageId,
            emailTemplateId: this.templateId,
        }

        setTimeout(this.hideLoader)
    }
    clickTag(event) {
        const textToInsert = event.target.innerText
        const textBox = jQuery('.note-editable')
        const textBoxInnerHtml = textBox[0].innerText
        const textBoxNewText =
            textBoxInnerHtml.slice(0, this.currentSelectionOffset) +
            textToInsert +
            textBoxInnerHtml.slice(this.currentSelectionOffset)
        textBox[0].innerText = textBoxNewText
    }
    blur() {
        this.currentSelectionOffset = window.getSelection().anchorOffset
    }
}

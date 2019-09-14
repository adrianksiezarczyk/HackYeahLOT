import { Component, OnInit } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { StatusService } from 'app/core/services/StatusService/StatusService'
import { DocumentsService } from 'app/core/services/DocumentsService/DocumentsService'
import { BaseComponent } from 'app/core/base/base.component'
import { ActivatedRoute } from '@angular/router'
import { LANGUAGES } from '../../shared/constants'

@Component({
    selector: 'document-details-component',
    templateUrl: './document.details.component.html',
})
export class DocumentDetailsComponent extends BaseComponent implements OnInit {
    documents: any = {}
    selectedDocument: any = {}
    selectedLanguageId: number = null
    documentId: number = null

    constructor(private documentsService: DocumentsService, private activatedRoute: ActivatedRoute) {
        super()
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.init(params.id)
        })
    }

    init(id: any) {
        this.documentId = id
        this.showLoader()
        this.documentsService.get(id).subscribe(r => {
            this.documents = r
            this.selectedDocument = r[0]
            this.selectedLanguageId = r[0].language.id
            this.hideLoader()
        }, this.handleError)
    }

    save() {
        this.showLoader()
        if (this.selectedDocument.documentContentId)
            this.documentsService.save(this.selectedDocument).subscribe(r => {
                this.hideLoader()
            }, this.handleError)
        else
            this.documentsService.create(this.selectedDocument).subscribe(r => {
                this.documents.push(r)
                this.selectedDocument = r
                this.hideLoader()
            }, this.handleError)
    }
    descChanged(event) {
        this.selectedDocument.content = event
    }
     changeSelectedDocument(languageId) {
        this.showLoader()
        this.selectedDocument = this.documents.find(t => t.language.id == languageId) || {
            languageId,
            documentId: this.documentId,
        }

        setTimeout(this.hideLoader)
    }
}

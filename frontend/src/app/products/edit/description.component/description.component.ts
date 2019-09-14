import { Component, OnInit, Input } from '@angular/core'
import { BaseComponent } from '../../../core/base/base.component'
import { ProductService } from 'app/core/services/ProductService/ProductService'
import { ConfigurationService } from 'app/core/services/ConfigurationService/ConfigurationService'

@Component({
    selector: 'description-settings',
    templateUrl: './description.component.html',
})
export class DescriptionComponent extends BaseComponent implements OnInit {
    @Input() productId: number
    @Input() hiddenDescriptionPhotos: boolean

    localizedDetails: Array<any> = []
    selectedLanguageId = 1
    selectedDetails: any = {}
    languages: Array<any> = []

    constructor(private productService: ProductService, private configurationService: ConfigurationService) {
        super()
    }

    ngOnInit() {
        this.configurationService.getLanguages().subscribe(r => {
            this.languages = r
        })

        this.showLoader()
        this.productService.getLocalizedDetails(this.productId).subscribe(r => {
            this.localizedDetails = r
            this.languageChanged()
        }, this.handleError)
    }

    languageChanged() {
        this.showLoader()
        setTimeout(() => {
            this.selectedDetails = this.localizedDetails.find(ld => ld.languageId == this.selectedLanguageId) || {}
            this.hideLoader()
        }, 200)
    }

    save() {
        this.showLoader()
        this.productService
            .saveLocalizedDetails({
                localizedProductDetails: this.localizedDetails,
                productId: this.productId,
                descriptionPhotosVisibility: this.hiddenDescriptionPhotos,
            })
            .subscribe(r => {
                this.ngOnInit()
            }, this.handleError)
    }
    getLanguageName(langId) {
        let lang = this.languages.find(l => l.id == langId)
        return lang ? lang.name : ''
    }
    descChanged(event) {
        let ld = this.localizedDetails.find(l => l.languageId == this.selectedLanguageId) || {}
        ld.fullDescription = event
    }
    shortDescChanged(event) {
        let ld = this.localizedDetails.find(l => l.languageId == this.selectedLanguageId) || {}
        ld.shortDescription = event
    }
    setDefaultLang() {
        if (
            confirm(
                'WARNING: Setting default language will OVERWRITE your current name and description of selected product! This might take about 30 seconds. Continue?',
            )
        ) {
            this.showLoader()
            this.productService.setDefaultLocalizedDetails(this.productId, this.selectedLanguageId).subscribe(r => {
                this.ngOnInit()
            }, this.handleError)
        }
    }
    changeDescriptionPhotosVisibility() {
        this.productService
            .saveLocalizedDetails({
                localizedProductDetails: [],
                productId: this.productId,
                descriptionPhotosVisibility: this.hiddenDescriptionPhotos,
            })
            .subscribe(r => {
            }, this.handleError)
    }
}

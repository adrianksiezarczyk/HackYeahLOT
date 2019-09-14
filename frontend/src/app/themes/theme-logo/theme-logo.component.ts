import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { BaseComponent } from 'app/core/base/base.component'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'

@Component({
    selector: 'theme-logo',
    templateUrl: './theme-logo.component.html',
})
export class ThemeLogoComponent extends BaseComponent implements OnInit {
    @ViewChild('logoFile') logoFile
    @ViewChild('faviconFile') faviconFile

    @Input() logoUrl
    @Input() faviconUrl

    @Output() private refresh: EventEmitter<any> = new EventEmitter()

    constructor(private shopsService: ShopsService) {
        super()
    }

    ngOnInit() {}

    uploadLogo() {
        this.showLoader()
        var file = this.logoFile.nativeElement.files[0]
        this.convertFileToBase64(file).then(data => {
            this.shopsService
                .saveCurrentShopLogo({
                    fileName: file.name,
                    file: data.data,
                })
                .subscribe(r => {
                    this.refresh.emit()
                    this.hideLoader()
                }, this.handleError)
        })
    }
    uploadFavicon() {
        this.showLoader()
        var file = this.faviconFile.nativeElement.files[0]
        this.convertFileToBase64(file).then(data => {
            this.shopsService
                .saveCurrentShopFavicon({
                    fileName: file.name,
                    file: data.data,
                })
                .subscribe(r => {
                    this.refresh.emit()
                    this.hideLoader()
                }, this.handleError)
        })
    }
}

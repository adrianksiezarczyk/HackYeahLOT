import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { BaseComponent } from 'app/core/base/base.component'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'

@Component({
    selector: 'theme-meta-image',
    templateUrl: './theme-meta-image.component.html',
})
export class ThemeMetaImageComponent extends BaseComponent implements OnInit {
    @ViewChild('metaFile') metaFile

    @Input() metaUrl

    @Output() private refresh: EventEmitter<any> = new EventEmitter()

    constructor(private shopsService: ShopsService) {
        super()
    }

    ngOnInit() {}

    uploadMetaImage() {
        this.showLoader()
        var file = this.metaFile.nativeElement.files[0]
        this.convertFileToBase64(file).then(data => {
            this.shopsService
                .saveCurrentShopMetaImage({
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

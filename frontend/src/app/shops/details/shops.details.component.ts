import { Component, OnInit, ViewChild } from '@angular/core'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'
import { BaseComponent } from 'app/core/base/base.component'
import { ActivatedRoute } from '@angular/router'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import { CurrentSetService } from '../../core/services/CurrentSetService/CurrentSetService';

@Component({
    selector: 'app-shops-details',
    templateUrl: './shops.details.component.html',
})
export class ShopsDetailsComponent extends BaseComponent implements OnInit {
    constructor(private shopsService: ShopsService, private activatedRoute: ActivatedRoute) {
        super()
    }
    shop: any = {}
    addNew = false
    newBanner: any = {}

    @ViewChild('file') file
    public selectedFile: File = <File>{}

    @ViewChild('logoFile') logoFile
    public selectedLogoFile: File = <File>{}

    ngOnInit() {
        this.showLoader()
        this.addNew = false
        this.activatedRoute.params.subscribe(params => {
            this.shopsService.getDetails(params.id).subscribe(s => {
                this.shop = s
                this.hideLoader()
            })
        })
    }
    saveShop() {
        this.shopsService.put(this.shop).subscribe(r => {
            this.ngOnInit()
        }, this.handleError)
    }
    onFilesAdded() {
        console.log(this.file.nativeElement.files)
        this.selectedFile = this.file.nativeElement.files[0]
    }
    onLogoFileAdded() {
        this.selectedLogoFile = this.logoFile.nativeElement.files[0]
    }
    saveLogo() {     
        this.shopsService.saveLogo({
            name:  this.selectedLogoFile.name,
            file: this.convertFileToBase64(this.selectedLogoFile),
            shopId:   CurrentSetService.currentShop
        }).subscribe(r => {
            this.ngOnInit()
        }, this.handleError)
    }
    save() {
        const formData: FormData = new FormData()
        formData.append('file', this.selectedFile, this.selectedFile.name)
        this.newBanner.shopId = this.shop.id
        for (var key in this.newBanner) {
            formData.append(key, this.newBanner[key])
        }

        this.shopsService.addBanner(formData).subscribe(r => {
            this.ngOnInit()
        }, this.handleError)
    }

    delete(id) {
        if (!confirm('Na pewno?')) return

        this.shopsService.deleteBanner(id).subscribe(r => {
            this.ngOnInit()
        }, this.handleError)
    }
}

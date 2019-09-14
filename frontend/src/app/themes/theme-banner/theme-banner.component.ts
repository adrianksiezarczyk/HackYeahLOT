import { Component, OnInit, ViewChild } from '@angular/core'
import { BannerService } from 'app/core/services/BannerService/BannerService'
import { BaseComponent } from 'app/core/base/base.component'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'
import { SharedService } from '../../core/services/SharedService/SharedService'
import { SharedEventName } from '../../core/services/SharedService/models'

@Component({
    selector: 'theme-banner',
    templateUrl: './theme-banner.component.html',
})
export class ThemeBannerComponent extends BaseComponent implements OnInit {
    constructor(private bannerService: BannerService, private sharedService: SharedService) {
        super()
        this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.init()
                    break
            }
        })
    }
    @ViewChild('bannerFile') bannerFile

    banners
    addNew = false
    newBanner: any = {}

    ngOnInit() {}
    init() {
        this.showLoader()
        this.bannerService.get().subscribe(r => {
            this.banners = r
            this.newBanner.languageId = 1
            this.hideLoader()
        }, this.handleError)
    }
    deleteBanner(bannerId) {
        if (!confirm('Na pewno?')) return
        this.showLoader()
        this.bannerService.delete(bannerId).subscribe(r => {
            this.init()
        }, this.handleError)
    }
    updateBanner(banner) {
        this.showLoader()
        this.bannerService.update(banner).subscribe(r => {
            this.init()
        }, this.handleError)
    }

    save() {
        this.showLoader()
        var file = this.bannerFile.nativeElement.files[0]
        this.convertFileToBase64(file).then(data => {
            this.bannerService
                .add({
                    file: data.data,
                    fileName: file.name,
                    ...this.newBanner,
                })
                .subscribe(r => {
                    this.init()
                }, this.handleError)
        })
    }
}

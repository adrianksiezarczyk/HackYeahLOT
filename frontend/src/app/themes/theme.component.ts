import { Component, OnInit } from '@angular/core'
import { ThemeService } from 'app/core/services/ThemeService/ThemeService'
import { BaseComponent } from 'app/core/base/base.component'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from '../core/services/SharedService/models'

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
})
export class ThemeComponent extends BaseComponent implements OnInit {
    currentTab: string = 'styles'

    themeArray: Array<any> = []
    logoUrl: any
    faviconUrl: any
    metaUrl: any

    constructor(
        private themeService: ThemeService,
        private shopsService: ShopsService,
        private sharedService: SharedService,
    ) {
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
        this.themeService.get().subscribe(r => {
            this.themeArray = r.keys
            this.logoUrl = r.logoUrl
            this.faviconUrl = r.faviconUrl
            this.metaUrl = r.metaImageUrl
            this.hideLoader()
        }, this.handleError)
    }
    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }
}

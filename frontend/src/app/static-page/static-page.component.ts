import { Component, OnInit } from '@angular/core'
import { BaseComponent } from '../core/base/base.component'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from '../core/services/SharedService/models'
import { StaticPageService } from '../core/services/StaticPageService/StaticPageService'
import { UsersService } from 'app/core/services/UsersService/UsersService'

@Component({
    selector: 'app-static-page',
    templateUrl: './static-page.component.html',
})
export class StaticPageComponent extends BaseComponent implements OnInit {
    json = require('./staticPagesBase64.json')
    staticPages: any = []

    constructor(
        private sharedService: SharedService,
        private staticPageService: StaticPageService,
        private usersService: UsersService,
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

    canUserManageArticles() {
        return this.usersService.hasPermission('CanManageArticles')
    }

    ngOnDestroy(): void {
        if (this.sharedService) this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }

    init() {
        this.showLoader()
        this.staticPageService.get().subscribe(r => {
            this.hideLoader()
            this.staticPages = r
        }, this.handleError)
    }

    delete(id) {
        if (confirm('Are you sure?')) {
            this.staticPageService.delete(id).subscribe(r => {
                this.hideLoader()
                this.init()
            }, this.handleError)
        }
    }

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core'
import { BaseComponent } from '../core/base/base.component'
import { StoriesService } from 'app/core/services/StoriesService/StoriesService'
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component'
import { GetStoriesModel, StoryModel } from 'app/core/services/StoriesService/models'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from '../core/services/SharedService/models'
import { UsersService } from 'app/core/services/UsersService/UsersService'

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
})
export class StoriesComponent extends BaseDatatableComponent<GetStoriesModel, StoryModel> implements OnInit {
    json = require('./storiesBase64.json')
    constructor(
        private storiesService: StoriesService,
        private sharedService: SharedService,
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

    canUserManageStories() {
        return this.usersService.hasPermission('CanManageStories')
    }

    ngOnInit() {
    }
    init() {
        this.showLoader()
        this.storiesService.get(this.request).subscribe(r => {
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }
    delete(id) {
        this.storiesService.delete(id).subscribe(r => {
            this.init()
        })
    }
    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }
}

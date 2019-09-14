import { Component, OnInit, OnDestroy, DoCheck, ViewChild } from '@angular/core'
import { BaseComponent } from '../core/base/base.component'
import { UsersService } from '../core/services/UsersService/UsersService'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import { SharedEventName } from '../core/services/SharedService/models'
import { SharedService } from '../core/services/SharedService/SharedService'
import { CurrentSetService } from '../core/services/CurrentSetService/CurrentSetService'
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component'
import { GetUserRequest, UserModel } from 'app/core/services/UsersService/models'
import { Subscription } from 'rxjs/Subscription'
import { initDomAdapter } from '@angular/platform-browser/src/browser'

declare var $

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent extends BaseDatatableComponent<GetUserRequest, UserModel> implements OnInit, OnDestroy {
    users
    permissions = []

    constructor(private usersService: UsersService, private sharedService: SharedService) {
        super()

        this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.init()
                    break
            }
        })
        this.request.filter.hideTeamMembers = true
        this.request.sortOrder = 'desc'
        this.request.sortColumnName = 'id'
    }

    ngOnInit() {
        this.init()
    }
    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }

    init() {
        this.showLoader()

        this.usersService.get(this.request).subscribe(r => {
            this.users = r.data
            this.response = r

            this.hideLoader()
        }, this.handleError)
        this.permissions = StorageService.getItem(StorageKeys.permissions)
    }
    deleteUser(id) {
        if (confirm('Do you really want to remove user?')) {
            this.showLoader()
            this.usersService.delete(id).subscribe(r => {
                this.init()
            }, this.handleError)
        }
    }

    canDeleteUser() {
        return this.permissions.includes('CanManageAdministrators')
    }

    changeShop = shop => {
        $('#shop-select')
            .val(shop.id)
            .change()
        CurrentSetService.updateCurrentShop(shop)
    }
}

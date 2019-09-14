import { Component, OnInit } from '@angular/core'
import { LoginInfoComponent } from '../../user/login-info/login-info.component'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import { CurrentSetValidity } from 'app/core/services/CurrentSetValidity/CurrentSetValidity'
import { SharedService } from 'app/core/services/SharedService/SharedService'
import { BaseComponent } from 'app/core/base/base.component'
import { SharedEventName } from 'app/core/services/SharedService/models'

@Component({
    selector: 'sa-navigation',
    templateUrl: './navigation.component.html',
})
export class NavigationComponent extends BaseComponent implements OnInit {
    constructor(private sharedService: SharedService) {
        super()
        this.sharedSubscription = sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.AccountValidChanged:
                    this.isValid = CurrentSetValidity.isValid
                    break
            }
        })
    }
    permissions: Array<string> = []
    isValid = CurrentSetValidity.isValid
    ngOnDestroy(): void {
        if (this.sharedSubscription) this.sharedSubscription.unsubscribe()
    }
    ngOnInit() {
        console.log(CurrentSetValidity.isValid)
        this.permissions = StorageService.getItem(StorageKeys.permissions)
    }

    requiredRole(role: string) {
        return this.permissions && this.permissions.includes(role)
    }
}

import { Component, OnInit } from '@angular/core'
import { ConfigurationService } from 'app/core/services/ConfigurationService/ConfigurationService'
import { BaseComponent } from 'app/core/base/base.component'
import { UsersService } from 'app/core/services/UsersService/UsersService'
import { AuthService } from 'app/core/services/AuthService/AuthService'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from '../core/services/SharedService/models'
import { PlanService } from 'app/core/services/PlanService/PlanService'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent extends BaseComponent implements OnInit {
    //currentTab = 'basic'
    currentTab = 'subscriptionAndPayment'
    selectedPlanNumber = 1

    plans = []
    user: any = {}
    changePasswordModel = {}
    editMode = false
    changePasswordMode = false
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private sharedService: SharedService,
        private planService: PlanService,
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

    getCurrentUser = this.usersService.getCurrent()
    getPlans = this.planService.get()

    ngOnInit() {
        this.showLoader()
    }

    init() {
        this.showLoader()
        Observable.forkJoin([this.getCurrentUser, this.getPlans]).subscribe(data => {
            this.user = data[0]
            this.plans = data[1]
            this.selectedPlanNumber = data[1].find(p => p.isSelected).id
            this.hideLoader()
        }, this.handleError)
    }

    save() {
        this.showLoader()
        this.usersService.updateCurrent(this.user).subscribe(r => {
            this.editMode = false
            this.init()
        }, this.handleError)
    }
    changePassword() {
        this.showLoader()
        this.authService.changePassword(this.changePasswordModel).subscribe(r => {
            this.hideLoader()
            this.changePasswordModel = {}
            this.changePasswordMode = false
            setTimeout(() => {
                alert('Hasło zmienione!')
            }, 100)
        }, this.handleError)
    }

    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }
}

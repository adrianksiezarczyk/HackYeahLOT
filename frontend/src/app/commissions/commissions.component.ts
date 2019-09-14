import { Component, OnInit, DoCheck, ViewChild } from '@angular/core'
import { CommissionService } from 'app/core/services/CommissionService/CommissionService'
import { CommissionModel, GetCommissionRequest } from '../core/services/CommissionService/models'
import { BaseDatatableComponent } from '../core/base/base.datatable.component'
import { SharedEventName } from '../core/services/SharedService/models'
import { SharedService } from '../core/services/SharedService/SharedService'

@Component({
    selector: 'app-commissions',
    templateUrl: './commissions.component.html',
})
export class CommissionsComponent extends BaseDatatableComponent<GetCommissionRequest, CommissionModel>
    implements OnInit {
    constructor(private commissionService: CommissionService, private sharedService: SharedService) {
        super()
        this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.init()
                    break
            }
        })
    }

    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }

    ngOnInit() {}

    init() {
        this.showLoader()
        this.commissionService.get(this.request).subscribe(r => {
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }

    delete(id: number) {
        if (confirm('Na pewno chcesz usunąć ten wpis?')) {
            this.showLoader()
            this.commissionService.deleteRate(id).subscribe(r => {
                this.hideLoader()
                this.init()
            }, this.handleError)
        }
    }
}

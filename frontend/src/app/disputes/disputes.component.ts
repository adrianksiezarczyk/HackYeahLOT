import { Component, OnInit, OnDestroy } from '@angular/core'
import { OrderService } from 'app/core/services/OrderService/OrderService'
import { BaseComponent } from '../core/base/base.component'
import { PaginationRequestModel, PaginationResponseModel } from 'app/core/base/models'
import { OrderModel, GetOrdersRequest } from '../core/services/OrderService/models'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from 'app/core/services/SharedService/models'
import { BaseDatatableComponent } from '../core/base/base.datatable.component'
import { StorageService } from '../core/services/StorageService/StorageService'
import { StorageKeys } from '../core/services/StorageService/StorageKeys'
import { Subscription } from 'rxjs/Subscription'
import { CsvParser } from 'app/shared/utils/csv.parser'
import { DisputesService } from '../core/services/DisputesService/DisputeService'
import { GetDisputeModel, DisputeModel, DisputeStatusId } from '../core/services/DisputesService/models'
import { UsersService } from 'app/core/services/UsersService/UsersService';

@Component({
    selector: 'app-disputes',
    templateUrl: './disputes.component.html',
})
export class DisputesComponent extends BaseDatatableComponent<GetDisputeModel, DisputeModel> implements OnInit {
    readonly DisputeStatusId: typeof DisputeStatusId = DisputeStatusId
    
    constructor(private disputeService: DisputesService, private sharedService: SharedService, private usersService: UsersService) {
        super()
        this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
        
                case SharedEventName.ShopChanged:
                    this.init()
                    break
            }
        })
    }

    canUserSeeDisputes() {
        return this.usersService.hasPermission('CanSeeDisputes')
    }

    ngOnInit() {}

    init() {
        this.showLoader()
        this.disputeService.get(this.request).subscribe(r => {
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }
    verify(id: number) {
        if (!confirm('Czy na pewno potwierdzasz zweryfikowanie disputa i chcesz zamknąć tą sprawe?')) return
        this.disputeService.verify(id).subscribe(() => {
            this.init()
        }, this.handleError)
    }
    getStatusLabel(dispute) {
        switch (dispute.statusId) {
            case 1:
                return 'label label-default'
            case 2:
                return 'label label-success'
            case 3:
                return 'label label-danger'
            case 4:
                return 'label label-warning'
            case 5:
                return 'label label-info'
            default:
                return 'label label-default'
        }
    }

    ngOnDestroy(): void {
        this.sharedSubscription.unsubscribe()
        this.hideLoader()
    }
}

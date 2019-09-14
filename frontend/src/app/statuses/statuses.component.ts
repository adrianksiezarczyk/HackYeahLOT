import { Component, OnInit } from '@angular/core'
import { StatusService } from '../core/services/StatusService/StatusService'
import { BaseComponent } from '../core/base/base.component'
import { StatusModel } from 'app/core/services/StatusService/models'
import { SharedEventName } from '../core/services/SharedService/models'
import { SharedService } from '../core/services/SharedService/SharedService'

@Component({
    selector: 'app-statuses',
    templateUrl: './statuses.component.html',
})
export class StatusesComponent extends BaseComponent implements OnInit {
    statuses: Array<StatusModel> = []

    constructor(private statusService: StatusService, private sharedService: SharedService) {
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
        this.statusService.get().subscribe(r => {
            this.statuses = r
            this.hideLoader()
        }, this.handleError)
    }

    delete(id) {
        if (confirm('Are you sure?')) {
            this.statusService.delete(id).subscribe(r => {
                this.hideLoader()
            }, this.handleError)
        }
    }
}

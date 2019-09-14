import { Component, OnInit, OnDestroy } from '@angular/core'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from 'app/core/services/SharedService/models'
import { BaseDatatableComponent } from '../core/base/base.datatable.component'
import { OfferService } from '../core/services/OfferService/OfferService'

declare var $

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
})
export class OffersComponent extends BaseDatatableComponent<any, any> implements OnInit, OnDestroy {
    constructor(private sharedService: SharedService, private offerService: OfferService) {
        super()
        this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.init()
                    break
            }
        })
        this.request.sortColumnName = 'id'
        this.request.sortOrder = 'desc'
    }

    ngOnDestroy(): void {
        if (this.sharedSubscription) this.sharedSubscription.unsubscribe()
    }

    ngOnInit() {}

    init() {
        $('.select2-container').css('border', '1px solid #ccc');
        let selectedTags = null;
        let first = typeof $('#tags-select').select2 === 'undefined'
        if(!first)
            selectedTags = $('#tags-select').select2('data')
        if (selectedTags && selectedTags.length) this.request.filter.tags = selectedTags.map(s => s.text).join(',')
        this.showLoader()
        this.offerService.get(this.request).subscribe(r => {
            console.log(r)
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }

    focus() {
        $('#tags-select').focus()
    }

    delete(offerId){
        if (confirm('Na pewno?')) {
            this.showLoader()
            this.offerService.delete(offerId).subscribe(r => {
                this.init()
                this.hideLoader()
            }, this.handleError)
        }
    }
}

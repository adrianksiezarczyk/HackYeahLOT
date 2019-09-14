import { Component, OnInit, OnDestroy } from '@angular/core'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from 'app/core/services/SharedService/models'
import { BaseDatatableComponent } from '../core/base/base.datatable.component'
import { OfferService } from '../core/services/OfferService/OfferService'

declare var $

@Component({
    selector: 'app-buy-shop',
    templateUrl: './buy-shop.component.html',
})
export class BuyShopComponent extends BaseDatatableComponent<any, any> implements OnInit, OnDestroy {
    tags: any

    constructor(private sharedService: SharedService, private offerService: OfferService) {
        super()
        this.request.sortColumnName = 'order'
        this.request.sortOrder = 'desc'
        this.request.pageSize = 1000
        this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.init()
                    break
            }
        })
    }

    ngOnDestroy(): void {
        if (this.sharedSubscription) this.sharedSubscription.unsubscribe()
    }

    ngOnInit() {}

    init() {
        let selectedTags = null
        let first = typeof $('#tags-select').select2 === 'undefined'
        if (!first) selectedTags = $('#tags-select').select2('data')
        if (selectedTags && selectedTags.length) this.request.filter.tags = selectedTags.map(s => s.text).join(',')
        this.showLoader()
        this.offerService.get(this.request).subscribe(r => {
            this.response = r
            this.offerService.getTags().subscribe(r => {
                $('.select2-container').css('border', '1px solid #ccc')
                this.tags = r
                this.hideLoader()
            }, this.handleError)
        }, this.handleError)
    }

    selectTag(tag) {
        let alreadySelected = this.request.filter.tags ? this.request.filter.tags.split(',') : []
        $('#tags-select')
            .select2({ data: this.tags })
            .val(alreadySelected.concat(tag))
        setTimeout(() => {
            $('#tags-select')
                .select2({ data: this.tags })
                .trigger('update')
        }, 150)
    }
}

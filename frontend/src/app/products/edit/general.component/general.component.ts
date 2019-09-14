import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { AliExpressOffer } from '../../../core/services/ProductService/models'
import { ProductService } from '../../../core/services/ProductService/ProductService'
import { BaseComponent } from 'app/core/base/base.component'
import { UsersService } from 'app/core/services/UsersService/UsersService'

@Component({
    selector: 'general-settings',
    templateUrl: './general.component.html',
})
export class GeneralComponent extends BaseComponent implements OnInit {
    @Input() product: any
    @Output() private refresh: EventEmitter<any> = new EventEmitter<any>()

    constructor(private productService: ProductService, private usersService: UsersService) {
        super()
    }

    ngOnInit() {}

    CanUserManageFilters = () => {
        return this.usersService.hasPermission('CanUpdateGlobalProduct')
    }

    updateSelectedOffers(updatedOffer: AliExpressOffer) {
        const updateView = () => {
            this.product.aliExpressOffers.forEach(o => {
                if (o.aliExpressId != updatedOffer.aliExpressId) o.current = false
            })
        }
        if (updatedOffer.new) {
            updateView()
            return
        }

        this.showLoader()
        this.productService.updateSelectedOffer(this.createAliExpressModel(updatedOffer)).subscribe(r => {
            updateView()
            this.hideLoader()
        }, this.handleError)
    }
    delete(aliExpressOffer: AliExpressOffer) {
        if (aliExpressOffer.new) {
            this.removeFromOffers(aliExpressOffer)
            //this.product.aliExpressOffers.find(o => o.aliExpressId == this.previousOfferId).current = true
            return
        }
        if (confirm('Jesteś pewien? Ten numer zostanie całkowicie usunięty z bazy!')) {
            this.showLoader()
            this.productService.deleteAliExpressOffer(aliExpressOffer.aliExpressId).subscribe(r => {
                this.removeFromOffers(aliExpressOffer)
                this.hideLoader()
            }, this.handleError)
        }
    }

    removeFromOffers(aliExpressOffer) {
        this.product.aliExpressOffers.splice(this.product.aliExpressOffers.indexOf(aliExpressOffer), 1)
    }

    addNewOffer() {
        const newOffer: AliExpressOffer = <AliExpressOffer>{ current: true, new: true }
        this.product.aliExpressOffers.push(newOffer)
        this.updateSelectedOffers(newOffer)
    }
    saveNewOffer(aliExpressOffer: AliExpressOffer) {
        this.showLoader()
        this.productService.saveNewAliExpressOffer(this.createAliExpressModel(aliExpressOffer)).subscribe(r => {
            // this.newMode = false
            aliExpressOffer.new = false
            this.hideLoader()
        }, this.handleError)
    }

    createAliExpressModel(aliExpressOffer: AliExpressOffer) {
        return {
            productId: this.product.id,
            aliExpressId: aliExpressOffer.aliExpressId,
        }
    }
    save() {
        this.showLoader()
        this.productService.saveGlobalProductDetails(this.product).subscribe(r => {
            this.hideLoader()
        }, this.handleError)
    }
}

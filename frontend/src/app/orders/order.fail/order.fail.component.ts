import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'
import 'rxjs/add/observable/zip'
import { BaseComponent } from 'app/core/base/base.component'
import { OrderDetailsModel, GetOrderFailRequest, OrderFailModel } from '../../core/services/OrderService/models'
import { OrderService } from '../../core/services/OrderService/OrderService'
import { ActivatedRoute } from '@angular/router'
import { BaseDatatableComponent } from 'app/core/base/base.datatable.component'
import { CurrentSetService } from 'app/core/services/CurrentSetService/CurrentSetService'
import { SharedEventName } from 'app/core/services/SharedService/models'
import { SharedService } from 'app/core/services/SharedService/SharedService'

@Component({
    selector: 'order-fail-component',
    templateUrl: './order.fail.component.html',
})
export class OrderFailComponent extends BaseDatatableComponent<GetOrderFailRequest, OrderFailModel> implements OnInit {
    newCombinationImage = null
    constructor(private orderService: OrderService, private sharedService: SharedService) {
        super()
        this.sharedSubscription = sharedService.currentMessage.subscribe(r => {
            switch (r.name) {
                case SharedEventName.ShopChanged:
                    this.response.data = []
                    this.init()
                    break
            }
        })
        this.request.sortColumnName = 'id'
        this.request.sortOrder = 'desc'
    }

    ngOnInit() {
        if (CurrentSetService.currentShop.id) this.init()
    }

    updateAltnernateCombination(fail) {
        var newCom = fail.combinations.find(f => f.id == fail.newId)

        if (!newCom) return
        var variantWithPhoto = newCom.variants.find(v => !!v.imageUrl)

        if (!variantWithPhoto) return

        fail.alternativeCombination = variantWithPhoto.imageUrl
    }
    init() {
        this.showLoader()
        this.orderService.getFailedOrderProducts(this.request).subscribe(r => {
            this.response = r
            this.hideLoader()
        }, this.handleError)
    }

    getFailDetails(fail) {
        fail.loadingCombinations = true
        this.orderService.getFailDetails(fail.orderProductId).subscribe(mc => {
            fail.avaliableCombinations = mc.avaliableCombinations
            fail.orderProductVariants = mc.orderProductVariants
            fail.loadingCombinations = false
        }, this.handleError)
    }
    getImageUrl(url) {
        if (!url) return null
        if (url.includes('http')) return url
        return `https://images.take.shop//${url}.jpg_250x250.jpg_.webp`
    }

    getCombinationModalDetails(fail) {
        var newCombiantion = <any>{ variants: [] }
        if (fail.avaliableCombinations) {
            newCombiantion = fail.avaliableCombinations.find(a => a.id == fail.newCombinationId)
            if (!newCombiantion) newCombiantion = <any>{ variants: [] }
        }

        var variants = newCombiantion.variants.length > 0 ? newCombiantion.variants : fail.orderProductVariants

        if (variants)
            variants = variants.map(v => {
                if (!v.displayName) v.displayName = v.originalName
                if (!v.displayValue) v.displayValue = v.originalValue
                return v
            })
        console.log(variants)
        return {
            orderProductId: fail.orderProductId,
            orderProductVariants: variants,
            failId: fail.id,
        }
    }

    getCombinationImage(fail) {
        var combination = fail.avaliableCombinations.find(ac => ac.id == fail.newCombinationId)

        var variantWithPhoto = combination.variants.find(v => !!v.imageUrl)
        if (variantWithPhoto) fail.newCombinationImage = variantWithPhoto.imageUrl
    }
    deleteFail(failId) {
        if (!confirm('Na pewno?')) return
        this.forceDelete(failId)
    }

    handleCombinationUpdate(failId) {
        if (!failId) return

        var fail = this.response.data.find(f => f.id == failId)

        this.orderService.placeOrder({ orderId: fail.orderId, priority: 2 }).subscribe(() => {
            this.deleteFailWithMatchingId(failId)
        }, this.handleError)
    }

    forceDelete(failId) {
        this.showLoader()
        this.orderService.deleteFail(failId).subscribe(r => {
            this.init()
        }, this.handleError)
    }

    deleteFailWithMatchingId(failId) {
        this.showLoader()
        this.orderService.deleteFailWithMatchingId(failId).subscribe(r => {
            this.init()
        }, this.handleError)
    }

    updateCombination(fail) {
        if (!confirm('Na pewno?')) return
        const request = {
            failId: fail.id,
            orderProductId: fail.orderProductId,
            combinationId: fail.newCombinationId,
        }
        this.showLoader()
        this.orderService.updateCombination(request).subscribe(r => {
            this.response.data.splice(this.response.data.indexOf(fail), 1)
            this.hideLoader()
        }, this.handleError)
    }
    save() {}
}

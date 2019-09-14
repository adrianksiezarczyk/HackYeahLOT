import { Component, OnInit } from '@angular/core'
import { StatusService } from '../core/services/StatusService/StatusService'
import { BaseComponent } from '../core/base/base.component'
import { EmailTemplateService } from 'app/core/services/EmailTemplateService/EmailTemplateService'
import { SharedService } from '../core/services/SharedService/SharedService'
import { SharedEventName } from '../core/services/SharedService/models'
import { ActivatedRoute } from '@angular/router'
import { PaymentService } from 'app/core/services/PaymentService/PaymentService'
import { CurrentSetService } from '../core/services/CurrentSetService/CurrentSetService'
import { ShopsService } from '../core/services/ShopsService/ShopsService'
import { AuthService } from '../core/services/AuthService/AuthService'

@Component({
    selector: 'processing-payment',
    templateUrl: './processing.payment.component.html',
})
export class ProcessingPaymentComponent extends BaseComponent implements OnInit {
    paymentSuccess = undefined
    constructor(
        private activatedRoute: ActivatedRoute,
        private paymentService: PaymentService,
        private sharedService: SharedService,
        private shopsService: ShopsService,
        private authService: AuthService,
    ) {
        super()
    }

    getShopSet() {
        this.showLoader()
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(queryString => {
            if (queryString) {
                let paymentHistoryId = queryString.paymentHistoryId

                this.paymentService.getPaymentStatus(paymentHistoryId).subscribe(response => {
                    setTimeout(() => {
                        this.paymentSuccess = response.success
                        setTimeout(() => {
                            this.getShopSet();
                        })
                    }, 5000)
                }, this.handleError)
            }
        })
    }
}

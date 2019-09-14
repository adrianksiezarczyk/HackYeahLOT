import { Component } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'

import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { UsersService } from 'app/core/services/UsersService/UsersService'
import { InvoiceModel } from 'app/core/services/UsersService/models'
import { COUNTRIES } from '../../shared/constants'
import { PlanService } from 'app/core/services/PlanService/PlanService'
import { PaymentService } from 'app/core/services/PaymentService/PaymentService'

@Component({
    selector: 'payment-modal-component',
    templateUrl: './payment.modal.component.html',
})
export class PaymentModalComponent extends BaseModalComponent {
    public currentCountry: any = {}
    public countries: Array<any>
    paymentProduct = {}
    constructor(private usersService: UsersService, private paymentService: PaymentService) {
        super()
    }

    invoiceModel: InvoiceModel = <InvoiceModel>{}

    ngOnInit() {
        this.countries = COUNTRIES
    }
    init(paymentProduct): void {
        this.paymentProduct = paymentProduct
        this.showLoader()
        this.usersService.getInvoice().subscribe(r => {
            this.invoiceModel = r
            this.currentCountry = this.countries.find(c => c.code == r.countryCode)
            if (!this.currentCountry) this.currentCountry = this.countries[0]
            this.hideLoader()
        }, this.handleError)
        this.show()
    }

    updateInvoice() {
        this.showLoader()
        const model = this.invoiceModel
        model.countryCode = this.currentCountry.code
        this.usersService.updateInvoice(model).subscribe(r => {
            this.init(this.paymentProduct)
        }, this.handleError)
    }
    pay() {
        this.showLoader()
        const model = this.invoiceModel
        model.countryCode = this.currentCountry.code
        this.usersService.updateInvoice(model).subscribe(() => {
            this.paymentService.createPayment(this.paymentProduct).subscribe(r => {
                window.location.href = r.redirectUri
            }, this.handleError)
        }, this.handleError)
    }

    setCountry(country) {
        this.currentCountry = country
    }

    isCompanyInvoiceType() {
        return this.invoiceModel.invoiceType === 'Company'
    }
    isFormValid() {
        let error = false
        if (!this.invoiceModel.invoiceType) error = true
        if (this.invoiceModel.invoiceType === 'Company') {
            if (!this.invoiceModel.nip) error = true
            if (!this.invoiceModel.companyName) error = true
        }
        if (!this.invoiceModel.city) error = true
        if (!this.currentCountry.code) error = true
        if (!this.invoiceModel.postCode) error = true
        if (!this.invoiceModel.street) error = true
        return !error
    }
}

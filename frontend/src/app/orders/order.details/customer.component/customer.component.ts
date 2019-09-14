import { Component, OnInit, Input } from '@angular/core'
import { BaseComponent } from '../../../core/base/base.component'
import { OrderService } from '../../../core/services/OrderService/OrderService'
import { ConfigurationService } from 'app/core/services/ConfigurationService/ConfigurationService';

@Component({
    selector: 'customer-settings',
    templateUrl: './customer.component.html',
})
export class CustomerComponent extends BaseComponent implements OnInit {
    @Input() order: any
    editMode = false
    paymentHistory;
    countries = [];
    constructor(private orderService: OrderService, private configurationService: ConfigurationService) {
        super()
    }

    ngOnInit() {
        this.configurationService.getCountries().subscribe(c =>{
            this.countries = c;
        }, this.handleError);
        
        this.showLoader();
        this.orderService.getPayments(this.order.id).subscribe(r=>{
            this.paymentHistory = r;
            this.hideLoader();
        }, this.handleError)
    }

    save() {
        this.orderService.update({ ...this.order.customer, orderId: this.order.id }).subscribe(
            r => {
                this.hideLoader()
                this.editMode = false
            },
            e => {
                this.handleError(e)
                this.editMode = false
            },
        )
    }
    setAsPaid(payment){
        if(confirm("Are you sure?")){
            this.orderService.setAsPaid(payment.id).subscribe(r=>{
                this.hideLoader();
                this.ngOnInit();
            },this.handleError)
        }
    }
    updateOrderAmountReceived() {
        this.showLoader()
        this.order.paymentTypeName = 'MANUAL'
        this.orderService
            .updateOrderAmountReceived({
                AmountReceived: this.order.amountRecieved,
                currencyCode: this.order.currencyCode,
                paymentTypeId: 4, //MANUALLY //TODO -> get it from DB
                orderId: this.order.id,
            })
            .subscribe(
                r => {
                    this.hideLoader()
                    this.editMode = false
                },
                e => {
                    this.handleError(e)
                    this.editMode = false
                },
            )
    }
}

import { Component, OnInit, Input } from '@angular/core'
import { BaseComponent } from '../../../core/base/base.component'
import { OrderService } from '../../../core/services/OrderService/OrderService'
@Component({
    selector: 'order-comments',
    templateUrl: './comments.component.html',
})
export class CommentsComponent extends BaseComponent implements OnInit {
    @Input() order: any
    comments: any

    constructor(private orderService: OrderService) {
        super()
    }

    ngOnInit() {
        this.orderService.getComments(this.order.id).subscribe(r => {
            this.comments = r
            this.hideLoader()
        })
    }

    delete(id) {
        this.showLoader()
        this.orderService.deleteComment(id).subscribe(r => {
            this.comments = r
            this.hideLoader()
            this.ngOnInit()
        })
    }
}

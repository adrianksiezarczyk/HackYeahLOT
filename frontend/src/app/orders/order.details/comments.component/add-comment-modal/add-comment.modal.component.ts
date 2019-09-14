import { Component, Input } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { OrderService } from '../../../../core/services/OrderService/OrderService'
import { UsersService } from '../../../../core/services/UsersService/UsersService'

@Component({
    selector: 'add-comment-modal',
    templateUrl: './add-comment.modal.component.html',
})
export class AddCommentModalComponent extends BaseModalComponent {
    comment: any = {}
    @Input() order: any

    constructor(private orderService: OrderService, private userService: UsersService) {
        super()
    }

    init(parameter: any): void {
        this.showLoader()
        this.comment = Object.assign({}, parameter)
        this.show()
        setTimeout(() => this.hideLoader(), 0)
    }

    contentChanged(e) {
        this.comment.content = e
    }

    save() {
        this.comment.orderId = this.order.id
        this.comment.date = new Date()
        this.showLoader()
        this.orderService.addComment(this.comment).subscribe(r => {
            this.hideLoader()
            this.hide(r)
        }, this.handleError)
    }
}

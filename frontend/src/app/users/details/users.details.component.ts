import { Component, OnInit, DoCheck, ViewChild } from '@angular/core'
import { BaseComponent } from 'app/core/base/base.component'
import { UsersService } from 'app/core/services/UsersService/UsersService'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-users',
    templateUrl: './users.details.component.html',
})
export class UsersDetailsComponent extends BaseComponent implements OnInit {
    currentTab: string = 'info'

    user: any = {}

    userId = null
    constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) {
        super()

        this.activatedRoute.params.subscribe(params => {
            this.userId = params.id
            this.init(params.id)
        })
    }

    init(id = this.userId) {
        this.showLoader()

        this.usersService.getById(id).subscribe(r => {
            this.user = r
            this.hideLoader()
        }, this.handleError)
    }

    ngOnInit() {}
}

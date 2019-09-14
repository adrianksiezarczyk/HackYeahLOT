import { Component, OnInit, DoCheck, ViewChild, Input } from '@angular/core'
import { BaseComponent } from 'app/core/base/base.component'
import { UsersService } from 'app/core/services/UsersService/UsersService'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'user-info',
    templateUrl: './users.details.info.component.html',
})
export class UserInfoComponent extends BaseComponent implements OnInit {
    constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) {
        super()
    }

    @Input() user: any

    ngOnInit() {}
}

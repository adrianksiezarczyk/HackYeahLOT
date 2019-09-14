import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { BaseComponent } from 'app/core/base/base.component'
import { UsersService } from 'app/core/services/UsersService/UsersService'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'user-shops',
    templateUrl: './users.details.shops.component.html',
})
export class UserShopsComponent extends BaseComponent implements OnInit {
    constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) {
        super()
    }

    @Input() shopSets: any
    @Output() private refresh: EventEmitter<any> = new EventEmitter()


    refreshUsers(){
        this.refresh.emit()
    }
    ngOnInit() {}
}

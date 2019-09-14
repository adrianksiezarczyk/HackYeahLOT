import { Component, OnInit, DoCheck, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { BaseComponent } from 'app/core/base/base.component'
import { UsersService } from 'app/core/services/UsersService/UsersService'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'user-edit',
    templateUrl: './users.details.edit.component.html',
})
export class UserEditComponent extends BaseComponent implements OnInit {
    constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) {
        super()
    }

    @Input() user: any
    @Input() permissions: any
    @Output() private refresh: EventEmitter<any> = new EventEmitter()
    editMode = false

    hasPermission(per) {
        return this.user.permissions && this.user.permissions.includes(per)
    }

    save() {
        this.showLoader()
        this.usersService.save(this.user).subscribe(() => {
            this.refresh.emit()
            this.editMode = false
            this.hideLoader()
        }, this.handleError)
    }
    toggle(per) {
        if (this.user.permissions.includes(per)) this.user.permissions.splice(this.user.permissions.indexOf(per), 1)
        else this.user.permissions.push(per)
    }
    ngOnInit() {
        this.usersService.getPermissions().subscribe(r => {
            this.permissions = r
        })
    }
}

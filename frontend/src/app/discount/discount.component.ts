import { Component, OnInit, DoCheck, ViewChild } from '@angular/core'
import { BaseComponent } from '../core/base/base.component'
import { UsersService } from '../core/services/UsersService/UsersService'
import { DiscountService } from '../core/services/DiscountService/DiscountService'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'

@Component({
    selector: 'app-discount',
    templateUrl: './discount.component.html',
})
export class DiscountComponent extends BaseComponent implements OnInit {
    currentTab = 'special-codes'
    specialDiscountPermission = false

    constructor(private discountService: DiscountService) {
        super()
    }

    ngOnInit() {
        var permissions = StorageService.getItem(StorageKeys.permissions)
        if (permissions.includes('CanManageSpecialDiscount')) this.specialDiscountPermission = true
    }

}

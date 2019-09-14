import { Component, OnInit, Input } from '@angular/core'
import { BaseComponent } from '../../../core/base/base.component'

@Component({
    selector: 'feautures-settings',
    templateUrl: './feautures.component.html',
})
export class FeauturesComponent extends BaseComponent implements OnInit {
   
    @Input() product: any;

    constructor() {
        super()
    }

    ngOnInit() {}
}

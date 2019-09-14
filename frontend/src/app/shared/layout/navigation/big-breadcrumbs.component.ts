import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'sa-big-breadcrumbs',
    template: `
        <div style="margin-top:30px; margin-left:10px; margin-bottom:35px;">
            <h1 class="page-title txt-color-blueDark" style="font-size:28px">
                <i class="fa-fw fa fa-{{ icon }}"></i> {{ items[0] | i18n }}
                <span *ngFor="let item of items.slice(1)">> {{ item | i18n }}</span>
            </h1>
        </div>
    `,
})
export class BigBreadcrumbsComponent implements OnInit {
    @Input() public icon: string
    @Input() public items: Array<string>

    constructor() {}

    ngOnInit() {}
}

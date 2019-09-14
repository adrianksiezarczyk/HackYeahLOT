import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagination-wrapper',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {

    @Output() pageChange: EventEmitter<any> = new EventEmitter();
    @Input() id: string;
    itemsPerPage: number = 10;

    constructor() { }

    pageChangeHandler(e) {
        if (!e)
            e = { currentPage: 1, itemsPerPage: this.itemsPerPage };

        this.pageChange.emit({ currentPage: e, itemsPerPage: this.itemsPerPage });
    }
}

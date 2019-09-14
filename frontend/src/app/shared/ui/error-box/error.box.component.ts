import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'error-box',
    templateUrl: './error.box.component.html'
})
export class ErrorBoxComponent implements OnInit {

    @Input() serverError: string;

    constructor() { }

    ngOnInit() {
    }

}

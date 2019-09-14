import { OnInit, Directive, Input, ElementRef, EventEmitter, Output, SimpleChanges } from "@angular/core";

import 'flipclock/compiled/flipclock.min';

declare var $: any;
@Directive({
    selector: '[flipClock]'
})
export class FlipClockDirective implements OnInit {

    @Input() flipClock: any;
    @Input() value: any;
    @Output() private setValue: EventEmitter<any> = new EventEmitter<any>();
    private clock: any;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.clock = $(this.el.nativeElement).FlipClock(this.value, {
            clockFace: 'Counter',
            minimumDigits: 3,
        });
    }
    ngOnChanges(changes: SimpleChanges) {
        if (this.clock)
            this.clock.setValue(this.value);
    }


}

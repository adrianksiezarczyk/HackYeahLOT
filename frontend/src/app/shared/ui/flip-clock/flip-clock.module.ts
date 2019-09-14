import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipClockDirective } from './flip-clock.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [FlipClockDirective],
    exports: [FlipClockDirective],
})
export class FlipClockModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LoadersCssModule } from 'angular2-loaders-css';

@NgModule({
    imports: [
        CommonModule,
        LoadersCssModule
    ],
    declarations: [LoaderComponent],
    exports: [LoaderComponent],
})
export class LoaderModule { }

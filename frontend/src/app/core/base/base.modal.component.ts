import { Component, ViewChild, Output, EventEmitter } from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap'
import { BaseComponent } from './base.component'

export abstract class BaseModalComponent extends BaseComponent {
    @ViewChild('modal') modal: ModalDirective
    @Output() private close: EventEmitter<any> = new EventEmitter<any>()
    constructor() {
        super()
    }

    show(): void {
        this.modal.config.backdrop = 'static'
        this.modal.config.keyboard = false
        this.modal.show()
    }

    hide(result?: any, emit = true): void {
        this.modal.hide()
        if (emit) this.close.emit(result)
    }

    protected abstract init(parameter: any): void
}

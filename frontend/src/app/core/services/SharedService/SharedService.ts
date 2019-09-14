import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SharedEventModel } from './models';

export class SharedService {

    private messageSource = new BehaviorSubject<SharedEventModel>(<SharedEventModel>{});
    currentMessage = this.messageSource.asObservable();
    constructor() {

    }
    emitMessage(message: SharedEventModel) {
        this.messageSource.next(message)
    }
}
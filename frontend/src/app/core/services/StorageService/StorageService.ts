import { Injectable } from '@angular/core';

export class StorageService {

    constructor() {

    }
    static saveItem(key: string, value: any): void {

        let valueToSave: string = value;

        if (typeof (value) == 'object')
            valueToSave = JSON.stringify(value);

        localStorage.setItem(key, valueToSave);
    }

    static getItem(key: string): any {
        let item = localStorage.getItem(key);
        var val = '';
        try {
            val = JSON.parse(item);
        }
        catch (e) {
            val = item;
        }
        if (!val)
            return null;

        else return val;
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}
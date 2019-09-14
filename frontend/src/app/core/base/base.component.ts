import { config } from './../shared/smartadmin.config'
import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { Title } from '@angular/platform-browser'

export class BaseComponent {
    public isLoading: boolean = false
    public serverError: string = null
    protected sharedSubscription: Subscription

    protected hideLoader = () => {
        this.isLoading = false
    }
    protected showLoader = () => {
        this.serverError = null
        this.isLoading = true
    }
    protected copyObject(fromObj: any, toObj: any) {
        for (var key in fromObj) {
            toObj[key] = fromObj[key]
        }
    }
    protected handleError = err => {
        if (err) {
            this.serverError = err.message || 'Nie udało połączyć się z API!'
            console.warn(err.stackTrace)
        }
        this.hideLoader()
    }

    protected createAndDownloadFile(fileName: string, data: any, type: string) {
        var a = document.createElement('a')
        a.setAttribute('style', 'display:none;')
        document.body.appendChild(a)
        var blob = new Blob([data], { type: type })
        var url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = fileName
        a.click()
    }

    convertFileToBase64(file): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () =>
                resolve({
                    data: reader.result.toString().split('base64,')[1],
                    name: file.name,
                })
            reader.onerror = error => reject(error)
        })
    }
}

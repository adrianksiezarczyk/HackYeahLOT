import { Injectable, ApplicationRef } from '@angular/core'

import { config } from '../smartadmin.config'
import { languages } from './languages.model'
import { ApiService } from '../../core/api/api.service'
import { Subject } from 'rxjs/Subject'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class I18nService {
    public state
    public data: {}
    public currentLanguage: any

    constructor(private ApiService: HttpClient, private ref: ApplicationRef) {
        this.state = new Subject()

        let lang = localStorage.getItem('lang')
        if (!lang) lang = window.navigator.language.split('-')[0].toLowerCase()
        if (lang != 'pl' && lang != 'zh' && lang != 'us') lang = 'us'

        this.initLanguage(lang)
        this.fetch(this.currentLanguage.key)
    }

    private fetch(locale: any) {
        this.ApiService.get(this.getBaseUrl() + `/assets/langs/${locale}.json`).subscribe((data: any) => {
            this.data = data
            this.state.next(data)
            this.ref.tick()
        })
    }

    private getBaseUrl() {
        return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'
    }
    private initLanguage(locale: string) {
        let language = languages.find(it => {
            return it.key == locale
        })
        if (language) {
            this.currentLanguage = language
        } else {
            throw new Error(`Incorrect locale used for I18nService: ${locale}`)
        }
    }

    setLanguage(language) {
        localStorage.setItem('lang', language.key)
        this.currentLanguage = language
        this.fetch(language.key)
        window.location.reload()
    }

    subscribe(sub: any, err: any) {
        return this.state.subscribe(sub, err)
    }

    public getTranslation(phrase: string): string {
        return this.data && this.data[phrase] ? this.data[phrase] : phrase
    }
}

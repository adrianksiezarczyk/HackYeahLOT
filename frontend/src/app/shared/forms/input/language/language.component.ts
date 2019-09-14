import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { ConfigurationService } from 'app/core/services/ConfigurationService/ConfigurationService'

@Component({
    selector: 'language',
    templateUrl: './language.component.html',
})
export class LanguageComponent implements OnInit {
    @Input() ngModel

    languages = []
    selectedLanguageId = null

    constructor(private configurationService: ConfigurationService) {
        this.configurationService.getLanguages().subscribe(r => {
            this.languages = r
        })
    }

    ngOnInit() {}
}

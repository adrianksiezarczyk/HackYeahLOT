import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SmartProgressbarModule } from './smart-progressbar/smart-progressbar.module'
import { JqueryUiModule } from './jquery-ui/jquery-ui.module'
import { ErrorBoxComponent } from 'app/shared/ui/error-box/error.box.component'
import { I18nModule } from '../i18n/i18n.module'

@NgModule({
    imports: [CommonModule, I18nModule],

    exports: [SmartProgressbarModule, JqueryUiModule],
})
export class SmartadminUiModule {}

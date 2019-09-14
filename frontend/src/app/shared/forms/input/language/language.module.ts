import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LanguageComponent } from './language.component'
import { FormsModule } from '@angular/forms'
import { I18nModule } from 'app/shared/i18n/i18n.module'

@NgModule({
    imports: [CommonModule, FormsModule, I18nModule],
    declarations: [LanguageComponent],
    exports: [LanguageComponent],
})
export class LanguageModule {}

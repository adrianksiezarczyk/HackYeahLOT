import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SmartadminLayoutModule } from './layout'
import { UtilsModule } from './utils/utils.module'
import { I18nModule } from './i18n/i18n.module'

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [],
    exports: [CommonModule, I18nModule, FormsModule, RouterModule, SmartadminLayoutModule, UtilsModule],
})
export class SmartadminModule {}

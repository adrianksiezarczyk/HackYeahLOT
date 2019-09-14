import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { dashboardRouting } from './dashboard.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { DashboardComponent } from './dashboard.component'
import { RoundProgressModule } from 'angular-svg-round-progressbar'
import { FlipClockModule } from '../shared/ui/flip-clock/flip-clock.module'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { I18nModule } from '../shared/i18n/i18n.module'

@NgModule({
    imports: [
        CommonModule,
        dashboardRouting,
        SmartadminModule,
        RoundProgressModule,
        FlipClockModule,
        ErrorBoxModule,
        LoaderModule,
        I18nModule,
    ],
    declarations: [DashboardComponent],
})
export class DashboardModule {}

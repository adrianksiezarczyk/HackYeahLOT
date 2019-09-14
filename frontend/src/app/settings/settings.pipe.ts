import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'settingsGroupFilter',
})
export class SettingsGroupFilter implements PipeTransform {
    transform(settings: any[], group: string): any {
        return settings.filter(setting => setting.group === group)
    }
}

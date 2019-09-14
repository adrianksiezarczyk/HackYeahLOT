export class CurrentSetService {
    static currentShop: any = {}

    static updateCurrentShop(newValue: any) {
        CurrentSetService.currentShop = newValue
    }
}

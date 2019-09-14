export class CurrentSetValidity {
    static isValid = true

    static updateValidity(newValue: any) {
        console.log('update value', newValue)
        CurrentSetValidity.isValid = newValue
    }
}

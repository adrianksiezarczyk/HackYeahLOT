import { SERVER_TYPES } from '../../constants'

export const getInputTypeOnConfigurationType = configurationType => {
    let inputType = 'text'
    if (configurationType === SERVER_TYPES.INT || configurationType === SERVER_TYPES.DECIMAL) inputType = 'number'
    return inputType
}

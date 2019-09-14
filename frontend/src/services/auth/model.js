import produce from 'immer'
import AuthApi from './api'

export const auth = {
    state: {
        isAccountValid: null,
        validityDate: null,
        isTrialPlan: null,
        validityError: false,
    },
    reducers: {
        setValidityDate(state, payload) {
            return produce(state, draft => {
                draft.validityDate = payload
            })
        },
        setAccountValidity(state, payload) {
            return produce(state, draft => {
                draft.isAccountValid = payload
            })
        },
        setIfTrial(state, payload) {
            return produce(state, draft => {
                draft.isTrialPlan = payload
            })
        },
        setValidityError(state, payload) {
            return produce(state, draft => {
                draft.validityError = payload
            })
        },
        reset(state) {
            return produce(state, draft => {
                draft.isAccountValid = null
                draft.validityDate = null
                draft.isTrialPlan = null
                draft.validityError = false
            })
        },
    },
    effects: dispatch => ({
        async getAccountValidity(payload, rootState) {
            try {
                const response = await AuthApi.getAccountValidity()
                this.setValidityDate(response.planValidityDateTo)
                this.setIfTrial(response.isTrialPlan)

                const now = new Date()
                const expirationDate = new Date(response.planValidityDateTo)
                if (now > expirationDate) this.setAccountValidity(false)
                else this.setAccountValidity(true)
                this.setValidityError(false)
            } catch (error) {
                console.error(error.json)
                this.setValidityError(true)
            }
        },
        async resetAccountValidity(payload, rootState) {
            this.reset()
        },
    }),
}

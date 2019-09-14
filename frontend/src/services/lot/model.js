import produce from "immer"
import LotApi from "./api"

export const lot = {
  state: {
    info: null
  },
  reducers: {
    setInfo(state, payload) {
      return produce(state, draft => {
        draft.info = payload
      })
    }
  },
  effects: dispatch => ({
    async fetchInfo() {
      const response = await LotApi.testFetch()
      this.setInfo(response)
    }
  })
}

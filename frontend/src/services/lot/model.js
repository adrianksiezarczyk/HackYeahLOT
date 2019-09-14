import produce from "immer"

export const lot = {
  state: {
    test: false
  },
  reducers: {
    test(state, payload) {
      return produce(state, draft => {
        draft.test = payload
      })
    }
  },
  effects: dispatch => ({
    async test() {}
  })
}

import { init } from "@rematch/core"
import { lot } from "./lot/model"

const store = init({
  models: { lot }
})

export default store

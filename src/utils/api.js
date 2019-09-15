import wretch from "wretch"
import { fetch } from "whatwg-fetch"
import { API_URL } from "../constants"
import AbortController from "abort-controller/dist/abort-controller.umd"

export const requestAbortController = new AbortController()

export const requestBase = wretch()
  .polyfills({
    fetch: fetch,
    AbortController: AbortController
  })
  .signal(requestAbortController)
  .middlewares([])
  .url(API_URL)
  .content(`application/json`)

export const requestWithAuth = wretch()
  .polyfills({
    fetch: fetch,
    AbortController: AbortController
  })
  .signal(requestAbortController)
  .middlewares([])
  .url(API_URL)
  .defer((w, url, options) => {
    const { token, shopId } = options.context
    return w.auth(`Bearer ${token}`).query({ shopId })
  })
  .content(`application/json`)
  .catcher(401, err => {
    console.error("Unauthorized", err)
  })

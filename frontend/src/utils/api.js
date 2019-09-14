import wretch from 'wretch'
import { fetch } from 'whatwg-fetch'
import retry from '../services/middlewares/retry'
import history from '../services/history'
import AbortController from 'abort-controller/dist/abort-controller.umd'
import { TOKEN_INFO } from '../constants'
export const requestAbortController = new AbortController()

export const requestBase = wretch()
    .polyfills({
        fetch: fetch,
        AbortController: AbortController,
    })
    .signal(requestAbortController)
    .middlewares([
        retry({
            maxAttempts: 3,
        }),
    ])
    .url(process.env.REACT_APP_API)
    .content(`application/json`)

export const requestWithAuth = wretch()
    .polyfills({
        fetch: fetch,
        AbortController: AbortController,
    })
    .signal(requestAbortController)
    .middlewares([
        retry({
            maxAttempts: 3,
        }),
    ])
    .url(process.env.REACT_APP_API)
    .defer((w, url, options) => {
        const { token, shopId } = options.context
        return w.auth(`Bearer ${token}`).query({ shopId })
    })
    .content(`application/json`)
    .catcher(401, err => {
        console.error('Unauthorized', err)
        localStorage.removeItem(TOKEN_INFO)
        history.push('/login')
    })

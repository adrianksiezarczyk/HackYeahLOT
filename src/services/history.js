import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
history.listen((location, action) => {
    if (forceReloadOnUpdate()) return
    typeof window !== 'undefined' && window.scrollTo(0, 0)
})

export const forceReloadOnUpdate = () => {
    if (window.swUpdate) {
        window.location.reload(true)
        return true
    }
    return false
}

export default history

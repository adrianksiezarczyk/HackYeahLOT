import './i18n'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'tabler-react/dist/Tabler.css'
import { Provider } from 'react-redux'
import store from './services/store'

import 'react-tippy/dist/tippy.css'

if (process.env.NODE_ENV === 'production') {
    const OfflinePluginRuntime = require('offline-plugin/runtime')
    OfflinePluginRuntime.install({
        onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
        onUpdated: () => (window.swUpdate = true),
    })
}

if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update')
    whyDidYouUpdate(App)
  }

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
)

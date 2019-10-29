import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './css/bootstrap.min.css'
import './css/nprogress.css'
import './css/index.css'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()

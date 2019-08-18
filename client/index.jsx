import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from "react-redux"
import store from './store/index'

import App from './components/App/App'

// import 'normalize.css'
// import './styles/reset.css'

const root = document.getElementById('root')

render(<Provider store={store}>
    <App name='Andy' />
  </Provider>, root)

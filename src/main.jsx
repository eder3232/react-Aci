import React from 'react'
import ReactDOM from 'react-dom/client'

import CssBaseline from '@mui/material/CssBaseLine'
import App from './App'
import ToggleColorMode from './TogleColorMode'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToggleColorMode>
      <CssBaseline />
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <App />
    </ToggleColorMode>
  </React.StrictMode>
)

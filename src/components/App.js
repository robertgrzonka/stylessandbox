/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Body />
      <Footer />
    </React.Fragment>
  )
}

export default App

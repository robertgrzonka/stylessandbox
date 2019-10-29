/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Router } from '@reach/router'
import Menu from './Menu'
import Gallery from './Gallery'

const bodyStyles = css`
  min-height: 50vh;
  margin: 20px;
`

const Body = () => {
  return (
    <div css={bodyStyles}>
      <Router>
        <Menu path='/' />
        <Gallery path='/gallery' />
      </Router>
    </div>
  )
}

export default Body

/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from '@reach/router'

const headerStyles = css`
  background-color: #212b35;
  & h1 {
  color: #F30E5C;
  }
`

const sanboxStyles = css`
  font-variant: all-small-caps;
  font-weight: 900;
  color: #e1e1e1;
`

const textDiv = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Header = () => (
  <div className='container-fluid py-5' css={headerStyles}>
    <h1 css={{ marginBottom: '20px' }}>styles<span css={sanboxStyles}>sandbox</span></h1>
    <div css={textDiv}>
      <Link to='/'>Home</Link>
      <Link to='gallery'>Gallery</Link>
    </div>
  </div>
)

export default Header

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const footerStyles = css`
  width: 100vw;
  min-height: 100px;
  margin: 0 auto;
  padding: 50px 0px;
  background-color: #212b35;
  text-align: center;
  color: #F30E5C;
  display: flex;
  align-items: center;
  justify-content: center;
`

const listStyles = css`
  list-style-type: none;
  padding: 5px;
  color: rgba(240,240,240,1);;
`

const footerHeader = css`
  color: rgba(240,240,240,1);;
`

const Section = ({ name, children }) => (
  <div className='col-12 col-md-6'>
    <h5 css={footerHeader}>{name}</h5>
    <ul css={listStyles}>
      {children}
    </ul>
  </div>
)

const linkStyles = css`
  padding: 5px 0px;
  font-size: 0.9em;
  & a {
    z-index: 1;
  }
`
const GitLink = ({ name, children }) => (
  <li css={linkStyles}>
    <a href={`https://github.com/robertgrzonka/${name}`}>
      {children || name}
    </a>
  </li>
)

export default function Footer () {
  return (
    <div css={footerStyles}>
      <div className='container'>
        <div className='row d-flex align-items-center justify-content-between'>
          <Section name='Contact'>
            <li css={linkStyles}><a href='https://github.com/robertgrzonka'>GitHub</a></li>
            <li css={linkStyles}><a href='tel:+48450040350'>+48 450 040 350</a></li>
            <li css={linkStyles}><a href='mailto:robert@theguys.sh'>robert@theguys.sh</a></li>
          </Section>
          <Section name='Projects'>
            <GitLink name='collo' />
            <GitLink name='theguys'>theGuys.design</GitLink>
            <GitLink name='beer-n-found' />
          </Section>
        </div>
        <div className='row pt-3'>
          <div className='col-12'>
            <p css={{ color: '#e1e1e1' }}>MIT © robertgrzonka</p>
          </div>
        </div>
      </div>
    </div>
  )
}

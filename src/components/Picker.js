/** @jsx jsx */
import { jsx } from '@emotion/core'

const Picker = props => (
  <div className='form-group d-flex justify-content-center align-items-start'>
    <div className='col-8 col-md-6 my-3'>
      <label htmlFor={props.name}>
        {props.title}
      </label>
      {props.children}
    </div>
  </div>
)

export default Picker

/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import Output from './Output'
import Picker from './Picker'
import NProgress from 'nprogress'
import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '../firebase' // eslint-disable-line
const db = firebase.firestore()

const Menu = () => {
  const [colorBg, setColor] = useState('#212b35')
  const [radius, setRadius] = useState(15)
  const [size, setSize] = useState({ width: 150, height: 150 })

  const handleRangeChange = e => {
    if (radius !== e.target.value) {
      NProgress.start()
      setRadius(e.target.value)
      NProgress.done()
    }
  }

  const handleChange = e => {
    e.persist()
    NProgress.start()

    const regexp = new RegExp(/^([1-9]|[1-8][0-9]|9[0-9]|[1-4][0-9]{2}|500)$/)

    if (!regexp.test(e.target.value)) {
      e.target.value = size[e.target.name]
      return NProgress.done()
    }

    NProgress.done()
    return setSize({ ...size, [e.target.name]: e.target.value })
  }

  const Editor = () => {
    return (
      <div className='text-center col-12 col-md-6 bg-light border shadow py-5'>
        <h1 className='mb-3'>Editor</h1>
        <Picker
          name='colorBg'
          title='Background color'
        >
          <SketchPicker
            width='90%'
            color={colorBg}
            defaultValue={radius}
            onChange={color => setColor(color.hex)}
            disableAlpha
          />
        </Picker>
        <Picker
          name='radius'
          title='Border radius (0-50%)'
        >
          <input
            name='radius'
            type='range'
            className='form-control-range form-control-range-sm mx-1'
            min='0'
            max='50'
            defaultValue={radius}
            onClick={handleRangeChange}
            onMouseOut={handleRangeChange}
          />
        </Picker>
        <Picker
          name='width'
          title='Width (max 500px)'
        >
          <input
            name='width'
            type='number'
            min='1'
            max='500'
            className='form-control form-control-sm mx-1'
            defaultValue={size.width}
            onBlur={handleChange}
          />
        </Picker>
        <Picker
          name='height'
          title='Height (max 500px)'
        >
          <input
            name='height'
            type='number'
            min='1'
            max='500'
            className='form-control form-control-sm mx-1'
            defaultValue={size.height}
            onBlur={handleChange}
          />
        </Picker>
      </div>
    )
  }

  const handleSubmit = e => {
    NProgress.start()
    e.preventDefault()

    const newDiv = { bgColor: colorBg, radius: radius, ...size }
    db.collection('divs').add(newDiv)

    const alert = window.alert(`Div with data ${Object.entries(newDiv).map(([key, value]) => {
        if (key === 'width' || key === 'height') {
          return `\n${key}: ${value}px`
        } else if (key === 'radius') {
          return `\n${key}: ${value}%`
        }
        return `\n${key}: ${value}`
      })}\nhas been saved!`)

    NProgress.done()
    return alert
  }

  return (
    <div className='container'>
      <div className='row d-flex align-items-start justify-content-center my-5'>
        <Editor />
        <div className='text-center col-12 col-md-6 py-5'>
          <h1 className='mb-3'>Output</h1>
          <div className='row d-flex justify-content-center align-items-center my-5'>
            <Output
              bgColor={colorBg}
              radius={radius + '%'}
              width={size.width + 'px'}
              height={size.height + 'px'}
            />
          </div>
          <p className='info'>Color: {colorBg}</p>
          <p className='info'>Radius: {radius}%</p>
          <p className='info'>Width: {size.width}px</p>
          <p className='info'>Height: {size.height}px</p>
          <div className='row d-flex justify-content-center align-items-center my-5'>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu

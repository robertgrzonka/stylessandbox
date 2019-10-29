/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import Output from './Output'
import NProgress from 'nprogress'
import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '../firebase' // eslint-disable-line

const db = firebase.firestore()

const Gallery = () => {
  const [documents, setDocuments] = useState([])

  const getData = async () => {
    NProgress.start()
    const allData = []
    const dataRef = db.collection('divs')

    await dataRef.get().then(data => {
      data.forEach(doc => {
        allData.push({ id: doc.id, data: doc.data() })
      })
    })
    NProgress.done()
    return setDocuments(allData)
  }

  useEffect(() => {
    window.addEventListener('load', getData())
    return () => window.removeEventListener('load', getData())
  }, [])

  const handleDelete = e => {
    NProgress.start()
    const message = 'This item will be deleted. Proceed?'

    if (window.confirm(message)) {
      db.collection('divs').doc(e.target.value).delete()
    }

    NProgress.done()
    return getData()
  }

  const Filter = () => {
    const [fieldPath, setFieldPath] = useState('width')
    const [opStr, setOpStr] = useState('>=')
    const [order, setOrder] = useState('desc')
    const [value, setValue] = useState(null)

    const handleSubmit = async e => {
      NProgress.start()
      e.preventDefault()

      if (!value) {
        NProgress.done()
        return window.alert('Value should not be empty.')
      }

      const queryData = []
      await db.collection('divs')
        .where(fieldPath, opStr, value)
        .orderBy(fieldPath, order)
        .get()
        .then(data => {
          data.forEach(doc => {
            queryData.push({ id: doc.id, data: doc.data() })
          })
        }).catch(err => console.error(err))

      NProgress.done()
      return setDocuments(queryData)
    }

    const handleValueChange = e => {
      const parsed = parseInt(e.target.value)

      if (Number.isInteger(parsed)) {
        e.target.value = parsed
        return setValue(parsed)
      }

      e.target.value = null
      e.target.placeholder = 'Only numbers!'
    }

    const options = {
      fieldPathOptions: ['colorBg', 'width', 'height', 'radius'],
      orderOptions: [
        ['descending', 'desc'],
        ['ascending', 'asc']
      ],
      opStrOptions: [
        ['smaller than', '<'],
        ['smaller or equal', '<='],
        ['equal', '=='],
        ['bigger than', '>'],
        ['equal or bigger', '>=']
      ]
    }

    return (
      <form className='text-center d-flex align-items-center justify-content-center my-2'>
        <div className='form-row'>
          <div className='col-sm-2'>
            <label htmlFor='fieldPath'>Filter field:</label>
            <select
              name='fieldPath'
              className='form-control form-control-sm'
              defaultValue={fieldPath}
              onChange={e => setFieldPath(e.target.value)}
            >
              {options.fieldPathOptions.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className='col-sm-2'>
            <label htmlFor='opStr'>Query:</label>
            <select
              name='opStr'
              className='form-control form-control-sm'
              defaultValue={opStr}
              onChange={e => setOpStr(e.target.value)}
            >
              {options.opStrOptions.map(([name, value], index) => (
                <option key={index} value={value}>{name}</option>
              ))}
            </select>
          </div>
          <div className='col-sm-2'>
            <label htmlFor='order'>Order:</label>
            <select
              name='order'
              className='form-control form-control-sm'
              defaultValue={order}
              onChange={e => setOrder(e.target.value)}
            >
              {options.orderOptions.map(([name, value], index) => (
                <option key={index} value={value}>{name}</option>
              ))}
            </select>
          </div>
          <div className='col-sm-2'>
            <label htmlFor='value'>Value:</label>
            <input
              type='text'
              name='value'
              className='form-control form-control-sm'
              defaultValue={value}
              placeholder={fieldPath === 'colorBg' ? 'Value in HEX format' : null}
              onChange={e => handleValueChange(e)}
            />
          </div>
          <div className='col-sm-2 mt-4'>
            <button onClick={handleSubmit}>Filter</button>
          </div>
          <div className='col-12 mt-3'>
            <p>Found <strong css={{ color: 'mediumturquoise' }}>{documents.length}</strong> results.</p>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div>
      <h1 className='py-3'>Gallery</h1>
      <Filter />
      <div className='row d-flex align-items-end justify-content-center my-5'>
        {documents.map(({ id, data }) => (
          <div className='col-auto text-center my-3 mx-3' key={id}>
            <Output
              key={id}
              bgColor={data.bgColor}
              width={data.width + 'px'}
              height={data.height + 'px'}
              radius={data.radius + '%'}
            />
            <button
              className='btn-delete mt-3'
              value={id}
              onClick={handleDelete}
            >
            Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery

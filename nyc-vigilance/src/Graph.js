import React, { useState, useEffect } from 'react'
import { DATA_NYCHC } from './api/api'

const Graph = props => {
  const [crimes, setCrimes] = useState([])
  useEffect(() => {
    let cancelled = false

    ;(async function fetchCrimes() {
      // async work here
      try {
        const res = await fetch(DATA_NYCHC)
        const data = await res.json()
        setCrimes(data)

      } catch (err) {
        console.error(err)
      }
      if (cancelled) {
        return
      }
    })([crimes])

    return () => {
      cancelled = true
    }
  }, [])

  const renderCrimes = crimeData => {
    console.log({ crimeData })
    return crimeData.map(crime => {
      // trim extraneous info
      const tc = crime.slice(11)
      return (
        <tr>
          {renderFields(tc)}
        </tr>
      )
    })
  }

  const renderFields = tc => {
    console.log({ tc })
    return tc.map(field => (<td>{field}</td>))
  }

  return (
    <React.Fragment>
      {Array.isArray(crimes.data)
        ? renderCrimes(crimes.data)
        : <h3>failed to retrieve data.</h3>
      }
    </React.Fragment>
  )
}

export default Graph

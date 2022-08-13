import React, { useEffect, useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

const ProportionWeight = () => {
  const { aci, setAci } = useContext(AciContext)
  const { cement, correctedWater, correctedFine, correctedCoarse } = aci
  return (
    <div>
      <h2>Proporciones en peso</h2>
      <p>bolsa, fino, grueso, agua</p>
      <p>
        <Number value={cement / cement} decimals={2} /> :
        <Number value={correctedFine / cement} decimals={2} /> :
        <Number value={correctedCoarse / cement} decimals={2} /> :
        <Number
          value={(correctedWater * 1000) / (cement / 42.5)}
          decimals={2}
        />{' '}
        lt/bolsa (42.5kg)
      </p>
    </div>
  )
}

export default ProportionWeight

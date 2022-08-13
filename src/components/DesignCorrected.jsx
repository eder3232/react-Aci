import React, { useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

const DesignCorrected = () => {
  const { aci, setAci } = useContext(AciContext)
  const { cement, correctedWater, correctedFine, correctedCoarse } = aci
  return (
    <div>
      <h2>Diseño corregido</h2>
      <p>
        Cemento: <Number value={cement} decimals={2} />
        kg
      </p>
      <p>
        Agua: <Number value={correctedWater * 1000} decimals={2} />
        lt
      </p>
      <p>
        Ag. fino: <Number value={correctedFine} decimals={2} />
        kg
      </p>
      <p>
        Ag. grueso: <Number value={correctedCoarse} decimals={2} />
        kg
      </p>
    </div>
  )
}

export default DesignCorrected

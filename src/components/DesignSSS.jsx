import React, { useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

const DesignSSS = () => {
  const { aci, setAci } = useContext(AciContext)
  const { cement, volWater, weightFineAggregate, weightCoarseAggregate } = aci
  return (
    <div>
      <h2>Diseño SSS</h2>
      <p>
        Cemento: <Number value={cement} decimals={2} />
        kg
      </p>
      <p>
        Agua: <Number value={volWater * 1000} decimals={2} />
        lt
      </p>
      <p>
        Ag. fino: <Number value={weightFineAggregate} decimals={2} />
        kg
      </p>
      <p>
        Ag. grueso: <Number value={weightCoarseAggregate} decimals={2} />
        kg
      </p>
    </div>
  )
}

export default DesignSSS

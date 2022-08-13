import React, { useState } from 'react'
import AciContext from './AciContext'

const AciProvider = ({ children }) => {
  const [aci, setAci] = useState({
    fcr: 294,
    tmn: '$1',
    airEntrained: false,
    air: 1.5,
    slump: '$3a4',
    volWater: 193,
    rac: 0.5584,
    cement: 345.63,
    fmf: 2.6,
    factorCoarseAggregate: 0.69,
    peCement: 2800,
    compactedDryWeight: 1900,
    weightCoarseAggregate: 1311,
  })
  return (
    <AciContext.Provider value={{ aci, setAci }}>
      {children}
    </AciContext.Provider>
  )
}

export default AciProvider

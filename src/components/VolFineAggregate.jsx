import React, { useEffect, useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

const VolFineAggregate = () => {
  const { aci, setAci } = useContext(AciContext)
  const { volCement, volCoarseAggregate, volWater, air } = aci
  let parcialVol = volCement + volCoarseAggregate + volWater + air / 1000

  let volFineAggregate = 1 - parcialVol

  useEffect(() => {
    setAci((prevState) => ({ ...prevState, volFineAggregate }))
  }, [volCement, volCoarseAggregate, volWater, air])

  useEffect(() => {
    setAci((prevState) => ({ ...prevState, volFineAggregate }))
  }, [])
  return (
    <div>
      <h2>Volumen - ag. fino</h2>
      <p>VolParcial = VolCemento + VolAgGrueso + VolAgua + VolAire</p>
      <p>
        VolParcial = <Number value={volCement} decimals={3} /> +{' '}
        <Number value={volCoarseAggregate} decimals={3} /> +{' '}
        <Number value={parcialVol} decimals={3} /> +{' '}
        <Number value={volWater} decimals={3} />
      </p>

      <p>
        VolParcial = <Number value={parcialVol} decimals={3} />
      </p>
      <p>VolAgFino = 1 - VolParcial</p>
      <p>
        VolAgFino = 1 - <Number value={parcialVol} decimals={3} />
      </p>
      <p>
        VolAgFino = <Number value={volFineAggregate} decimals={3} />
        m3
      </p>
    </div>
  )
}

export default VolFineAggregate

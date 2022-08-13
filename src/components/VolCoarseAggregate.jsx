import React, { useState, useEffect, useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

import Input from '../shared/components/FormElements/Input'
import {
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from '../util/validators.js'

const VolCoarseAggregate = () => {
  const { aci, setAci } = useContext(AciContext)
  const { weightCoarseAggregate } = aci

  const [peCoarseAggregate, setPeCoarseAggregate] = useState(2560)

  const onPeCoarseAggregateChange = (value) => {
    setPeCoarseAggregate(value)
  }

  let volCoarseAggregate = weightCoarseAggregate / peCoarseAggregate

  useEffect(() => {
    setAci((prevState) => ({ ...prevState, volCoarseAggregate }))
  }, [weightCoarseAggregate, peCoarseAggregate])
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, volCoarseAggregate }))
  }, [])
  return (
    <div>
      <h2>Volumen - ag. grueso</h2>
      <Input
        value={peCoarseAggregate}
        initialValid={true}
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MIN(1000),
          VALIDATOR_MAX(4000),
        ]}
        onInput={onPeCoarseAggregateChange}
        label="Peso seco compactado-ag. grueso"
      />

      <p>
        VolAgGrueso = <Number value={weightCoarseAggregate} decimals={2} /> /
        <Number value={peCoarseAggregate} decimals={3} />
      </p>
      <p>
        Volumen de agregado grueso:
        <Number value={volCoarseAggregate} decimals={3} /> m3
      </p>
    </div>
  )
}

export default VolCoarseAggregate

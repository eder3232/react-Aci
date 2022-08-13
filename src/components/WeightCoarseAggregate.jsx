import React, { useState, useEffect, useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'
import Input from '../shared/components/FormElements/Input'

import {
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from '../util/validators.js'

const WeightCoarseAggregate = () => {
  const { aci, setAci } = useContext(AciContext)
  const { factorCoarseAggregate } = aci
  const [compactedDryWeight, setCompactedDryWeight] = useState(1900)

  const onCompactedDryWeightChange = (value) => {
    setCompactedDryWeight(value)
  }

  let weightCoarseAggregate = factorCoarseAggregate * compactedDryWeight

  useEffect(() => {
    setAci((prevState) => ({
      ...prevState,
      compactedDryWeight,
      weightCoarseAggregate,
    }))
  }, [compactedDryWeight, factorCoarseAggregate])
  useEffect(() => {
    setAci((prevState) => ({
      ...prevState,
      compactedDryWeight,
      weightCoarseAggregate,
    }))
  }, [])
  return (
    <div>
      <h2>Peso - ag. grueso</h2>
      <Input
        value={compactedDryWeight}
        initialValid={true}
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MIN(1000),
          VALIDATOR_MAX(4000),
        ]}
        onInput={onCompactedDryWeightChange}
        label="Peso seco compactado-ag. grueso"
      />

      <p>
        PesoAgGruesoSeco = <Number value={factorCoarseAggregate} decimals={3} />
        *
        <Number value={compactedDryWeight} decimals={3} />
      </p>
      <p>
        Peso del agregado grueso seco:
        <Number value={weightCoarseAggregate} decimals={3} /> Kg
      </p>
      <p>(por metro cúbico de mezcla)</p>
    </div>
  )
}

export default WeightCoarseAggregate

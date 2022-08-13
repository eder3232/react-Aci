import React, { useEffect, useState, useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

import Input from '../shared/components/FormElements/Input'

import {
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from '../util/validators.js'

const WeightFineAggregate = () => {
  const { aci, setAci } = useContext(AciContext)
  const { volFineAggregate } = aci
  const [peFineAggregate, setPeFineAggregate] = useState(2500)

  const onPeFineAggregateChange = (value) => {
    setPeFineAggregate(value)
  }

  let weightFineAggregate = volFineAggregate * peFineAggregate

  useEffect(() => {
    setAci((prevState) => ({ ...prevState, weightFineAggregate }))
  }, [volFineAggregate, peFineAggregate])
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, weightFineAggregate }))
  }, [])
  return (
    <div>
      <h2>Peso - ag. fino</h2>
      <Input
        value={peFineAggregate}
        initialValid={true}
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MIN(1000),
          VALIDATOR_MAX(4000),
        ]}
        onInput={onPeFineAggregateChange}
        label="Peso específico-ag. fino"
      />
      <p>
        Peso agregado fino = <Number value={volFineAggregate} decimals={3} /> *
        <Number value={peFineAggregate} decimals={2} />
      </p>
      <p>
        Peso agregado fino = <Number value={weightFineAggregate} decimals={3} />
      </p>
    </div>
  )
}

export default WeightFineAggregate

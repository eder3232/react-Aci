import React, { useState, useEffect, useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

import Input from '../shared/components/FormElements/Input'
import {
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from '../util/validators.js'

const CorrectionFine = () => {
  const { aci, setAci } = useContext(AciContext)
  const { weightFineAggregate } = aci

  const [humidityFine, setHumidityFine] = useState(5)

  const onChangeHumidityFine = (value) => {
    setHumidityFine(value)
  }
  let extraFine = (weightFineAggregate * humidityFine) / 100

  let correctedFine = weightFineAggregate * (1 + humidityFine / 100)

  useEffect(() => {
    setAci((prevState) => ({ ...prevState, correctedFine, humidityFine }))
  }, [weightFineAggregate, humidityFine])
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, correctedFine, humidityFine }))
  }, [])

  return (
    <div>
      <h2>Corrección por humedad - Ag. Fino</h2>
      <Input
        value={humidityFine}
        initialValid={true}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0), VALIDATOR_MAX(100)]}
        onInput={onChangeHumidityFine}
        label="Humedad-ag. fino (porcentaje)"
      />
      <p>
        Agregado adicional = <Number value={humidityFine} decimals={2} /> % *{' '}
        <Number value={weightFineAggregate} decimals={2} />{' '}
      </p>
      <p>
        Agregado adicional = <Number value={extraFine} decimals={2} />
      </p>

      <p>
        PesoCorregidoFino = <Number value={weightFineAggregate} decimals={2} />{' '}
        + <Number value={extraFine} decimals={2} />
      </p>
      <p>
        PesoCorregidoFino = <Number value={correctedFine} decimals={2} />
      </p>
    </div>
  )
}

export default CorrectionFine

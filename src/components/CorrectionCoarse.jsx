import React, { useState, useEffect, useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

import Input from '../shared/components/FormElements/Input'
import {
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from '../util/validators.js'

const CorrectionCoarse = () => {
  const { aci, setAci } = useContext(AciContext)
  const { weightCoarseAggregate } = aci

  const [humidityCoarse, setHumidityCoarse] = useState(5)

  const onChangeHumidityCoarse = (value) => {
    setHumidityCoarse(value)
  }
  let extraCoarse = (weightCoarseAggregate * humidityCoarse) / 100

  let correctedCoarse = weightCoarseAggregate * (1 + humidityCoarse / 100)

  useEffect(() => {
    setAci((prevState) => ({ ...prevState, correctedCoarse, humidityCoarse }))
  }, [weightCoarseAggregate, humidityCoarse])
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, correctedCoarse, humidityCoarse }))
  }, [])

  return (
    <div>
      <h2>Corrección por humedad - Ag. Gueso</h2>
      <Input
        value={humidityCoarse}
        initialValid={true}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0), VALIDATOR_MAX(100)]}
        onInput={onChangeHumidityCoarse}
        label="Humedad-ag. grueso (porcentaje)"
      />
      <p>
        Agregado adicional = <Number value={humidityCoarse} decimals={2} /> % *{' '}
        <Number value={weightCoarseAggregate} decimals={2} />{' '}
      </p>
      <p>
        Agregado adicional = <Number value={extraCoarse} decimals={2} />
      </p>

      <p>
        PesoCorregidoGrueso ={' '}
        <Number value={weightCoarseAggregate} decimals={2} /> +{' '}
        <Number value={extraCoarse} decimals={2} />
      </p>
      <p>
        PesoCorregidoGrueso = <Number value={correctedCoarse} decimals={2} />
      </p>
    </div>
  )
}

export default CorrectionCoarse

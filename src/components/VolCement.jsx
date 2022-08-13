import React, { useState, useEffect, useContext } from 'react'
import Input from '../shared/components/FormElements/Input'

import AciContext from '../context/AciContext'

import {
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from '../util/validators.js'
import Number from '../shared/components/DisplayElements/Number'

const VolCement = () => {
  const { aci, setAci } = useContext(AciContext)
  const [peCement, setPeCement] = useState(2800)
  const onPeCementoChange = (value) => {
    setPeCement(value)
  }
  let volCement = aci.cement / peCement
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, peCement, volCement }))
  }, [peCement])
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, peCement, volCement }))
  }, [])

  return (
    <div>
      <h2>Volumen de cemento</h2>
      <Input
        value={peCement}
        initialValid={true}
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MIN(1500),
          VALIDATOR_MAX(3000),
        ]}
        onInput={onPeCementoChange}
        label="Peso específico cemento kg/m3"
      />
      <p>
        VolCem = <Number value={aci.cement} decimals={3} /> kg /
        <Number value={peCement} decimals={2} /> kg/m3
      </p>
      <p>
        Volumen de cemento: <Number value={volCement} decimals={4} /> m3
      </p>
    </div>
  )
}

export default VolCement

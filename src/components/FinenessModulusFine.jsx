import React, { useContext, useState, useEffect } from 'react'

import AciContext from '../context/AciContext'
import Input from '../shared/components/FormElements/Input'

import {
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from '../util/validators.js'

const FinenessModulusFine = () => {
  const { aci, setAci } = useContext(AciContext)
  const [fmf, setFmf] = useState(2.6)

  useEffect(() => {
    // setAci({ ...aci, fmf: +fmf })
    setAci((prevState) => ({ ...prevState, fmf: +fmf }))
  }, [fmf])
  useEffect(() => {
    // setAci({ ...aci, fmf: +fmf })
    setAci((prevState) => ({ ...prevState, fmf: +fmf }))
  }, [])

  return (
    <div>
      <h2>Módulo de fineza - ag. fino</h2>
      <Input
        value={fmf}
        initialValid={true}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(1), VALIDATOR_MAX(5)]}
        onInput={setFmf}
        label="Modulo de fineza - agregado fino"
      />
    </div>
  )
}

export default FinenessModulusFine

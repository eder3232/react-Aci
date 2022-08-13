import React, { useState, useEffect, useContext } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

import Input from '../shared/components/FormElements/Input'
import {
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from '../util/validators.js'

const CorrectionWater = () => {
  const { aci, setAci } = useContext(AciContext)
  const {
    humidityCoarse,
    humidityFine,
    weightCoarseAggregate,
    weightFineAggregate,
    volWater,
  } = aci

  const [absorption, setAbsorption] = useState({
    absorptionFine: 1,
    absorptionCoarse: 1,
  })

  const { absorptionFine, absorptionCoarse } = absorption

  const onChangeAbsorptionFine = (value) => {
    setAbsorption({ ...absorption, absorptionFine: value })
  }

  const onChangeAbsorptionCoarse = (value) => {
    setAbsorption({ ...absorption, absorptionCoarse: value })
  }

  const contributionWaterFinePercent = humidityFine - absorptionFine

  const contributionWaterCoarsePercent = humidityCoarse - absorptionCoarse

  const contributionWaterFine =
    (contributionWaterFinePercent * weightFineAggregate) / 100

  const contributionWaterCoarse =
    (contributionWaterCoarsePercent * weightCoarseAggregate) / 100

  const correctedWater =
    volWater * 1000 - (contributionWaterFine + contributionWaterCoarse)

  useEffect(() => {
    setAci((prevState) => ({
      ...prevState,
      correctedWater: correctedWater / 1000,
    }))
  }, [
    humidityCoarse,
    humidityFine,
    weightCoarseAggregate,
    weightFineAggregate,
    volWater,
    absorptionFine,
    absorptionCoarse,
  ])
  useEffect(() => {
    setAci((prevState) => ({
      ...prevState,
      correctedWater: correctedWater / 1000,
    }))
  }, [])

  return (
    <div>
      <h2>Corrección por humedad - agua</h2>
      <Input
        value={absorptionFine}
        initialValid={true}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0), VALIDATOR_MAX(100)]}
        onInput={onChangeAbsorptionFine}
        label="Absorción-ag. fino (porcentaje)"
      />
      <p>{''}</p>
      <Input
        value={absorptionCoarse}
        initialValid={true}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0), VALIDATOR_MAX(100)]}
        onInput={onChangeAbsorptionCoarse}
        label="Absorción-ag. fino (porcentaje)"
      />

      <p>
        ApHumAgFino = <Number value={weightFineAggregate} decimals={2} /> * {''}
        (<Number value={humidityFine} decimals={2} />
        - <Number value={absorptionFine} decimals={2} />) / 100
      </p>

      <p>
        Aporte humedad-Ag. Fino ={' '}
        <Number value={contributionWaterFine} decimals={3} /> lt
      </p>

      <p>
        ApHumAgGrueso = <Number value={weightCoarseAggregate} decimals={2} /> *{' '}
        (<Number value={humidityCoarse} decimals={2} />
        - <Number value={absorptionCoarse} decimals={2} />) / 100
      </p>
      <p>
        Aporte humedad-Ag. Grueso ={' '}
        <Number value={contributionWaterCoarse} decimals={3} /> lt
      </p>

      <p>
        Agua corregida = <Number value={volWater * 1000} decimals={3} /> - (
        <Number value={contributionWaterFine} decimals={3} /> +{' '}
        <Number value={contributionWaterCoarse} decimals={3} />)
      </p>

      <p>
        Agua corregida = <Number value={correctedWater} decimals={3} />
      </p>
    </div>
  )
}

export default CorrectionWater

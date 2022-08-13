import React, { useState, useEffect, useContext } from 'react'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import YesOrNot from '../shared/components/FormElements/YesOrNot'
import AciContext from '../context/AciContext'
import { EMath } from '../shared/library/eMath'
import {
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
} from '../util/validators.js'
import Input from '../shared/components/FormElements/Input'

const Fcr = () => {
  const { aci, setAci } = useContext(AciContext)

  const [stateFcr, setStateFcr] = useState({
    existSd: false,
    existQA: false,
    fc: 210,
    fcr: 294,
  })
  const { existSd, fc, existQA } = stateFcr

  const onExistData = (state) => {
    setStateFcr({ ...stateFcr, existSd: state })
  }
  const onExistQA = (state) => {
    setStateFcr({ ...stateFcr, existQA: state })
  }

  const onFcChange = (value) => {
    setStateFcr({ ...stateFcr, fc: Number(value) || '' })
  }

  useEffect(() => {
    // setAci({ ...aci, fcr: stateFcr.fcr })
    setAci((prevState) => ({ ...prevState, fcr: stateFcr.fcr }))
  }, [stateFcr])

  return (
    <React.Fragment>
      <h2>Selección del F 'c</h2>

      <Input
        value={fc}
        initialValid={true}
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MIN(75),
          VALIDATOR_MAX(450),
        ]}
        onInput={onFcChange}
        label="F'c"
      />
      <p>
        Se conoce la desviación standard?{' '}
        <YesOrNot onCheckboxChange={onExistData} initialState={false} />
      </p>

      {!existSd && (
        <p>
          Hay control de calidad en la obra?
          <YesOrNot onCheckboxChange={onExistQA} initialState={false} />
        </p>
      )}

      {/* new version */}
      {/* tenemos tres casos */}
      {/* caso 1: cuando existe desviacion standard */}
      {existSd && <Case1 fc={fc} setAci={setAci} setStateFcr={setStateFcr} />}
      {/* caso 2: cuando no existe desviacion standard pero si control */}
      {!existSd && existQA && (
        <Case2 fc={fc} setAci={setAci} setStateFcr={setStateFcr} />
      )}
      {/* caso 3: cuando no existe desviacion standard ni control */}
      {!existSd && !existQA && <Case3 setStateFcr={setStateFcr} fc={fc} />}

      <h3>F'cr = {EMath.round(stateFcr.fcr)} kgf/cm^2</h3>
    </React.Fragment>
  )
}

const Case1 = ({ fc, setAci, setStateFcr }) => {
  const [desvStandard, setDesvStandard] = useState(5)
  let solution1 = +fc + 1.34 * desvStandard
  let solution2 = +fc + 2.33 * desvStandard - 35

  let max = Math.max(solution1, solution2)

  const onDesvStandardChange = (value) => {
    setDesvStandard(Number(value) || 0)
  }

  useEffect(() => {
    setAci((prevState) => ({
      ...prevState,
      fcr: max,
    }))
    setStateFcr((prevState) => ({
      ...prevState,
      fcr: max,
    }))
  }, [desvStandard])
  return (
    <React.Fragment>
      <Input
        value={desvStandard}
        initialValid={true}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAX(100)]}
        onInput={onDesvStandardChange}
      />
      <p>
        Caso 1: F'cr = {fc} + 1.34 * {desvStandard} = {EMath.round(solution1)}
      </p>
      <p>
        Caso 2: F'cr= {fc} + 2.33 * {desvStandard} - 35 ={' '}
        {EMath.round(solution2)}
      </p>
      <p>Escojemos el mayor: {EMath.round(max)}</p>
    </React.Fragment>
  )
}

const Case2 = ({ fc, setAci, setStateFcr }) => {
  const [stateCase2, setStateCase2] = useState({ QA: 'bueno', factor: 1.2 })

  const { QA, factor } = stateCase2
  const radioGroupHandler = (event, value) => {
    let newFactor = factor
    if (value === 'regular') {
      newFactor = 1.4
    } else if (value === 'bueno') {
      newFactor = 1.2
    } else if (value === 'excelente') {
      newFactor = 1.1
    }
    setStateCase2({ ...stateCase2, QA: value, factor: newFactor })
  }

  const onFactorChange = (val) => {
    setStateCase2({ ...stateCase2, factor: Number(val) || 0 })
  }

  useEffect(() => {
    setAci((prevState) => ({
      ...prevState,
      fcr: fc * factor,
    }))
    setStateFcr((prevState) => ({
      ...prevState,
      fcr: fc * factor,
    }))
  }, [stateCase2])

  return (
    <React.Fragment>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="bueno"
        name="radio-buttons-group"
        onChange={radioGroupHandler}
      >
        <FormControlLabel
          value="regular"
          control={<Radio />}
          label="Regular: 1.3F'c - 1.5F'c"
        />
        <FormControlLabel
          value="bueno"
          control={<Radio />}
          label="Bueno: 1.2 F'c"
        />
        <FormControlLabel
          value="excelente"
          control={<Radio />}
          label="Excelente: 1.1 F'c"
        />
      </RadioGroup>
      <Input
        label="Desviación estandar"
        value={factor}
        defaultValue={factor}
        initialValid={true}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAX(2)]}
        onInput={onFactorChange}
      />
      <p>
        F'cr = {fc} * {factor} = {EMath.round(fc * factor)}
      </p>
    </React.Fragment>
  )
}

const Case3 = ({ setStateFcr, fc }) => {
  let solution = ''
  let fcr = fc

  if (fc < 210) {
    solution = `${fc} + 70 = ${fc + 70}`
    fcr = fc + 70
  } else if (210 <= fc && fc <= 350) {
    solution = `${fc} + 84 = ${fc + 84}`
    fcr = fc + 84
  } else if (350 < fc) {
    solution = `${fc} + 98 = ${fc + 98}`
    fcr = fc + 98
  }

  useEffect(() => {
    setStateFcr((prevState) => ({
      ...prevState,
      fcr: fcr,
    }))
  }, [fc])

  return (
    <React.Fragment>
      <span>F'cr = {solution}</span>
    </React.Fragment>
  )
}

export default Fcr

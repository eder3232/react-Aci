import React, { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'

import { validate } from '../../../util/validators'

const Input = ({ value, onInput, validators, initialValid, label = '' }) => {
  const [inputState, setInputState] = useState({
    inputValue: value,
    isValid: initialValid || true,
    errors: [],
  })
  const { inputValue } = inputState

  const changeHandler = (event) => {
    const { isValid, errors } = validate(event.target.value, validators)
    setInputState({
      ...inputState,
      inputValue: event.target.value,
      isValid,
      errors,
    })
  }
  useEffect(() => {
    onInput(inputState.inputValue)
  }, [inputState])

  useEffect(() => {
    const { isValid, errors } = validate(value.toString(), validators)
    setInputState({
      ...inputState,
      inputValue: value,
      isValid,
      errors,
    })
    // setInputState({ ...inputState, inputValue: value })
  }, [value])
  return (
    <TextField
      error={!inputState.isValid}
      label={label}
      value={inputValue}
      onChange={changeHandler}
      helperText={inputState.errors.length >= 1 ? inputState.errors[0] : ''}
    />
  )
}
export default Input

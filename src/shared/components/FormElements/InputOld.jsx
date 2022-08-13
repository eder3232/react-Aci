import React, { useReducer, useEffect } from 'react'

import TextField from '@mui/material/TextField'

import { validate } from '../../../util/validators'

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      const { isValid, errors } = validate(action.val, action.validators)
      return {
        ...state,
        value: action.val,
        isValid: isValid,
        errors: errors,
      }
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      }
    default:
      return state
  }
}

const Input = ({
  // defaultValue = '',
  value,
  initialValid,
  id,
  type = 'text',
  placeholder,
  onInput = (event) => {},
  validators,
  label,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    inputValue: value,
    isValid: initialValid || false,
    errors: [],
    isTouched: false,
  })

  // const { id, onInput } = props
  const { inputValue, isValid } = inputState

  useEffect(() => {
    onInput(inputValue)
  }, [id, inputValue, isValid, value])
  // [id, value, isValid, onInput]

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: validators,
    })
  }

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    })
  }
  return (
    <TextField
      error={!inputState.isValid}
      id="filled-error-helper-text"
      label={label}
      placeholder={placeholder}
      defaultValue={value}
      // value={inputValue}
      onChange={changeHandler}
      helperText={inputState.errors.length >= 1 ? inputState.errors[0] : ''}
    />
  )
}

export default Input

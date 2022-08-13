import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      //cuando el input cambia, valida el formulario
      let formIsValid = true
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
      }

    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      }
    default:
      state
  }
}

const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  })

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    })
  })

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    })
  }, [])

  return [formState, inputHandler, setFormData]
}

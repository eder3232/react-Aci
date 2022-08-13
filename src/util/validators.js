const VALIDATOR_TYPE_FLOAT = 'FLOAT'
const VALIDATOR_TYPE_INT = 'INT'
const VALIDATOR_TYPE_MAX = 'MAX'
const VALIDATOR_TYPE_MIN = 'MIN'
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'

export const VALIDATOR_FLOAT = (val) => ({
  type: VALIDATOR_TYPE_FLOAT,
  val: val,
})
export const VALIDATOR_INT = () => ({ type: VALIDATOR_TYPE_INT })
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val })
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val })
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE })

export const validate = (value, validators) => {
  let isValid = true
  const errors = []
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0
      if (!(value.trim().length > 0)) {
        isValid = false
        errors.push('This field is required')
      }
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      if (!(+value <= validator.val)) {
        isValid = false
        errors.push(`Must be less than ${validator.val}`)
      }
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      if (!(+value >= validator.val)) {
        isValid = false
        errors.push(`Must be greater than ${validator.val}`)
      }
    }
    if (validator.type === VALIDATOR_TYPE_FLOAT) {
      if (!(value.split('.')[1]?.length === validator.val)) {
        isValid = false
        errors.push(`Must have ${validator.val} decimal places`)
      }
    }
    if (validator.type === VALIDATOR_TYPE_INT) {
      if (!(value.split('.')[1] === undefined)) {
        isValid = false
        errors.push(`Must be an integer; `)
      }
    }
  }

  return { isValid, errors }
}

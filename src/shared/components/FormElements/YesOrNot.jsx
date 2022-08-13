import React, { useState } from 'react'

const YesOrNot = ({ initialState = false, onCheckboxChange }) => {
  const [stateCheckbox, setStateCheckbox] = useState(initialState)

  const handleChange = (event) => {
    onCheckboxChange(!stateCheckbox)
    setStateCheckbox(!stateCheckbox)
  }
  //   console.log(state)
  return (
    <React.Fragment>
      <span>
        Yes{' '}
        <input
          type="checkbox"
          onChange={handleChange}
          checked={stateCheckbox}
        />
      </span>
      <span>
        No{' '}
        <input
          type="checkbox"
          onChange={handleChange}
          checked={!stateCheckbox}
        />
      </span>
    </React.Fragment>
  )
}

export default YesOrNot

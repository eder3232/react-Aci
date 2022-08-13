import React from 'react'

const Number = ({ value, decimals = 2 }) => {
  const roundedValue =
    Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  return (
    <React.Fragment>{` ${roundedValue.toFixed(decimals)} `}</React.Fragment>
  )
}

export default Number

import React, { useState, useContext, useEffect } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

const Cement = () => {
  const { aci, setAci } = useContext(AciContext)
  const { volWater, rac } = aci

  let cement = (volWater * 1000) / rac
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, cement }))
  }, [volWater, rac])

  useEffect(() => {
    setAci((prevState) => ({ ...prevState, cement }))
  }, [])
  // console.log('cement', aci.cement)
  return (
    <div>
      <h2>Cemento</h2>
      <p>
        ContCemento = <Number value={volWater * 1000} decimals={2} /> /
        <Number value={rac} decimals={3} />
      </p>
      <p>
        Contenido de cemento = <Number value={cement} decimals={3} />
        kg / m3
      </p>
    </div>
  )
}

export default Cement

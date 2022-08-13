import React, { useContext } from 'react'

import AciContext from '../context/AciContext'

const Pruebas = () => {
  const { aci, setAci } = useContext(AciContext)
  console.log(aci.cement)
  return <div>Pruebas</div>
}

export default Pruebas

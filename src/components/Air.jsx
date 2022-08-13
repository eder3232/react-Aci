// ya no sirve

import React, { useEffect } from 'react'

import AciContext from '../context/AciContext'

const Air = () => {
  const { aci, setAci } = React.useContext(AciContext)
  const { tmn } = aci

  const airContent = {
    $3_8: 3,
    $1_2: 2.5,
    $3_4: 2.0,
    $1: 1.5,
    $1_1_2: 1.0,
    $2: 0.5,
    $3: 0.3,
    $4: 0.2,
  }
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, air: airContent[aci.tmn] }))
  }, [tmn])

  //   console.log(aci)
  return (
    <React.Fragment>
      <h2>Contenido de aire:</h2>
      <p>De acuerdo al TMN: {airContent[aci.tmn]} %</p>
    </React.Fragment>
  )
}

export default Air

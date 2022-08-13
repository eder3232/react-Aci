import React, { useEffect } from 'react'
import AciContext from '../context/AciContext'

const WaterContent = () => {
  const { aci, setAci } = React.useContext(AciContext)
  // 193
  const { airEntrained, tmn, slump } = aci
  const volWaterWithOutAir = {
    $1a2: {
      $3_8: 207,
      $1_2: 199,
      $3_4: 190,
      $1: 179,
      $1_1_2: 166,
      $2: 154,
      $3: 130,
      $4: 113,
    },
    $3a4: {
      $3_8: 228,
      $1_2: 216,
      $3_4: 205,
      $1: 193,
      $1_1_2: 181,
      $2: 169,
      $3: 145,
      $4: 124,
    },
    $6a7: {
      $3_8: 243,
      $1_2: 228,
      $3_4: 216,
      $1: 202,
      $1_1_2: 190,
      $2: 178,
      $3: 160,
      $4: 149,
    },
  }

  const volWaterWithAir = {
    $1a2: {
      $3_8: 181,
      $1_2: 175,
      $3_4: 168,
      $1: 160,
      $1_1_2: 150,
      $2: 142,
      $3: 122,
      $4: 107,
    },
    $3a4: {
      $3_8: 202,
      $1_2: 193,
      $3_4: 184,
      $1: 175,
      $1_1_2: 165,
      $2: 157,
      $3: 133,
      $4: 119,
    },
    $6a7: {
      $3_8: 216,
      $1_2: 205,
      $3_4: 197,
      $1: 184,
      $1_1_2: 174,
      $2: 166,
      $3: 154,
      $4: 144,
    },
  }

  let volWater = 193

  if (airEntrained) {
    volWater = volWaterWithAir[slump][tmn]
  } else {
    volWater = volWaterWithOutAir[slump][tmn]
  }

  volWater = volWater / 1000

  useEffect(() => {
    setAci((prevState) => ({ ...prevState, volWater }))
  }, [airEntrained, tmn, slump])
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, volWater }))
  }, [])

  return (
    <React.Fragment>
      <h2>Volumen de agua</h2>
      <p>Volumen unitario de agua: {volWater * 1000} lt</p>
    </React.Fragment>
  )
}

export default WaterContent

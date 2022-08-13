import React from 'react'
import { EMath } from '../shared/library/eMath'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'

const RelationAc = () => {
  const { aci, setAci } = React.useContext(AciContext)
  const { fcr, airEntrained } = aci
  let rac = 0.5584

  const racWithOutAir = {
    150: 0.8,
    200: 0.7,
    250: 0.62,
    300: 0.55,
    350: 0.48,
    400: 0.43,
    450: 0.38,
  }
  const racWithAir = {
    150: 0.71,
    200: 0.61,
    250: 0.53,
    300: 0.46,
    350: 0.4,
    400: 0.37,
    450: 0.29,
  }

  function roundCeil50(number) {
    return EMath.round(Math.ceil(number / 50) * 50, 0)
  }

  function roundFloor50(number) {
    return EMath.round(Math.floor(number / 50) * 50, 0)
  }

  function interpolate(x, xi, yi, xj, yj) {
    return yi + ((x - xi) * (yj - yi)) / (xj - xi)
  }
  if (fcr < 150) {
    //Menor
    //extrapolacionLow
    let fcrRoundedCeil = 150
    let fcrRoundedFloor = 200
    let racCeil = 0
    let racFloor = 0
    if (airEntrained) {
      racCeil = racWithAir[fcrRoundedCeil]
      racFloor = racWithAir[fcrRoundedFloor]
    } else {
      racCeil = racWithOutAir[fcrRoundedCeil]
      racFloor = racWithOutAir[fcrRoundedFloor]
    }
    rac = interpolate(fcr, fcrRoundedFloor, racFloor, fcrRoundedCeil, racCeil)
  } else if (150 <= fcr && fcr <= 450) {
    //entre
    //interpolacion
    let fcrRoundedCeil = roundCeil50(fcr)
    let fcrRoundedFloor = roundFloor50(fcr)
    let racCeil = 0
    let racFloor = 0
    if (airEntrained) {
      racCeil = racWithAir[fcrRoundedCeil]
      racFloor = racWithAir[fcrRoundedFloor]
    } else {
      racCeil = racWithOutAir[fcrRoundedCeil]
      racFloor = racWithOutAir[fcrRoundedFloor]
    }
    rac = interpolate(fcr, fcrRoundedFloor, racFloor, fcrRoundedCeil, racCeil)
    // console.log({ fcrRoundedCeil, fcrRoundedFloor, racCeil, racFloor, rac })
  } else if (450 < fcr) {
    //mayor
    //extrapolacionHigh

    let fcrRoundedCeil = 400
    let fcrRoundedFloor = 450
    let racCeil = 0
    let racFloor = 0
    if (airEntrained) {
      racCeil = racWithAir[fcrRoundedCeil]
      racFloor = racWithAir[fcrRoundedFloor]
    } else {
      racCeil = racWithOutAir[fcrRoundedCeil]
      racFloor = racWithOutAir[fcrRoundedFloor]
    }
    rac = interpolate(fcr, fcrRoundedFloor, racFloor, fcrRoundedCeil, racCeil)
  }
  React.useEffect(() => {
    setAci((prevState) => ({ ...prevState, rac }))
  }, [fcr, airEntrained])
  React.useEffect(() => {
    setAci((prevState) => ({ ...prevState, rac }))
  }, [])
  return (
    <React.Fragment>
      <h2>Relación AC</h2>
      <p>
        Agua / Cemento =
        <Number value={rac} decimals={4} />
      </p>
    </React.Fragment>
  )
}

export default RelationAc

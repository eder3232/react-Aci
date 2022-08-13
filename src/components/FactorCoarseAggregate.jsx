import React, { useContext, useEffect } from 'react'

import AciContext from '../context/AciContext'
import Number from '../shared/components/DisplayElements/Number'
import { EMath } from '../shared/library/eMath'

const FactorCoarseAggregate = () => {
  const { aci, setAci } = useContext(AciContext)
  const { tmn, fmf } = aci

  let factorCoarseAggregate = 0.69

  const fmf2_40 = {
    $3_8: 0.5,
    $1_2: 0.59,
    $3_4: 0.66,
    $1: 0.71,
    $1_1_2: 0.76,
    $2: 0.78,
    $3: 0.81,
    $4: 0.87,
  }

  const fmf2_60 = {
    $3_8: 0.48,
    $1_2: 0.57,
    $3_4: 0.64,
    $1: 0.69,
    $1_1_2: 0.74,
    $2: 0.76,
    $3: 0.79,
    $4: 0.85,
  }

  const fmf2_80 = {
    $3_8: 0.46,
    $1_2: 0.55,
    $3_4: 0.62,
    $1: 0.67,
    $1_1_2: 0.72,
    $2: 0.74,
    $3: 0.77,
    $4: 0.83,
  }

  const fmf3_00 = {
    $3_8: 0.44,
    $1_2: 0.53,
    $3_4: 0.6,
    $1: 0.65,
    $1_1_2: 0.7,
    $2: 0.72,
    $3: 0.75,
    $4: 0.81,
  }

  const fmfData = {
    fmf2_40,
    fmf2_60,
    fmf2_80,
    fmf3_00,
  }

  if (fmf < 2.4) {
    let fmfFloor = 2.4
    let fmfCeil = 2.6
    let fmfFloorString = 'fmf2_40'
    let fmfCeilString = 'fmf2_60'
    let factorFloor = fmfData[fmfFloorString][tmn]
    let factorCeil = fmfData[fmfCeilString][tmn]
    factorCoarseAggregate = EMath.interpolate(
      fmfFloor,
      factorFloor,
      fmfCeil,
      factorCeil,
      fmf
    )
  } else if (2.4 <= fmf && fmf <= 3.0) {
    let fmfFloor = 0
    let fmfCeil = 0
    let fmfFloorString = 0
    let fmfCeilString = 0
    let factorFloor = 0
    let factorCeil = 0
    if (2.4 <= fmf && fmf <= 2.6) {
      fmfFloorString = 'fmf2_40'
      fmfCeilString = 'fmf2_60'
      fmfFloor = 2.4
      fmfCeil = 2.6
    } else if (2.6 < fmf && fmf < 2.8) {
      fmfFloorString = 'fmf2_60'
      fmfCeilString = 'fmf2_80'
      fmfFloor = 2.6
      fmfCeil = 2.8
    } else if (2.8 <= fmf && fmf <= 3.0) {
      fmfFloorString = 'fmf2_80'
      fmfCeilString = 'fmf3_00'
      fmfFloor = 2.8
      fmfCeil = 3.0
    }

    factorFloor = fmfData[fmfFloorString][tmn]
    factorCeil = fmfData[fmfCeilString][tmn]

    factorCoarseAggregate = EMath.interpolate(
      fmfFloor,
      factorFloor,
      fmfCeil,
      factorCeil,
      fmf
    )
  } else if (3.0 < fmf) {
    let fmfFloor = 2.8
    let fmfCeil = 3
    let fmfFloorString = 'fmf2_80'
    let fmfCeilString = 'fmf3_00'
    let factorFloor = fmfData[fmfFloorString][tmn]
    let factorCeil = fmfData[fmfCeilString][tmn]
    factorCoarseAggregate = EMath.interpolate(
      fmfFloor,
      factorFloor,
      fmfCeil,
      factorCeil,
      fmf
    )
  }

  useEffect(() => {
    // setAci({ ...aci, factor })
    setAci((prevState) => ({ ...prevState, factorCoarseAggregate }))
  }, [tmn, fmf])
  useEffect(() => {
    // setAci({ ...aci, factor })
    setAci((prevState) => ({ ...prevState, factorCoarseAggregate }))
  }, [])
  return (
    <div>
      <h2>Factor agregado grueso</h2>
      <p>
        El factor del agregado grueso es:{' '}
        <Number value={factorCoarseAggregate} decimals={3} />
      </p>
    </div>
  )
}

export default FactorCoarseAggregate

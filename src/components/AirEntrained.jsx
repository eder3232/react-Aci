import React, { useEffect, useState } from 'react'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import AciContext from '../context/AciContext'

const AirEntrained = () => {
  const { aci, setAci } = React.useContext(AciContext)

  const [airEntrained, setAirEntrained] = React.useState(false)

  const handleChange = (event) => {
    setAirEntrained(event.target.value)
  }

  React.useEffect(() => {
    // setAci({ ...aci, airEntrained })
    setAci((prevState) => ({ ...prevState, airEntrained }))
  }, [airEntrained])
  return (
    <React.Fragment>
      <h2>Aire</h2>
      <p>Se incorporará aire a la mezcla?</p>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Aire incorporado
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={airEntrained}
            label="Aire incorporado"
            onChange={handleChange}
          >
            <MenuItem value={true}>Se incorpora aire </MenuItem>
            <MenuItem value={false}>No se incorpora aire </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ pt: 2 }}>
        {airEntrained ? (
          <WithAir setAci={setAci} aci={aci} />
        ) : (
          <WithOutAir setAci={setAci} aci={aci} />
        )}
      </Box>
    </React.Fragment>
  )
}

const WithOutAir = ({ aci, setAci }) => {
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
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, air: airContent[aci.tmn] }))
  }, [])
  return (
    <div>
      <p>Aire de acuerdo al TMN: {airContent[aci.tmn]} %</p>
    </div>
  )
}

const WithAir = ({ aci, setAci }) => {
  const [exposicion, setExposicion] = useState('moderada')
  const { tmn } = aci

  const data = {
    suave: {
      $3_8: 4.5,
      $1_2: 4,
      $3_4: 3.5,
      $1: 3,
      $1_1_2: 2.5,
      $2: 2.0,
      $3: 1.5,
      $4: 1,
    },
    moderada: {
      $3_8: 6,
      $1_2: 5.5,
      $3_4: 5.0,
      $1: 4.5,
      $1_1_2: 4.5,
      $2: 4,
      $3: 3.5,
      $4: 3,
    },
    severa: {
      $3_8: 7.5,
      $1_2: 7,
      $3_4: 6,
      $1: 6,
      $1_1_2: 5.5,
      $2: 5.0,
      $3: 4.5,
      $4: 4,
    },
  }

  const radioGroupHandler = (event, value) => {
    setExposicion(value)
  }

  let airContent = data[exposicion][tmn]
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, air: airContent }))
  }, [exposicion, tmn])
  useEffect(() => {
    setAci((prevState) => ({ ...prevState, air: airContent }))
  }, [])

  return (
    <div>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="moderada"
        name="radio-buttons-group"
        onChange={radioGroupHandler}
      >
        <FormControlLabel
          value="suave"
          control={<Radio />}
          label="Exposición suave"
        />
        <FormControlLabel
          value="moderada"
          control={<Radio />}
          label="Exposición moderada"
        />
        <FormControlLabel
          value="severa"
          control={<Radio />}
          label="Exposición severa"
        />
      </RadioGroup>

      <p>Aire de acuerdo a la exposicion: {airContent} %</p>
    </div>
  )
}

export default AirEntrained

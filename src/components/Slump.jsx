import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import AciContext from '../context/AciContext'

const Slump = () => {
  const { aci, setAci } = React.useContext(AciContext)
  const [slump, setSlump] = React.useState('$3a4')
  const handleChange = (event) => {
    setSlump(event.target.value)
  }
  React.useEffect(() => {
    // setAci({ ...aci, slump })
    setAci((prevState) => ({ ...prevState, slump }))
  }, [slump])
  React.useEffect(() => {
    // setAci({ ...aci, slump })
    setAci((prevState) => ({ ...prevState, slump }))
  }, [])

  return (
    <React.Fragment>
      <h2>Selección del slump</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Slump</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={slump}
            label="Slump"
            onChange={handleChange}
          >
            <MenuItem value={'$1a2'}>1" a 2" </MenuItem>
            <MenuItem value={'$3a4'}>3" a 4" </MenuItem>
            <MenuItem value={'$6a7'}>6" a 7" </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </React.Fragment>
  )
}

export default Slump

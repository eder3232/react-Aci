import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import AciContext from '../context/AciContext'

const Tmn = () => {
  const { aci, setAci } = React.useContext(AciContext)
  const [tmn, setTmn] = React.useState('$1')
  const handleChange = (event) => {
    setTmn(event.target.value)
  }
  React.useEffect(() => {
    // setAci({ ...aci, tmn })
    setAci((prevState) => ({ ...prevState, tmn }))
  }, [tmn])
  React.useEffect(() => {
    // setAci({ ...aci, tmn })
    setAci((prevState) => ({ ...prevState, tmn }))
  }, [])
  return (
    <React.Fragment>
      <h2>Selección del TMN</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">TMN</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tmn}
            label="TMN"
            onChange={handleChange}
          >
            <MenuItem value={'$3_8'}>TMN: 3/8" </MenuItem>
            <MenuItem value={'$1_2'}>TMN: 1/2" </MenuItem>
            <MenuItem value={'$3_4'}>TMN: 3/4" </MenuItem>
            <MenuItem value={'$1'}>TMN: 1" </MenuItem>
            <MenuItem value={'$1_1_2'}>TMN: 1 1/2" </MenuItem>
            <MenuItem value={'$2'}>TMN: 2" </MenuItem>
            <MenuItem value={'$3'}>TMN: 3" </MenuItem>
            <MenuItem value={'$4'}>TMN: 4" </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </React.Fragment>
  )
}

export default Tmn

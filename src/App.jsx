import React, { useContext, useState } from 'react'

import Box from '@mui/material/Box'

import AciProvider from './context/AciProvider'

import Fcr from './components/Fcr'
import Tmn from './components/Tmn'
import AirEntrained from './components/AirEntrained'
import Slump from './components/Slump'
import WaterContent from './components/WaterContent'
import RelationAc from './components/RelationAc'
import Cement from './components/Cement'
import FinenessModulusFine from './components/FinenessModulusFine'
import FactorCoarseAggregate from './components/FactorCoarseAggregate'
import VolCement from './components/VolCement'

import Pruebas from './components/Pruebas'
import WeightCoarseAggregate from './components/WeightCoarseAggregate'
import VolCoarseAggregate from './components/VolCoarseAggregate'
import VolFineAggregate from './components/VolFineAggregate'
import WeightFineAggregate from './components/WeightFineAggregate'
import DesignSSS from './components/DesignSSS'
import CorrectionFine from './components/CorrectionFine'
import CorrectionCoarse from './components/CorrectionCoarse'
import CorrectionWater from './components/CorrectionWater'
import DesignCorrected from './components/DesignCorrected'
import ProportionWeight from './components/ProportionWeight'

function App() {
  return (
    <AciProvider>
      <Box sx={{ p: 1 }}>
        <h1>Diseño de mezclas - Método ACI</h1>
        <Fcr />
        <Tmn />
        <AirEntrained />
        <Slump />
        <WaterContent />
        <RelationAc />
        <Cement />
        <FinenessModulusFine />
        <FactorCoarseAggregate />
        <VolCement />
        <WeightCoarseAggregate />
        <VolCoarseAggregate />
        <VolFineAggregate />
        <WeightFineAggregate />
        <DesignSSS />
        <CorrectionFine />
        <CorrectionCoarse />
        <CorrectionWater />
        <DesignCorrected />
        <ProportionWeight />
        {/* <Pruebas /> */}
      </Box>
    </AciProvider>
  )
}

export default App

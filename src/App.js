import './App.css';
import Search from './components/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ToolsLayout from './components/ToolsLayout';
import Tools from './pages/Tools/Tools';
import Vendors from './pages/Vendors';
import Support from './pages/Support';
import Info from './pages/Info';

// Calculators:
import PetCBD from './components/calculators/PetCBD';
import PlateauDXM from './components/calculators/PlateauDXM';
import VolumeOilAdvancedCBD from './components/calculators/VolumeOilAdvancedCBD';
import VolumeOilSimpleCBD from './components/calculators/VolumeOilSimpleCBD';
import Privacy from './pages/Privacy';
import KratomTaper from './components/calculators/KratomTaper';
import AdvancedKratomTaper from './components/calculators/AdvancedKratomTaper';
import Home from './pages/Home';


function App() {
  
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/vendors' element={<Vendors />} />
        <Route path='/tools' element={<ToolsLayout />}>
          <Route index element={<Tools />} />
          <Route path='/tools/cbd-dose-for-pets' element={<PetCBD />} />
          <Route path='/tools/volume-calc-advanced' element={<VolumeOilAdvancedCBD />} />
          <Route path='/tools/volume-calc-simple' element={<VolumeOilSimpleCBD />} />
          <Route path='/tools/dxm-plateau-calc' element={<PlateauDXM />} />
          <Route path='/tools/kratom-taper' element={<KratomTaper />} />
          <Route path='/tools/advanced-kratom-taper' element={<AdvancedKratomTaper />} />
          
        </Route>
        <Route path='/support' element={<Support />} />
        <Route path='/info/' element={<Info />} />
        <Route path='/privacy-policy' element={<Privacy />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

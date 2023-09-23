import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ToolsLayout from './components/ToolsLayout';
import Tools from './pages/Tools/Tools';
import Vendors from './pages/Vendors';
import Support from './pages/Support';
import Info from './pages/Info';
import Cbd from './pages/Tools/Cbd';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
        <Route path='/vendors' element={<Vendors />} />
        <Route path='/tools' element={<ToolsLayout />}>
          <Route index element={<Tools />} />
          <Route path='/tools/cbd' element={<Cbd />} />
        </Route>
        <Route path='/support' element={<Support />} />
        <Route path='/info/' element={<Info />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

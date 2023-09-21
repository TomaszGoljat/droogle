import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

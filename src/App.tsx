
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import EnergyOptimizer from './pages/EnergyOptimizer';
import TransportManager from './pages/TransportManager';
import GridBalancer from './pages/GridBalancer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="energy" element={<EnergyOptimizer />} />
          <Route path="transport" element={<TransportManager />} />
          <Route path="renewables" element={<GridBalancer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

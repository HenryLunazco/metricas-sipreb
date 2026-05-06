import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { ProyectosPage } from './pages/ProyectosPage';
import { RiesgosPage } from './pages/RiesgosPage';
import { KpiPage } from './pages/KpiPage';
import { UsuariosPage } from './pages/UsuariosPage';
import { InstruccionesPage } from './pages/InstruccionesPage';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/riesgos" element={<RiesgosPage />} />
          <Route path="/kpis" element={<KpiPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/instrucciones" element={<InstruccionesPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;

import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/PageHeader';
import { TrendingUp, AlertCircle, Folder, Users } from 'lucide-react';

export const DashboardPage = () => {
  const { data, loading, error, refresh } = useGoogleSheet('Dashboard');

  // Extraer columnas dinamicamente de la primera fila
  const columns = data.length > 0
    ? Object.keys(data[0]).map((key) => ({ key, label: key }))
    : [];

  // Cards de resumen si hay datos numericos o categoricos
  const resumen = [
    { label: 'Total Registros', value: data.length, icon: TrendingUp, color: 'text-primary' },
    { label: 'Alertas', value: data.filter(r => String(r.estado || r.status || '').toLowerCase() === 'alerta').length, icon: AlertCircle, color: 'text-danger' },
    { label: 'Proyectos Activos', value: data.filter(r => String(r.estado || r.status || '').toLowerCase() === 'activo').length, icon: Folder, color: 'text-success' },
    { label: 'Usuarios', value: '—', icon: Users, color: 'text-warning' },
  ];

  return (
    <div>
      <PageHeader
        titulo="Dashboard"
        subtitulo="Vista agregada de indicadores principales"
      />

      {/* Cards de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {resumen.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-surface border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-secondary uppercase tracking-wide">{item.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-slate-50 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <LoadingSpinner mensaje="Cargando dashboard..." />}
      {error && <ErrorMessage mensaje={error} onReintentar={refresh} />}

      {!loading && !error && (
        <DataTable
          columns={columns.length > 0 ? columns : [{ key: 'info', label: 'Informacion' }]}
          data={data}
          filtrable={true}
        />
      )}
    </div>
  );
};

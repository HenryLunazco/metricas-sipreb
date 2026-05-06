import { useState } from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/PageHeader';
import { Modal } from '../components/Modal';
import { DynamicForm } from '../components/DynamicForm';
import { BarChart3, Target } from 'lucide-react';

export const KpiPage = () => {
  const { data, loading, error, refresh, createRecord } = useGoogleSheet('Indicadores KPI');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const emptyRecord = data.length > 0
    ? Object.fromEntries(Object.keys(data[0]).map(k => [k, '']))
    : {};

  const handleCreate = async (payload) => {
    setEnviando(true);
    try {
      await createRecord(payload);
      setModalAbierto(false);
    } catch {
    } finally {
      setEnviando(false);
    }
  };

  // Render especial para columnas que parezcan porcentajes o valores numericos
  const columns = data.length > 0
    ? Object.keys(data[0]).map((key) => ({
        key,
        label: key,
        render: (val) => {
          const k = key.toLowerCase();
          if (k.includes('%') || k.includes('porcentaje') || k.includes('avance') || k.includes('cumplimiento')) {
            const num = parseFloat(val);
            if (!isNaN(num)) {
              return (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${num >= 80 ? 'bg-emerald-500' : num >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(100, Math.max(0, num))}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{num}%</span>
                </div>
              );
            }
          }
          if (k.includes('valor') || k.includes('meta') || k.includes('actual')) {
            const num = parseFloat(val);
            if (!isNaN(num)) {
              return <span className="font-mono text-sm text-slate-700">{num.toLocaleString()}</span>;
            }
          }
          return val || '-';
        }
      }))
    : [];

  return (
    <div>
      <PageHeader
        titulo="Indicadores KPI"
        subtitulo="Metricas y KPIs de seguimiento"
        onNuevo={() => setModalAbierto(true)}
      />

      {loading && !modalAbierto && <LoadingSpinner mensaje="Cargando indicadores..." />}
      {error && <ErrorMessage mensaje={error} onReintentar={refresh} />}

      {!loading && !error && (
        <DataTable
          columns={columns}
          data={data}
          filtrable={true}
        />
      )}

      <Modal
        titulo="Nuevo Indicador KPI"
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      >
        {enviando ? (
          <LoadingSpinner mensaje="Guardando indicador..." />
        ) : (
          <DynamicForm
            initialData={emptyRecord}
            onSubmit={handleCreate}
            onCancel={() => setModalAbierto(false)}
            submitLabel="Crear Indicador"
          />
        )}
      </Modal>
    </div>
  );
};

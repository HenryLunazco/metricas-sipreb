import { useState } from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/PageHeader';
import { Modal } from '../components/Modal';
import { DynamicForm } from '../components/DynamicForm';
import { AlertTriangle, ShieldCheck, AlertOctagon } from 'lucide-react';

export const RiesgosPage = () => {
  const { data, loading, error, refresh, createRecord } = useGoogleSheet('Riesgos');
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
      // Error manejado por hook
    } finally {
      setEnviando(false);
    }
  };

  const getImpactoBadge = (val) => {
    const v = String(val || '').toLowerCase();
    if (v.includes('alto') || v.includes('critico') || v.includes('critical')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
          <AlertOctagon className="w-3.5 h-3.5" /> {val}
        </span>
      );
    }
    if (v.includes('medio') || v.includes('moderado') || v.includes('medium')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5" /> {val}
        </span>
      );
    }
    if (v.includes('bajo') || v.includes('low')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" /> {val}
        </span>
      );
    }
    return <span className="text-slate-500">{val || '-'}</span>;
  };

  const columns = data.length > 0
    ? Object.keys(data[0]).map((key) => ({
        key,
        label: key,
        render: key.toLowerCase().includes('impacto') || key.toLowerCase().includes('nivel')
          ? (val) => getImpactoBadge(val)
          : undefined
      }))
    : [];

  return (
    <div>
      <PageHeader
        titulo="Riesgos"
        subtitulo="Gestion de riesgos identificados"
        onNuevo={() => setModalAbierto(true)}
      />

      {loading && !modalAbierto && <LoadingSpinner mensaje="Cargando riesgos..." />}
      {error && <ErrorMessage mensaje={error} onReintentar={refresh} />}

      {!loading && !error && (
        <DataTable
          columns={columns}
          data={data}
          filtrable={true}
        />
      )}

      <Modal
        titulo="Nuevo Riesgo"
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      >
        {enviando ? (
          <LoadingSpinner mensaje="Guardando riesgo..." />
        ) : (
          <DynamicForm
            initialData={emptyRecord}
            onSubmit={handleCreate}
            onCancel={() => setModalAbierto(false)}
            submitLabel="Registrar Riesgo"
          />
        )}
      </Modal>
    </div>
  );
};

import { useState } from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/PageHeader';
import { Modal } from '../components/Modal';
import { DynamicForm } from '../components/DynamicForm';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export const ProyectosPage = () => {
  const { data, loading, error, refresh, createRecord } = useGoogleSheet('Proyectos');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // Plantilla de nuevo registro basada en las claves del primer elemento
  const emptyRecord = data.length > 0
    ? Object.fromEntries(Object.keys(data[0]).map(k => [k, '']))
    : {};

  const handleCreate = async (payload) => {
    setEnviando(true);
    try {
      await createRecord(payload);
      setModalAbierto(false);
    } catch {
      // El error ya se maneja en el hook
    } finally {
      setEnviando(false);
    }
  };

  const getEstadoBadge = (estado) => {
    const est = String(estado || '').toLowerCase();
    if (est === 'completado' || est === 'finalizado') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" /> Completado
        </span>
      );
    }
    if (est === 'en progreso' || est === 'activo' || est === 'en proceso') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          <Clock className="w-3.5 h-3.5" /> En progreso
        </span>
      );
    }
    if (est === 'retrasado' || est === 'alerta' || est === 'riesgo') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
          <AlertTriangle className="w-3.5 h-3.5" /> Retrasado
        </span>
      );
    }
    return <span className="text-slate-500">{estado || '-'}</span>;
  };

  // Render custom para estado
  const columns = data.length > 0
    ? Object.keys(data[0]).map((key) => ({
        key,
        label: key,
        render: key.toLowerCase().includes('estado') || key.toLowerCase().includes('status')
          ? (val) => getEstadoBadge(val)
          : undefined
      }))
    : [];

  return (
    <div>
      <PageHeader
        titulo="Proyectos"
        subtitulo="Registro de proyectos activos"
        onNuevo={() => setModalAbierto(true)}
      />

      {loading && !modalAbierto && <LoadingSpinner mensaje="Cargando proyectos..." />}
      {error && <ErrorMessage mensaje={error} onReintentar={refresh} />}

      {!loading && !error && (
        <DataTable
          columns={columns}
          data={data}
          filtrable={true}
        />
      )}

      <Modal
        titulo="Nuevo Proyecto"
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      >
        {enviando ? (
          <LoadingSpinner mensaje="Guardando proyecto..." />
        ) : (
          <DynamicForm
            initialData={emptyRecord}
            onSubmit={handleCreate}
            onCancel={() => setModalAbierto(false)}
            submitLabel="Crear Proyecto"
          />
        )}
      </Modal>
    </div>
  );
};

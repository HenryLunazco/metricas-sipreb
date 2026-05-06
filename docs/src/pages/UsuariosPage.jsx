import { useState } from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/PageHeader';
import { Modal } from '../components/Modal';
import { DynamicForm } from '../components/DynamicForm';
import { User, Mail, Shield } from 'lucide-react';

export const UsuariosPage = () => {
  const { data, loading, error, refresh, createRecord } = useGoogleSheet('Usuarios');
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

  const getAvatar = (nombre) => {
    const iniciales = String(nombre || '')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    return (
      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
        {iniciales || <User className="w-4 h-4" />}
      </div>
    );
  };

  const columns = data.length > 0
    ? Object.keys(data[0]).map((key) => ({
        key,
        label: key,
        render: (val, row) => {
          const k = key.toLowerCase();
          if (k.includes('nombre') || k.includes('name')) {
            return (
              <div className="flex items-center gap-3">
                {getAvatar(val)}
                <span className="font-medium text-slate-900">{val}</span>
              </div>
            );
          }
          if (k.includes('email') || k.includes('correo')) {
            return (
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5" />
                <span>{val || '-'}</span>
              </div>
            );
          }
          if (k.includes('rol') || k.includes('role') || k.includes('perfil')) {
            return (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                <Shield className="w-3 h-3" /> {val || '-'}
              </span>
            );
          }
          return val || '-';
        }
      }))
    : [];

  return (
    <div>
      <PageHeader
        titulo="Usuarios"
        subtitulo="Gestion de usuarios del sistema"
        onNuevo={() => setModalAbierto(true)}
      />

      {loading && !modalAbierto && <LoadingSpinner mensaje="Cargando usuarios..." />}
      {error && <ErrorMessage mensaje={error} onReintentar={refresh} />}

      {!loading && !error && (
        <DataTable
          columns={columns}
          data={data}
          filtrable={true}
        />
      )}

      <Modal
        titulo="Nuevo Usuario"
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      >
        {enviando ? (
          <LoadingSpinner mensaje="Guardando usuario..." />
        ) : (
          <DynamicForm
            initialData={emptyRecord}
            onSubmit={handleCreate}
            onCancel={() => setModalAbierto(false)}
            submitLabel="Crear Usuario"
          />
        )}
      </Modal>
    </div>
  );
};

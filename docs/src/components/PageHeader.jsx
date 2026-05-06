import { Plus } from 'lucide-react';

export const PageHeader = ({ titulo, subtitulo, onNuevo }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{titulo}</h1>
      {subtitulo && <p className="text-sm text-secondary mt-1">{subtitulo}</p>}
    </div>
    {onNuevo && (
      <button
        onClick={onNuevo}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Nuevo registro
      </button>
    )}
  </div>
);

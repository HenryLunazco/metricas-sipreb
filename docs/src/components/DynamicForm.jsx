import { useState, useEffect } from 'react';

/**
 * Formulario dinamico que genera campos a partir de las claves de un objeto de ejemplo.
 * Omite campos tecnicos como 'id', 'timestamp', 'rowIndex'.
 */
const CAMPOS_EXCLUIDOS = ['id', 'rowIndex', 'timestamp', 'creadoEn', 'actualizadoEn'];

export const DynamicForm = ({ initialData = {}, onSubmit, onCancel, submitLabel = 'Guardar' }) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(initialData || {});
  }, [initialData]);

  const keys = Object.keys(initialData || {}).filter(
    (k) => !CAMPOS_EXCLUIDOS.includes(k)
  );

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validacion simple: campos vacios
    const vacios = keys.filter((k) => {
      const v = values[k];
      return v === undefined || v === null || String(v).trim() === '';
    });
    if (vacios.length > 0) {
      alert(`Complete los campos obligatorios: ${vacios.join(', ')}`);
      return;
    }
    onSubmit(values);
  };

  const getInputType = (key) => {
    const lower = key.toLowerCase();
    if (lower.includes('fecha') || lower.includes('date')) return 'date';
    if (lower.includes('email') || lower.includes('correo')) return 'email';
    if (lower.includes('numero') || lower.includes('monto') || lower.includes('%') || lower.includes('porcentaje')) return 'number';
    return 'text';
  };

  const getLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {keys.map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {getLabel(key)}
          </label>
          {typeof values[key] === 'string' && values[key].length > 60 ? (
            <textarea
              value={values[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
          ) : (
            <input
              type={getInputType(key)}
              value={values[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          )}
        </div>
      ))}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

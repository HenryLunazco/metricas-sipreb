import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { PageHeader } from '../components/PageHeader';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { BookOpen } from 'lucide-react';

export const InstruccionesPage = () => {
  const { data, loading, error, refresh } = useGoogleSheet('Instrucciones');

  return (
    <div className="max-w-4xl">
      <PageHeader
        titulo="Instrucciones del Sistema"
        subtitulo="Guía de uso según el Google Sheet"
      />

      {loading && <LoadingSpinner mensaje="Cargando instrucciones..." />}
      {error && <ErrorMessage mensaje={error} onReintentar={refresh} />}

      {!loading && !error && data.length > 0 && (
        <div className="mt-6 space-y-4">
          {data.map((row, idx) => {
            // El sheet de instrucciones no tiene un formato de tabla estándar.
            // Extraemos todos los valores de la fila y los concatenamos.
            const textValues = Object.values(row).filter(val => val && String(val).trim() !== '');
            const rowText = textValues.join(' ');

            if (!rowText) return null;

            // Detectar si es un título (ej: "PASO 1...")
            const isTitle = rowText.toUpperCase().includes('PASO') || rowText.toUpperCase().includes('GUÍA');

            if (isTitle) {
              return (
                <div key={idx} className="bg-primary text-white p-4 rounded-t-lg mt-6 shadow-sm flex items-center gap-2 font-bold">
                  <BookOpen className="w-5 h-5" />
                  {rowText}
                </div>
              );
            }

            return (
              <div key={idx} className="bg-white p-4 border border-border shadow-sm text-slate-700 leading-relaxed">
                {rowText}
              </div>
            );
          })}
        </div>
      )}
      
      {!loading && !error && data.length === 0 && (
        <div className="mt-6 text-center text-slate-500">
          No se encontraron instrucciones en la hoja "Instrucciones".
        </div>
      )}
    </div>
  );
};

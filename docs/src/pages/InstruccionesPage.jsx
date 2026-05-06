import { PageHeader } from '../components/PageHeader';
import { BookOpen, AlertTriangle, CheckCircle2, LayoutTemplate } from 'lucide-react';

export const InstruccionesPage = () => {
  return (
    <div className="max-w-4xl">
      <PageHeader
        titulo="Instrucciones del Sistema"
        subtitulo="Guía para configurar correctamente el Google Sheet y el Frontend"
      />

      <div className="space-y-6 mt-6">
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-800">¿Por qué mi tabla se ve extraña o no puedo crear registros?</h2>
          </div>
          <p className="text-slate-600 mb-4">
            Actualmente tu Google Sheet tiene <strong>títulos grandes y descripciones en las primeras filas</strong> (ej: "GESTIÓN DE USUARIOS"). El sistema está diseñado como una base de datos real, lo que significa que <strong>la Fila 1 siempre debe contener los nombres de las columnas</strong>, y la Fila 2 en adelante deben ser los datos.
          </p>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-amber-800 font-medium text-sm">
              Al tener títulos en la fila 1, el sistema piensa que la columna se llama "GESTIÓN DE USUARIOS", y por eso los formularios de "Nuevo Registro" fallan y las tablas se ven desordenadas.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold text-slate-800">Cómo solucionar el Google Sheet (¡Muy Importante!)</h2>
          </div>
          <ol className="list-decimal list-inside space-y-3 text-slate-700">
            <li>Abre tu <a href="https://docs.google.com/spreadsheets/d/1f1xsUWPbARnBclz6TjEIQjlH-nxHcR9XXlneTAEmIjQ/edit" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Sheet</a>.</li>
            <li>En <strong>todas las hojas</strong> (Dashboard, Proyectos, Riesgos, etc.), <strong>elimina las filas 1, 2 y 3</strong> si contienen texto decorativo o títulos.</li>
            <li>Asegúrate de que la <strong>Fila 1</strong> de arriba contenga estrictamente los nombres de las columnas (ejemplo: <code className="bg-slate-100 px-1 py-0.5 rounded">id</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">nombre</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">estado</code>).</li>
            <li><strong>Requisito obligatorio:</strong> Siempre debe haber una columna llamada <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-bold">id</code> en todas tus tablas para que puedas editar y eliminar correctamente.</li>
            <li>Los datos reales deben empezar exactamente desde la <strong>Fila 2</strong> hacia abajo. No dejes filas en blanco entre los encabezados y los datos.</li>
          </ol>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <LayoutTemplate className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-slate-800">Ejemplo de Estructura Correcta</h2>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="px-4 py-2 border-b">1</th>
                  <th className="px-4 py-2 border-b border-l border-slate-300">id</th>
                  <th className="px-4 py-2 border-b border-l border-slate-300">nombre</th>
                  <th className="px-4 py-2 border-b border-l border-slate-300">correo</th>
                  <th className="px-4 py-2 border-b border-l border-slate-300">rol</th>
                </tr>
              </thead>
              <tbody className="bg-white text-slate-600">
                <tr>
                  <td className="px-4 py-2 font-bold bg-slate-50 border-b">2</td>
                  <td className="px-4 py-2 border-b border-l border-slate-200">USR-001</td>
                  <td className="px-4 py-2 border-b border-l border-slate-200">HenryDev</td>
                  <td className="px-4 py-2 border-b border-l border-slate-200">henry@ejemplo.com</td>
                  <td className="px-4 py-2 border-b border-l border-slate-200">Admin</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold bg-slate-50">3</td>
                  <td className="px-4 py-2 border-l border-slate-200">USR-002</td>
                  <td className="px-4 py-2 border-l border-slate-200">FernandoDev</td>
                  <td className="px-4 py-2 border-l border-slate-200">fernando@ejemplo.com</td>
                  <td className="px-4 py-2 border-l border-slate-200">Editor</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Una vez que corrijas esto en tu Google Sheet, simplemente recarga esta página web y todas las tablas, columnas y formularios de Nuevo Registro empezarán a funcionar mágicamente con un formato perfecto.
          </p>
        </div>
      </div>
    </div>
  );
};

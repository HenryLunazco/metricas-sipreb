import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export const DataTable = ({
  columns,
  data,
  filtrable = true,
  itemsPorPagina = 10,
  acciones = null
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  const datosFiltrados = filtrable
    ? data.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(busqueda.toLowerCase())
        )
      )
    : data;

  const totalPaginas = Math.ceil(datosFiltrados.length / itemsPorPagina) || 1;
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const datosPagina = datosFiltrados.slice(inicio, inicio + itemsPorPagina);

  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
      {filtrable && (
        <div className="px-5 py-3 border-b border-border flex items-center gap-3">
          <Search className="w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
            className="w-full text-sm outline-none bg-transparent placeholder:text-secondary"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
              {acciones && <th className="px-5 py-3">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {datosPagina.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (acciones ? 1 : 0)}
                  className="px-5 py-8 text-center text-secondary"
                >
                  No se encontraron registros.
                </td>
              </tr>
            ) : (
              datosPagina.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3 whitespace-nowrap text-slate-700">
                      {col.render ? col.render(row[col.key], row) : row[col.key] || '-'}
                    </td>
                  ))}
                  {acciones && (
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {acciones(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <span className="text-xs text-secondary">
            Mostrando {inicio + 1} a {Math.min(inicio + itemsPorPagina, datosFiltrados.length)} de {datosFiltrados.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
              className="p-1.5 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium px-2">
              {paginaActual} / {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
              className="p-1.5 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

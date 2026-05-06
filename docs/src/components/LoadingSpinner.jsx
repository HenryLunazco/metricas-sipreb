import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ mensaje = 'Cargando...' }) => (
  <div className="flex flex-col items-center justify-center py-12 text-secondary">
    <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
    <span className="text-sm font-medium">{mensaje}</span>
  </div>
);

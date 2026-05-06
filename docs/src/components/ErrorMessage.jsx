import { AlertTriangle } from 'lucide-react';

export const ErrorMessage = ({ mensaje, onReintentar }) => (
  <div className="flex flex-col items-center justify-center py-12 text-danger">
    <AlertTriangle className="w-10 h-10 mb-3" />
    <span className="text-sm font-medium text-center max-w-md">{mensaje}</span>
    {onReintentar && (
      <button
        onClick={onReintentar}
        className="mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
      >
        Reintentar
      </button>
    )}
  </div>
);

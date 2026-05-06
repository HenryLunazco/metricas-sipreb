import { useState, useEffect, useCallback } from 'react';
import { fetchSheetData, postSheetData } from '../services/api';

/**
 * Hook personalizado para gestionar datos de una hoja de Google Sheets.
 * Maneja estados de carga, error y sincronizacion automatica.
 *
 * @param {string} sheetName - Nombre de la hoja a consultar.
 * @returns {Object} - { data, loading, error, refresh, createRecord, updateRecord }
 */
export const useGoogleSheet = (sheetName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSheetData(sheetName);
      setData(result);
    } catch (err) {
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }, [sheetName]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = useCallback(() => {
    return loadData();
  }, [loadData]);

  const createRecord = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postSheetData(sheetName, payload, 'create');
      // Refrescar datos locales tras escritura exitosa
      await loadData();
      return result;
    } catch (err) {
      setError(err.message || 'Error al crear el registro');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sheetName, loadData]);

  const updateRecord = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postSheetData(sheetName, payload, 'update');
      await loadData();
      return result;
    } catch (err) {
      setError(err.message || 'Error al actualizar el registro');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sheetName, loadData]);

  return {
    data,
    loading,
    error,
    refresh,
    createRecord,
    updateRecord
  };
};

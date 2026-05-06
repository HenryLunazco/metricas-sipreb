/**
 * Servicio API para comunicacion con Google Apps Script.
 * El Apps Script actua como puente REST entre el frontend y Google Sheets.
 *
 * Estructura esperada de respuesta (JSON):
 * {
 *   success: boolean,
 *   data: Array<Object> | Object,
 *   message?: string
 * }
 *
 * Para escritura, se envia un objeto JSON con la propiedad 'action' y los datos.
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxmUeYh70k2DbMIxO2vtkGTYwN62XMUppdfl6lQm1ENwFZ471LHj0KCRN_-Op0gTyOK/exec';

/**
 * Realiza una peticion GET para obtener datos de una hoja especifica.
 * @param {string} sheetName - Nombre de la hoja (Dashboard, Proyectos, Riesgos, Indicadores KPI, Usuarios)
 * @returns {Promise<Array<Object>>} - Array de registros en formato JSON.
 */
export const fetchSheetData = async (sheetName) => {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Error desconocido del servidor');
    }

    return result.data || [];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

/**
 * Realiza una peticion POST para crear o actualizar un registro.
 * @param {string} sheetName - Nombre de la hoja destino.
 * @param {Object} payload - Datos del registro a enviar.
 * @param {string} [action='create'] - Accion a realizar: 'create' | 'update' | 'delete'.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const postSheetData = async (sheetName, payload, action = 'create') => {
  try {
    const body = {
      action,
      sheet: sheetName,
      data: payload
    };

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Error al procesar la solicitud');
    }

    return result;
  } catch (error) {
    console.error('Error al enviar datos:', error);
    throw error;
  }
};

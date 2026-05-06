const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxmUeYh70k2DbMIxO2vtkGTYwN62XMUppdfl6lQm1ENwFZ471LHj0KCRN_-Op0gTyOK/exec';

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

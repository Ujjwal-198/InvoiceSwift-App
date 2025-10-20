// frontend/src/utils/extractError.js
export function extractErrorMessage(err) {
  if (!err) return 'Unknown error';

  // If a plain string was thrown/rejected
  if (typeof err === 'string') return err;

  // Axios-style error with response body
  // err.response.data often contains { message, error, ... }
  if (err?.response?.data) {
    const data = err.response.data;
    if (typeof data === 'string') return data;
    return data.message || data.error || data.code || JSON.stringify(data);
  }

  // If the thunk used rejectWithValue with a payload (action.payload is checked in reducers)
  // or an Error object was thrown:
  if (err?.message) return err.message;

  // Last resort: stringify whole object
  try {
    return JSON.stringify(err);
  } catch (e) {
    return 'Unknown error';
  }
}
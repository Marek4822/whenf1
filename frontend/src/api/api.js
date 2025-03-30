import { fetchWithTimeout, API_BASE_URL } from './apiBase';

export const fetchDriverResults = async (grandPrixName, sessionType) => {
  return fetchWithTimeout(
    `${API_BASE_URL}/api/sessions/${grandPrixName}?session_type=${sessionType}`
  );
};

export const fetchGrandsPrix = async () => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/grands_prix`);
    if (!response.GrandsPrix) {
      throw new Error('Invalid data format from server');
    }
    return response;
  } catch (error) {
    throw new Error(`Failed to load Grand Prix data: ${error.message}`);
  }
};

export { fetchWithTimeout, API_BASE_URL };
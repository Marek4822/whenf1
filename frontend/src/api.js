// src/api.js
const API_BASE_URL = "http://localhost:5000"; // Replace with your Flask backend URL

const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout); 

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id); // Clear the timeout if the request completes
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Backend might be down.");
    } else {
      throw new Error("Failed to fetch data. Backend might be down.");
    }
  }
};

export const fetchDriverResults = async (grandPrixName, sessionType) => {
  return fetchWithTimeout(
    `${API_BASE_URL}/api/sessions/${grandPrixName}?session_type=${sessionType}`
  );
};
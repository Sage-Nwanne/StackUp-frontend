const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/dashboard`;

// Function to handle API requests with fetch
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers, // Allow overriding headers
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse response as JSON

  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

// Get all boards
export const index = async () => {
  return await fetchWithAuth(BASE_URL);
};

// Create a new board
export const create = async (board) => {
  return await fetchWithAuth(BASE_URL, {
    method: "POST",
    body: JSON.stringify(board),
  });
};

// Update a board
export const update = async (board) => {
  return await fetchWithAuth(`${BASE_URL}/${board.id}`, {
    method: "PUT",
    body: JSON.stringify(board),
  });
};

// Delete a board
export const deleteBoard = async (id) => {
  return await fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

// Get timeline data for a board
export const getTimeline = async (boardId) => {
  return await fetchWithAuth(`${BASE_URL}/${boardId}/timeline`);
};

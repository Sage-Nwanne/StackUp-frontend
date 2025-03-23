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

// Get all lists of board
export const index = async (boardId) => {
  return await fetchWithAuth(`${BASE_URL}/${boardId}`);
};

// Create a new list on board
export const create = async (boardId, listName) => {
  return await fetchWithAuth(`${BASE_URL}/${boardId}`, {
    method: "POST",
    body: JSON.stringify({name: listName}),
  });
};

// Update a list on board
export const update = async (boardId, listId, newName) => {
  return await fetchWithAuth(`${BASE_URL}/${boardId}/${listId}`, {
    method: "PUT",
    body: JSON.stringify({name: newName}),
  });
};

// Delete a list -> pick up here...
export const deleteList = async (id) => {
  return await fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

// Get timeline data for a board
export const getTimeline = async (boardId) => {
  return await fetchWithAuth(`${BASE_URL}/${boardId}/timeline`);
};

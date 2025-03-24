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
    
//Create a card on list - cardService.createCard(boardId, listId, formData)

export const createCard = async (boardId, listId, formData) => {
  return await fetchWithAuth(`${BASE_URL}/${boardId}/${listId}`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

// Update a card on list - cardService.updateCard(boardId, listId, cardId, formData)
export const updateCard = async (boardId, listId, cardId, formData) => {
  return await fetchWithAuth(`${BASE_URL}/${boardId}/${listId}/${cardId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });
};

//Delete a card on list - cardService.deleteCard(boardId, listId, cardId)
export const deleteCard = async (boardId, listId, cardId) => {
  return await fetchWithAuth(`${BASE_URL}/${boardId}/${listId}/${cardId}`, {
    method: "DELETE",
  });
};

export const moveCard = async (boardId, cardId, newListId) => {
    try {
        const response = await fetch(`${BASE_URL}/cards/${boardId}/move/${cardId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ newListId }),
        });

        if (!response.ok) {
            throw new Error("Failed to move card");
        }

        return await response.json();
    } catch (error) {
        console.error("Error moving card:", error);
    }
};

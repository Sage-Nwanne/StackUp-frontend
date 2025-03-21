const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;
export const moveCard = async (boardId, cardId, newListId) => {
    try {
        const response = await fetch(`${BASE_URL}/dashboard/cards/${boardId}/move/${cardId}`, {
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

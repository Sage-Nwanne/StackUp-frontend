const BOARD_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/boards`;

const CARD_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cards`;

const LIST_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/lists`;

// src/services/stackUpService.js

const boardIndex = async () => {
  try {
    const res = await fetch(BOARD_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const cardIndex = async () => {
  try {
    const res = await fetch(CARD_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const listIndex = async () => {
  try {
    const res = await fetch(LIST_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { 
  boardIndex,
  cardIndex,
  listIndex,
};

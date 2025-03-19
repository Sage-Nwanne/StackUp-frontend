const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/dashboard`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const data = await res.json();
      if (data.err) {
        throw new Error(data.err);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  

  const create = async (board) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(board),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  const update = async (board) => {
    try {
      const res = await fetch(`${BASE_URL}/${board.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(board),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  const deleteBoard = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };











  export { 
    index,create,update,deleteBoard
  };
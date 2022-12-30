import {api,requestConfig} from "../utils/config";

// registra um usuario
const register = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

      return res;
  } catch (error) {
    console.log(error);
  }
};


// busca dados do usuario pelo id
const getUserById = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api+"/users/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }

};

// pega dados dos usuarios
const getUsers = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
      const res = await fetch(api+"/users/", config)
      .then((res) => res.json())
      .catch((err) => err);

      return res;
  } catch (error) {
      console.log(error);
  }
};

// Update user details
const updateUser = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);
  
    try {
      const res = await fetch(api + "/users/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
      console.log(error);
    }
};

// deletando usuario
const deleteUser = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
      const res = await fetch(api+"/users/"+id, config)
      .then((res) => res.json())
      .catch((err) => err);

      return res;
  } catch (error) {
      console.log(error);
  }
};

const userService = {
    register,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
};

export default userService;
import { api, requestConfig } from "../utils/config";

// logout do usuario
const logout = () => {
  localStorage.removeItem("user");
};

// login usuario
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res.id) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  logout,
  login,
};

export default authService;

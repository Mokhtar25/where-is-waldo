import axios from "axios";
const baseUrl = "api/login";

let token = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

async function logIn(data: { username: string; password: string }) {
  const user = await axios.post(baseUrl, data);

  console.log(user.data);
  return user.data;
}

export { logIn };

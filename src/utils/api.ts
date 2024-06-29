import { BlogItem } from "../comp/Blog";
import axios from "axios";

// const localhost = "localhost:3001";
const baseUrl = "/api/blogs";
// const baseUrl = "http://localhost:3001/api/blogs";

// export interface BlogItem {
//   url: string;
//   id: string;
//   title: string;
//   likes: number;
//   author: string;
// }

export let token = "";

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

export async function getBlogs() {
  const data = await axios.get(baseUrl);
  return data.data;
}

export async function updateItem(blog: BlogItem) {
  const config = {
    headers: { Authorization: token },
  };
  const data = await axios.put(baseUrl + `/${blog.id}`, blog, config);
  return data.data;
}

export async function deleteBlog(id: string) {
  const config = {
    headers: { Authorization: token },
  };
  const data = await axios.delete(baseUrl + `/${id}`, config);
  if (data.status === 401) throw new Error("You did not create this blog");
  return data.data;
}

export async function makeBlog(blog: BlogItem) {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const data = await axios.post(baseUrl, blog, config);
    return data.data;
  } catch (err: any) {
    return err.response.data;
  }
}

import { BlogItem } from "../comp/Blog";
import axios from "axios";

const localhost = "localhost:3001";
// const baseUrl = "/api/blogs";
const baseUrl = "http://localhost:3001/api/blogs";

// export interface BlogItem {
//   url: string;
//   id: string;
//   title: string;
//   likes: number;
//   author: string;
// }

export async function getBlogs() {
  const data = await axios.get(baseUrl);
  return data.data;
}

export async function updateItem(blog: BlogItem) {
  const data = await axios.put(baseUrl + `/${blog.id}`, blog);
  return data.data;
}

export async function makeBlog(blog: BlogItem) {
  try {
    const data = await axios.post(baseUrl + `/${blog.id}`, blog);
    return data.data;
  } catch (err) {
    return err.response.data;
  }
}

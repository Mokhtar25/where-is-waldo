import { useState } from "react";
import { deleteBlog } from "../utils/api";

export interface BlogItem {
  url: string;
  id: string;

  user?: User;
  title: string;
  likes: number;
  author: string;
}
interface User {
  name: string;
  username: string;
  id: string;
  blogs: string[];
}

interface BlogProps {
  blogItem: BlogItem;
  handelLike: (e: BlogItem) => void;
  handelDel: (e: string) => void;
  userId: string;
}

export default function Blog({
  blogItem,
  handelLike,
  handelDel,
  userId,
}: BlogProps) {
  const [hide, setHide] = useState(true);
  const id = blogItem.user?.id || blogItem.user;
  console.log(id, userId);
  return (
    <div className="flex size-96 flex-col justify-center gap-4 border-2 border-white">
      <h2>{blogItem.title}</h2>

      {!hide && (
        <>
          <span>{blogItem.author}</span>
          <span></span>
          <span>{blogItem.url}</span>
          <span>{blogItem.likes}</span>

          <button onClick={() => handelLike(blogItem)}>Like +</button>
          <span>
            {" "}
            Added By {blogItem.user ? blogItem.user.username : "Annynom"}
          </span>
        </>
      )}
      <button onClick={() => setHide(!hide)}>
        {hide ? "Show more" : "hide more"}
      </button>

      {userId === id && (
        <button className="bg-rose-400" onClick={() => handelDel(blogItem.id)}>
          Delete
        </button>
      )}
    </div>
  );
}
